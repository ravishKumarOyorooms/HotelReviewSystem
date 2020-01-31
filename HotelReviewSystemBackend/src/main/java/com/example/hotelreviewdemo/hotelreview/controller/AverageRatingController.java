package com.example.hotelreviewdemo.hotelreview.controller;

import com.example.hotelreviewdemo.hotelreview.model.AverageRating;
import com.example.hotelreviewdemo.hotelreview.repository.AverageRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AverageRatingController {

    @Autowired
    private AverageRatingRepository averageRatingRepository;
    @GetMapping("/hotels/{hotelId}/avg_ratings")

    public AverageRating getAverageRatingByHotelId(@PathVariable Long hotelId) {
        return averageRatingRepository.findByHotelId(hotelId);

    }
}
