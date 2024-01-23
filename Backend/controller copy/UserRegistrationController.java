package com.project.fittapp.controller;

import com.project.fittapp.models.User;
import com.project.fittapp.service.User_service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = "http://localhost:3000")

public class UserRegistrationController {

    @Autowired
    private User_service userService;


    public UserRegistrationController(User_service userService) {
        this.userService = userService;
    }

    //This endpoint receives a user's registration information in the form of a JSON object which
    //it then converts to a User object and saves to the database
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000")
    public User add(@RequestBody User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setRole("USER");
        return userService.save(user);
    }

}
