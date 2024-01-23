package com.project.fittapp.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/test")
public class testController {

    private String secretKey = "@#HysfIFHk12jkghjghd42358JNFWY437468734FJJHgkJDGKJSkjhkjhvmnbU5345SDFBuemnchKJHUUjkjhkjhKJ2329KB45";

    @GetMapping("/testing")
    public String tests(HttpServletRequest request) {
        String token = extractJWT(request);
        System.out.println(token+"hi");
        //SecretKey secretKey1 = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        //Jws<Claims> use = Jwts.parser().verifyWith(secretKey1).build().parseSignedClaims(token);
//        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token);
//        Claims name = claims.getPayload();
//        System.out.println(name);
//        return name;

        String username = extractUsername(token);
        System.out.println(username);
        return username;
    }

    public String extractJWT(HttpServletRequest request) {
        String Bearer = request.getHeader("Authorization");
        if (Bearer != null && Bearer.startsWith("Bearer ")) {
            return Bearer.substring(7);
        } else {
            return null;
        }
    }

    public String extractUsername(String token) {
           Jws<Claims> claims = Jwts.parser()
                   .setSigningKey(secretKey)
                   .build()
                   .parseClaimsJws(token);
           String name = claims.getPayload().getSubject();
           return name;
        }


    }



