package com.example.hotelreviewdemo.hotelreview.repository;

import com.example.hotelreviewdemo.hotelreview.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    public User findByUsername(String user);
    public User findUserById(Long userId);


}
