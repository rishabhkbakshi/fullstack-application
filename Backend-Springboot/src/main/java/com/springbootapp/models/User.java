package com.springbootapp.models;

/*
 *Records are immutable and are used to store data. 
 *They contain fields, all-args constructor, getters, toString, and equals/hashCode methods. 
 *Since they are immutable, they don't have setters. Because of their concise syntax, 
 *they are often used as data transfer objects (DTOs) in Java applications. 
 */
public record User(long id, String firstName, String lastName, String gender) {

}
