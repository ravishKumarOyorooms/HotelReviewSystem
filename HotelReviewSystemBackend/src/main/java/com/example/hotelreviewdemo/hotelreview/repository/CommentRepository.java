package com.example.hotelreviewdemo.hotelreview.repository;

import com.example.hotelreviewdemo.hotelreview.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository  extends JpaRepository<Comment,Long> {
    List<Comment> findByHotelId(Long questionId);

}
