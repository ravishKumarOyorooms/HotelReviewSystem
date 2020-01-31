package com.example.hotelreviewdemo.hotelreview.controller;
import com.example.hotelreviewdemo.hotelreview.exception.ResourceNotFoundException;
import com.example.hotelreviewdemo.hotelreview.model.Comment;
import com.example.hotelreviewdemo.hotelreview.repository.CommentRepository;
import com.example.hotelreviewdemo.hotelreview.repository.HotelRepository;
import com.example.hotelreviewdemo.hotelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/hotels/{hotelId}")
public class CommentController {


    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/comments")
    public List<Comment>  getAllComentsByHotelId(@PathVariable Long hotelId){
        return commentRepository.findByHotelId(hotelId);
    }


    @PostMapping("/comment")
    public Comment getComment(@PathVariable Long hotelId, @Valid @RequestBody Comment comment){
        return hotelRepository.findById(hotelId).map(hotel -> {

            Long user_id= comment.getUserId();
            String user_name=comment.getUsername();
            comment.setUserId(user_id);
            comment.setUsername(user_name);
            comment.setHotelId(hotelId);

            return commentRepository.save(comment);
        }).orElseThrow(() -> new ResourceNotFoundException("hotelreview not found with id " + hotelId));

    }

}
