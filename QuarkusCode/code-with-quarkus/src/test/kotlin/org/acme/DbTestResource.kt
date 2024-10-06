package org.acme

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager
import org.testcontainers.containers.Db2Container
import java.sql.Connection
import java.sql.DriverManager
import java.sql.Statement


class DbTestResource : QuarkusTestResourceLifecycleManager {

    private lateinit var db2: Db2Container

    override fun start(): MutableMap<String, String> {
        db2 = Db2Container("ibmcom/db2")
            .withExposedPorts(50000)
            .acceptLicense()

        db2.start()

        createDb2Table()

        println("DB2 started on port: ${db2.firstMappedPort}")
        println("Username: ${db2.username}")
        println("Password: ${db2.password}")
        println("jdbcUrl: ${db2.jdbcUrl}")

        val config: MutableMap<String, String> = HashMap()
        config["quarkus.datasource.db2.jdbc.url"] = db2.jdbcUrl
        config["quarkus.datasource.db2.username"] = db2.username
        config["quarkus.datasource.db2.password"] = db2.password

        return config
    }

    override fun stop() {
        db2.stop()
    }


    fun createDb2Table() {
        val createSchemaSQL = "CREATE SCHEMA HR"

        val createTableSQL = """
        CREATE TABLE  HR.EMPLOYEES  (
            id INT PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            age INT,
            department VARCHAR(50)
        )
        """

        val insertDataSQL = """
            INSERT INTO HR.EMPLOYEES  (id, name, age, department) VALUES
            (1, 'John Doe', 30, 'Engineering'),
            (2, 'Jane Smith', 25, 'Marketing'),
            (3, 'Sam Johnson', 40, 'HR')
        """

        val connection = DriverManager.getConnection(db2.jdbcUrl, db2.username, db2.password)
        println("========connection")

        val statement = connection.createStatement()

        try {
            // Execute the SQL query to create the table
            statement.executeUpdate(createSchemaSQL)
            println("Table 'Employee' created successfully!")
            statement.executeUpdate(createTableSQL)
            println("Table 'employees' created successfully!")
            statement.executeUpdate(insertDataSQL)
            println("Dummy data inserted into 'Employee' table!")
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }


}
