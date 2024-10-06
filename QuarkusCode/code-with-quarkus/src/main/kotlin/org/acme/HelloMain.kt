package org.acme

import io.agroal.api.AgroalDataSource
import io.quarkus.agroal.DataSource
import io.quarkus.runtime.QuarkusApplication
import io.quarkus.runtime.annotations.QuarkusMain
import jakarta.inject.Inject
import org.jdbi.v3.core.Jdbi

@QuarkusMain
class HelloMain : QuarkusApplication {

//    lateinit var duckdbJdbi: Jdbi
    lateinit var db2Jdbi: Jdbi

    @Inject
    fun HelloMain(
//        @DataSource("duckdb") duckdbDataSource: AgroalDataSource?,
        @DataSource("db2") db2DataSource: AgroalDataSource?
    ) {
        // Create Jdbi instance using the injected DataSource
//        this.duckdbJdbi = Jdbi.create(duckdbDataSource).installPlugins()
        this.db2Jdbi = Jdbi.create(db2DataSource).installPlugins()
    }

    override fun run(vararg args: String?): Int {
        println("======test")

        db2Jdbi.useHandle<Exception> { handle ->
            run {
                println("Connected")
            }

        }

        return 0
    }
}