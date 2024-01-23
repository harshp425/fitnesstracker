package com.project.fittapp.controller;

import com.project.fittapp.repositories.User_Repository;
import com.project.fittapp.userdetail.customUserDetails;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.*;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class loginController {

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    protected User_Repository userRepository;

    public loginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    //This endpoint receives the login information that the user inputted and then utilizes Spring
    //Security to ensure that the login information is present in the database and is accurate.
    //If the user login authentication is successful, it then creates a JWT token and sends it back
    //for later use.
    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
        Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);

        if (authenticationResponse.isAuthenticated()) {
            String jwt = generateToken(loginRequest.username());
            return ResponseEntity.ok().body(new JwtResponse(jwt));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    private  String generateToken(String username) {
        long currentTimeMillis = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(currentTimeMillis))
                .setExpiration(new Date(currentTimeMillis + 3600000))
                .signWith(SignatureAlgorithm.HS512, "{Your Secret Key}")
                .compact();
    }

    public record LoginRequest(String username, String password) {
    }

    public record JwtResponse(String jwt) {
    }
}
