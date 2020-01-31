package com.example.hotelreviewdemo.hotelreview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HotelReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelReviewApplication.class, args);
	}

}
