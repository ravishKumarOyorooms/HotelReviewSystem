package com.example.hotelreviewdemo.hotelreview.controller;
import com.example.hotelreviewdemo.hotelreview.model.AverageRating;
import com.example.hotelreviewdemo.hotelreview.model.Hotel;
import com.example.hotelreviewdemo.hotelreview.repository.AverageRatingRepository;
import com.example.hotelreviewdemo.hotelreview.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private AverageRatingRepository averageRatingRepository;

    @GetMapping("/search/{flag}/{name}")
    public List<Hotel> getHotelOnSearch(@PathVariable String flag, @PathVariable String name){
        if(flag.equals("name")){
        List<Hotel> hotel=hotelRepository.findByNameLike(name);
        return hotel;
        }
        else
           return hotelRepository.findByLocationLike(name);

    }
    @GetMapping("/hotel/{id}")
    public Object getHotelById(@PathVariable Long id){
        Object hotel=hotelRepository.findById(id);
        return hotel;
    }
    @GetMapping("/{pg_no}")
    public List<Object> getHotels(@PathVariable int pg_no) {
        //List<Sort.Order> sorts = new ArrayList<>();
        //sorts.add(new Sort.Order(Sort.Direction.DESC,"totalAvgRating"));
        //sorts.add(new Sort.Order(Sort.Direction.DESC,"noOfRatings"));
        /* Method 1

        Sort avgSort = Sort.by(Sort.Direction.DESC,"totalAvgRating");
        Sort totalRatingSort = Sort.by(Sort.Direction.DESC,"noOfRatings");
        Sort combined = avgSort.and(totalRatingSort);
        Pageable pageable = PageRequest.of(pg_no,5,combined);

         */
        //Method 2 : combined query
       // Pageable pageable = PageRequest.of(pg_no,5,Sort.by("totalAvgRating").descending().and(Sort.by("noOfRatings").descending()));

        //Method 3 :
        Sort sort = Sort.by(
                Sort.Order.desc("totalAvgRating"),
                Sort.Order.desc("noOfRatings"));
        Pageable pageable = PageRequest.of(pg_no,5,sort);
        Page<Hotel> pagedResult = hotelRepository.findAll(pageable);
        List<Object> list=new ArrayList<>();
        list.add(pagedResult.getTotalPages());
        list.add(pagedResult.getContent());
        return list;
    }




    @PostMapping("")
    public Hotel createHotel(@Valid @RequestBody Hotel hotel){

        hotelRepository.save(hotel);
        averageRatingRepository.save(new AverageRating(0,0,0,0,0,0,0,hotel));
        return hotel;
    }

}
