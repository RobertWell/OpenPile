package org.acme

import org.joda.time.DateTime


data class Employee(
    val id: Int,
    val name: String,
    val age: Int,
    val department: String,
    val updateDt : DateTime?
)