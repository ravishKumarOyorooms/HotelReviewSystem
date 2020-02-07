package com.example.hotelreviewdemo.hotelreview.repository;

import com.example.hotelreviewdemo.hotelreview.model.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.PageRequest;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface HotelRepository extends PagingAndSortingRepository<Hotel, Long> {
    @Query("select h from Hotel h where lower(h.name) like lower(concat('%', ?1,'%'))")
    List<Hotel> findByNameLike(String name);
    @Query("select h from Hotel h where lower(h.location) like lower(concat('%', ?1,'%'))")
    List<Hotel> findByLocationLike( String location);

}
