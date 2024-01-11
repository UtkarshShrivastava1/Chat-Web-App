package com.example.backendSpringBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class BackendSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendSpringBootApplication.class, args);
	}

}
