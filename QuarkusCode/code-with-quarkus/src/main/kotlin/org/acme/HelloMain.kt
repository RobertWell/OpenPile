package org.acme

import io.agroal.api.AgroalDataSource
import io.quarkus.agroal.DataSource
import io.quarkus.runtime.QuarkusApplication
import io.quarkus.runtime.annotations.QuarkusMain
import jakarta.inject.Inject
import org.jdbi.v3.core.Jdbi

@QuarkusMain
class HelloMain(
    @DataSource("duckdb") private val duckdbDataSource: AgroalDataSource,
    @DataSource("db2") private val db2DataSource: AgroalDataSource
) : QuarkusApplication {


    override fun run(vararg args: String?): Int {
        println("======test")
        duckdbDataSource.connection.createStatement()
            .use { statement ->
                statement.executeUpdate("CREATE TABLE IF NOT EXISTS employees (id VARCHAR PRIMARY KEY, name VARCHAR, age INTEGER, department VARCHAR, update_dt TIMESTAMP) ")
                println("====create table succeed in duckdb")
            }
        println("======test2")
//        var db2Jdbi = Jdbi.create(db2DataSource).installPlugins()
//            .useHandle<Exception> { handle ->
//                run {
//                    println("Test Image Connected")
//
//                    val employees: List<Employee> = handle
//                        .createQuery("SELECT id, name, age, department FROM HR.EMPLOYEES; ")
//                        .mapTo(Employee::class.java) // Map the result to the Employee class
//                        .list()
//
//                    println(employees)
//                }
//
//            }
        db2DataSource.connection.createStatement()
            .use { statement ->

                val resultSet = statement.executeQuery("SELECT id, name, age, department, CURRENT TIMESTAMP AS update_dt   FROM HR.EMPLOYEES; ")

                val insertQuery = """
                    INSERT INTO employees (id, name, age, department, update_dt) values
                                        (:id, :name, :age, :department, :update_dt)
                """.trimIndent()

                var duckJdbi = Jdbi.create(duckdbDataSource).installPlugins()
                    .useHandle<Exception> { handle ->
                        run {
                            while (resultSet.next()) {
                                val query = handle.createUpdate(insertQuery)
                                println( resultSet.getObject("update_dt"))




                                query.bind("id", resultSet.getObject("id"))
                                    .bind("name", resultSet.getObject("name"))
                                    .bind("age", resultSet.getObject("age"))
                                    .bind("department", resultSet.getObject("department"))
                                    .bind("update_dt", resultSet.getObject("update_dt"))
                                    .execute()
                            }

                            val employees: List<Employee> =  handle.createQuery("select  id, name, age, department, update_dt from employees")
                                .mapTo(Employee::class.java) // Map the result to the Employee class
                                .list()
                            println(employees)
                        }

                    }


            }


        return 0
    }

}