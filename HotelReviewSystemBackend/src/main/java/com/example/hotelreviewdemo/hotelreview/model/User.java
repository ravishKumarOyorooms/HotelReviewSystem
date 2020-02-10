package com.example.hotelreviewdemo.hotelreview.model;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {


    @Id
    @GeneratedValue(generator = "user_generator")
    @SequenceGenerator(
            name="user_generator",
            sequenceName = "user_sequence",
            initialValue = 1,
            allocationSize = 1
    )
    private Long id;

    private String username;
    private String password;


    public User(){}
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
