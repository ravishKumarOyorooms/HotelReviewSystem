package com.example.hotelreviewdemo.hotelreview.model;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name="hotels")
public class Hotel extends AuditModel{


    @Id
    @GeneratedValue(generator = "hotel_generator")
    @SequenceGenerator(
            name = "hotel_generator",
            sequenceName = "hotel_sequence",
            initialValue = 1
    )
    private Long id;
    @NotBlank
    private  String name;
    private  String image;
    private String location;
    private int noOfRatings=0;
    private  float totalAvgRating;

    public float getTotal_average_ratings() {
        return totalAvgRating;
    }

    public void setTotal_average_ratings(float total_average_ratings) {
        this.totalAvgRating = total_average_ratings;
    }



    @OneToOne(
            cascade =  CascadeType.ALL,
            mappedBy = "hotel")
    private AverageRating averageRating;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="hotelId",referencedColumnName = "id")
    private List<Comment> comment;

    public Hotel(){

    }
    public Hotel(@NotBlank String name, String image, String location) {
        this.name = name;
        this.image = image;
        this.location = location;
    }

    public int getNo() {
        return noOfRatings;
    }

    public void setNo(int no_of_ratings) {
        this.noOfRatings = no_of_ratings;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
