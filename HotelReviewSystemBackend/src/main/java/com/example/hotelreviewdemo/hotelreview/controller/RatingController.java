package com.example.hotelreviewdemo.hotelreview.controller;

import com.example.hotelreviewdemo.hotelreview.exception.ResourceNotFoundException;
import com.example.hotelreviewdemo.hotelreview.model.AverageRating;
import com.example.hotelreviewdemo.hotelreview.model.Rating;
import com.example.hotelreviewdemo.hotelreview.repository.HotelRepository;
import com.example.hotelreviewdemo.hotelreview.repository.RatingRepository;
import com.example.hotelreviewdemo.hotelreview.repository.AverageRatingRepository;

import com.example.hotelreviewdemo.hotelreview.repository.UserRepository;
import org.decimal4j.util.DoubleRounder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.DecimalFormat;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/hotels/{hotelId}")
public class RatingController {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private AverageRatingRepository averageRatingRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/ratings")

    public List<Rating> getRatingsByHotelId(@PathVariable Long hotelId){
        return ratingRepository.findByHotelId(hotelId);
    }


    @GetMapping("/{userId}")
    public boolean getRatingByHotelIdAndUserId(@PathVariable  Long userId,@PathVariable Long hotelId ){
        List <String>user=ratingRepository.findByHotelIdAndUserId(hotelId,userId);
                if(user.size()==0){
                    return true;
                }else return false;
    }


    @PostMapping("/ratings")

    public Rating addRating(@PathVariable Long hotelId, @Valid @RequestBody Rating rating){

        return hotelRepository.findById(hotelId).map((hotel)->{

            AverageRating averageRating;
            float food=rating.getFood();
            float service=rating.getService();
            float locality=rating.getLocality();
            float  cleanliness=rating.getCleanliness();
            float security=rating.getSecurity();
            float accessiblity=rating.getAccessiblity();
            float valueForMoney=rating.getValueForMoney();

            Long  userId=rating.getUser_id();
            String userName=rating.getUsername();

            AverageRating avgRating=averageRatingRepository.findByHotelId(hotelId);
            float avgFood= avgRating.getAvgFood();
            float avgLocality=avgRating.getAvgLocality();
            float avgService=avgRating.getAvgService();
            float  avgCleanliness=avgRating.getAvgCleanliness();
            float avgSecurity=avgRating.getAvgSecurity();
            float avgAccessiblity=avgRating.getAvgAccessiblity();
            float avgValueForMoney=avgRating.getAvgValueForMoney();

            int no_of_ratings=hotel.getNo()+1;
            hotel.setNo(no_of_ratings);

            avgRating.setAvgFood((food+(avgFood*(no_of_ratings-1)))/no_of_ratings);
            avgRating.setAvgService((service+(avgService*(no_of_ratings-1)))/no_of_ratings);
            avgRating.setAvgLocality((locality+(avgLocality*(no_of_ratings-1)))/no_of_ratings);
            avgRating.setAvgAccessiblity((accessiblity+(avgAccessiblity*(no_of_ratings-1)))/no_of_ratings);
            avgRating.setAvgCleanliness((cleanliness+(avgCleanliness*(no_of_ratings-1)))/no_of_ratings);
            avgRating.setAvgValueForMoney((valueForMoney+(avgValueForMoney*(no_of_ratings-1)))/no_of_ratings);
            avgRating.setAvgSecurity((security+(avgSecurity*(no_of_ratings-1)))/no_of_ratings);

            float t_avg_food= avgRating.getAvgFood();
            float t_avg_service= avgRating.getAvgService();
            float t_avg_locality= avgRating.getAvgLocality();
            float t_avg_accessiblity= avgRating.getAvgAccessiblity();
            float t_avg_cleanliness= avgRating.getAvgCleanliness();
            float t_avg_value_for_money= avgRating.getAvgValueForMoney();
            float t_avg_security=avgRating.getAvgSecurity();

            double total_avg_rating=(t_avg_food+t_avg_locality+t_avg_service+t_avg_accessiblity+t_avg_cleanliness+t_avg_value_for_money+t_avg_security)/7;
            DecimalFormat df = new DecimalFormat("#.#");
            hotel.setTotal_average_ratings((float)DoubleRounder.round(total_avg_rating,1));

            averageRatingRepository.save(avgRating);
            rating.setHotel(hotel);

            return ratingRepository.save(rating);
        }).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + hotelId));
    }
}
