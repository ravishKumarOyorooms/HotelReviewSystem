package com.example.hotelreviewdemo.hotelreview.controller;

import com.example.hotelreviewdemo.hotelreview.model.User;
import com.example.hotelreviewdemo.hotelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }


    @PostMapping("/")
    public Map<Long,String> createUser(@Valid @RequestBody User user){
        Map<Long,String> data=new HashMap<Long,String>();
        Long id= Long.valueOf(-1);
        String value="";
        if(userRepository.findByUsername(user.getUsername())==null) {
            userRepository.save(user);
            id = userRepository.findByUsername(user.getUsername()).getId();
            value = user.getUsername();
        }
        else value="User Exists, Login to Continue";
        data.put(id,value);
        return data;
    }
    @PostMapping("/signin")
    public Map<Long,String> checkUser(@Valid @RequestBody User user){
        Map<Long,String> data=new HashMap<Long,String>();
        Long id= Long.valueOf(-1);
        String value="";
        if(userRepository.findByUsername(user.getUsername())==null){
            value="User do not Exists, SignUp to Continue";
        }
        else if(userRepository.findByUsername(user.getUsername()).getUsername().equals(user.getUsername())&&userRepository.findByUsername(user.getUsername()).getPassword().equals(user.getPassword())){
            id=userRepository.findByUsername(user.getUsername()).getId();
            value=user.getUsername();

        }
        else value="Invalid Credentials";
        data.put(id,value);
        return data;
    }

}