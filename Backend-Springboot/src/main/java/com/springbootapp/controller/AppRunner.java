package com.springbootapp.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppRunner {

	public static void main(String[] args) {
		// Line to run the project. Because we write this line in Main method
		SpringApplication.run(AppRunner.class, args);
	}

}