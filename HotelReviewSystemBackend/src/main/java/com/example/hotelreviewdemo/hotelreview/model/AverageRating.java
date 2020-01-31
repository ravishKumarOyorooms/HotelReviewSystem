package com.example.hotelreviewdemo.hotelreview.model;

import javax.persistence.*;

@Entity
@Table(name="average_ratings")
public class AverageRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float avgService;
    private float avgFood;
    private float avgLocality;
    private float avgCleanliness;
    private float avgSecurity;
    private float avgAccessiblity;
    private float avgValueForMoney;

    public float getAvgCleanliness() {
        return avgCleanliness;
    }

    public void setAvgCleanliness(float avgCleanliness) {
        this.avgCleanliness = avgCleanliness;
    }

    public float getAvgSecurity() {
        return avgSecurity;
    }

    public void setAvgSecurity(float avgSecurity) {
        this.avgSecurity = avgSecurity;
    }

    public float getAvgAccessiblity() {
        return avgAccessiblity;
    }

    public void setAvgAccessiblity(float avgAccessiblity) {
        this.avgAccessiblity = avgAccessiblity;
    }

    public float getAvgValueForMoney() {
        return avgValueForMoney;
    }

    public void setAvgValueForMoney(float avgValueForMoney) {
        this.avgValueForMoney = avgValueForMoney;
    }

    @OneToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    public AverageRating(){

    }

    public AverageRating(float avgService, float avgFood, float avgLocality, float avgCleanliness, float avgSecurity, float avgAccessiblity, float avgValueForMoney, Hotel hotel) {
        this.avgService = avgService;
        this.avgFood = avgFood;
        this.avgLocality = avgLocality;
        this.avgCleanliness = avgCleanliness;
        this.avgSecurity = avgSecurity;
        this.avgAccessiblity = avgAccessiblity;
        this.avgValueForMoney = avgValueForMoney;
        this.hotel = hotel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public float getAvgService() {
        return avgService;
    }

    public void setAvgService(float avg_service) {
        this.avgService = avg_service;
    }

    public float getAvgFood() {
        return avgFood;
    }

    public void setAvgFood(float avg_food) {
        this.avgFood = avg_food;
    }

    public float getAvgLocality() {
        return avgLocality;
    }

    public void setAvgLocality(float avg_locality) {
        this.avgLocality = avg_locality;
    }
}
