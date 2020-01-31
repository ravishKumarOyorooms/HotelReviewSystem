package com.example.hotelreviewdemo.hotelreview.repository;

import com.example.hotelreviewdemo.hotelreview.model.Hotel;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends PagingAndSortingRepository<Hotel, Long> {

}
