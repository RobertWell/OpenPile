package org.acme

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager
import org.testcontainers.containers.Db2Container



class DbTestResource  : QuarkusTestResourceLifecycleManager{

    private lateinit var db2: Db2Container

    override fun start(): MutableMap<String, String> {
        db2 = Db2Container("ibmcom/db2")
            .withExposedPorts(50000)
            .acceptLicense()

        db2.start()

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
}
