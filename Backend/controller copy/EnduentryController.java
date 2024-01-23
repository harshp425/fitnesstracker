package com.project.fittapp.controller;


import com.project.fittapp.models.EnduranceEntry;
import com.project.fittapp.repositories.Enduentry_Repository;
import com.project.fittapp.service.Enduentry_Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/endurance_entry")
@CrossOrigin(origins = "http://localhost:3000")
public class EnduentryController {

    @Autowired
    private Enduentry_Service enduentryService;

    @Autowired
    private Enduentry_Repository enduentryRepository;

    private String secretKey = "@#HysfIFHk12jkghjghd42358JNFWY437468734FJJHgkJDGKJSkjhkjhvmnbU5345SDFBuemnchKJHUUjkjhkjhKJ2329KB45";

    public EnduentryController(Enduentry_Service enduentryService,
            Enduentry_Repository enduentryRepository) {
        this.enduentryService = enduentryService;
        this.enduentryRepository = enduentryRepository;
    }

    //This endpoint takes the user input information regarding the endurance entry, creates an
    //entity object and then saves it to the database
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000")
    public EnduranceEntry add(@RequestBody EnduentryController.AddRequest addRequest, HttpServletRequest request ) {
        String username = tests(request);
        EnduranceEntry enduranceEntry = new EnduranceEntry(username, addRequest.date(), addRequest.exerciseNameEndu(),
                addRequest.distance(), addRequest.avspeed());
        return enduentryService.save(enduranceEntry);
    }


    //This method takes in the HTTP request and calls the appropriate helper methods to eventually
    //return the username for which the entry was sent
    public String tests(HttpServletRequest request) {
        String token = extractJWT(request);
        return extractUsername(token);
    }

    //This is a helper method that takes in the HTTP request and extracts the JWT from the header
    //of the request and returns it
    public String extractJWT(HttpServletRequest request) {
        String Bearer = request.getHeader("Authorization");
        if (Bearer != null && Bearer.startsWith("Bearer ")) {
            return Bearer.substring(7);
        } else {
            return null;
        }
    }

    //This is helper method that takes in a JWT token and extracts the username of the user for
    //which this token was created when the user was logging onto the system
    public String extractUsername(String token) {
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
        String name = claims.getPayload().getSubject();
        return name;
    }

    //This endpoint receives a GET request from the frontend with the name of the exercise the user wants
    //to see data for. The endpoint calls the appropriate methods to extract the username of the user
    //requesting the information and queries the database for all entries registered with that username
    //and exercise name. It then returns this array of JSON objects back to the frontend
    @GetMapping("/getentry")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<EnduranceEntry> endurancequery(
            @RequestParam(name = "equery", required = false) String exercise, HttpServletRequest
            request) {
        String username = tests(request);
        List<EnduranceEntry> listofentries = enduentryRepository.findByEmailAndExercise(username, exercise);
        return listofentries;
    }

    public record AddRequest(String date, String exerciseNameEndu, String distance, String avspeed) {}



}


