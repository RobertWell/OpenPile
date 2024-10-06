package org.acme

import io.agroal.api.AgroalDataSource
import io.quarkus.agroal.DataSource
import io.quarkus.test.common.QuarkusTestResource
import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured.given
import jakarta.inject.Inject
import org.hamcrest.CoreMatchers.`is`
import org.jdbi.v3.core.Jdbi
import org.junit.jupiter.api.Test

@QuarkusTest
//@QuarkusTestResource(DbTestResource::class)
class GreetingResourceTest {

    @Inject
    @DataSource("db2")
    lateinit var db2DataSource: AgroalDataSource

    @Test
    fun testHelloEndpoint() {

        var db2Jdbi = Jdbi.create(db2DataSource).installPlugins()
            .useHandle<Exception> { handle ->
                run {
                    println("Test Image Connected")

                    val employees: List<Employee> = handle
                        .createQuery("SELECT id, name, age, department FROM HR.EMPLOYEES; ")
                        .mapTo(Employee::class.java) // Map the result to the Employee class
                        .list()

                    println(employees)
                }

            }
        given()
            .`when`().get("/hello")
            .then()
            .statusCode(200)
            .body(`is`("Hello from Quarkus REST"))
    }

}