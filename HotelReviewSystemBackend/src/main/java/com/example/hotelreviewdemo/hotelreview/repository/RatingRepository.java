package com.example.hotelreviewdemo.hotelreview.repository;

import com.example.hotelreviewdemo.hotelreview.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface  RatingRepository extends JpaRepository<Rating,Long> {
    List<Rating> findByHotelId(Long hotelId);
    @Query(value="select ratings.user_id from  ratings where ratings.hotel_id=?1 and ratings.user_id=?2",nativeQuery = true)
    List<String> findByHotelIdAndUserId(Long hotelId, Long userId);
//    public Rating findByUser_id(Long id);
}
