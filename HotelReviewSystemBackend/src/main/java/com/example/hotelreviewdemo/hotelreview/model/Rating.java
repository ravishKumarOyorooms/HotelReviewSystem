package com.example.hotelreviewdemo.hotelreview.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name="ratings")
public class Rating extends  AuditModel{


    @Id
    @GeneratedValue(generator = "rating_generator")
    @SequenceGenerator(
            name="rating_generator",
            sequenceName = "rating_sequence",
            initialValue = 1
    )
    private Long id;
    private float service=0;
    private float food=0;
    private float locality=0;
    private float cleanliness=0;
    private float security=0;
    private float accessiblity=0;
    private float valueForMoney=0;

    public float getCleanliness() {
        return cleanliness;
    }

    public void setCleanliness(float cleanliness) {
        this.cleanliness = cleanliness;
    }

    public float getSecurity() {
        return security;
    }

    public void setSecurity(float security) {
        this.security = security;
    }

    public float getAccessiblity() {
        return accessiblity;
    }

    public void setAccessiblity(float accessiblity) {
        this.accessiblity = accessiblity;
    }

    public float getValueForMoney() {
        return valueForMoney;
    }

    public void setValueForMoney(float valueForMoney) {
        this.valueForMoney = valueForMoney;
    }

    private Long  userId;
    private String username;



    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hotel_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Hotel hotel;


    public  Rating(){
    }

    public Rating(float service, float food, float locality, float cleanliness, float security, float accessiblity, float valueForMoney, Hotel hotel) {
        this.service = service;
        this.food = food;
        this.locality = locality;
        this.cleanliness = cleanliness;
        this.security = security;
        this.accessiblity = accessiblity;
        this.valueForMoney = valueForMoney;
        this.hotel = hotel;
    }

    public Long getUser_id() {
        return userId;
    }

    public void setUser_id(Long userId) {
        this.userId= userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        id = id;
    }


    public float getService() {
        return service;
    }

    public void setService(float service) {
        this.service = service;
    }

    public float getFood() {
        return food;
    }

    public void setFood(float food) {
        this.food = food;
    }

    public float getLocality() {
        return locality;
    }

    public void setLocality(float locality) {
        this.locality = locality;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
}
