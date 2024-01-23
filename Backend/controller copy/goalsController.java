package com.project.fittapp.controller;

import com.project.fittapp.controller.personalrecordController.PersonalrecordRequest;
import com.project.fittapp.models.Goals;
import com.project.fittapp.models.PersonalRecord;
import com.project.fittapp.repositories.Goals_Repository;
import com.project.fittapp.repositories.Personalrecord_Repository;
import com.project.fittapp.service.GoalServiceImpl;
import com.project.fittapp.service.PersonalrecordSericeImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/goals")
@CrossOrigin(origins = "http://localhost:3000")
public class goalsController {

    @Autowired
    private Goals_Repository goalsRepository;

    @Autowired
    private GoalServiceImpl goalService;

    private String secretKey = "@#HysfIFHk12jkghjghd42358JNFWY437468734FJJHgkJDGKJSkjhkjhvmnbU5345SDFBuemnchKJHUUjkjhkjhKJ2329KB45";

    public goalsController(Goals_Repository goalsRepository, GoalServiceImpl goalService) {
        this.goalsRepository = goalsRepository;
        this.goalService = goalService;
    }

    //This endpoint takes the user input information sent to it through aN HTTP request,
    // creates an entity object and then saves it to the database
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000")
    public Goals add(@RequestBody goalsController.GoalRequest goalRequest, HttpServletRequest request ) {
        String username = tests(request);
        Goals newgoal = new Goals(username, goalRequest.goal());
        return goalService.save(newgoal);
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

    //This endpoint receives a GET request from the frontend for all the goals entered
    // under a specific username. The endpoint calls the appropriate methods to extract the
    // username of the user requesting the information and queries the database for all
    // entries registered with that username. It then returns this array
    // of JSON objects back to the frontend
    @GetMapping("/getgoals")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Goals> getpersonalRecords(HttpServletRequest request) {
        String username = tests(request);
        List<Goals> listofentries = goalsRepository.findByEmail(username);
        return listofentries;
    }

    //This endpoint receives a DELETE request which has the name of the goal that the user wants
    //to delete. It obtains the name of the entry from the request URl and obtains the username
    // of the user that requested the removal. It then makes a call to the repository to delete
    // that goal.
    @Transactional
    @DeleteMapping("/removegoal")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deleteEntry(@RequestParam String entryName, HttpServletRequest request) {
        String username = tests(request);
        goalService.removeGoal(username, entryName);
        return ResponseEntity.ok().build();
    }


    public record GoalRequest(String goal) {}

}

