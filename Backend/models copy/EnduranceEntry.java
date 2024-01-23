package com.project.fittapp.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name= "Enduranceentry")
public class EnduranceEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Email")
    private String email;

    @Column(name = "Date")
    private String date;

    @Column(name = "Exercise")
    private String exercise;

    @Column(name = "Distance")
    private String distance;

    @Column(name = "Average_Speed")
    private String avspeed;

    public EnduranceEntry(){}

    public EnduranceEntry(String email, String date, String exercise, String distance,
            String avspeed) {
        this.email = email;
        this.date = date;
        this.exercise = exercise;
        this.distance = distance;
        this.avspeed = avspeed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getExercise() {
        return exercise;
    }

    public void setExercise(String exercise) {
        this.exercise = exercise;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public String getAvspeed() {
        return avspeed;
    }

    public void setAvspeed(String avspeed) {
        this.avspeed = avspeed;
    }
}
