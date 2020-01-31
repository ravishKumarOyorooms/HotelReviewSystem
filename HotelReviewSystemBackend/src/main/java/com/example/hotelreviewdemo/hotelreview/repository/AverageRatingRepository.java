package com.example.hotelreviewdemo.hotelreview.repository;

import com.example.hotelreviewdemo.hotelreview.model.AverageRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AverageRatingRepository extends JpaRepository<AverageRating,Long>{

    public AverageRating findByHotelId(Long hotelId);

}
