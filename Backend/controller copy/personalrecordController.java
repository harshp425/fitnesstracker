package com.project.fittapp.controller;

import com.project.fittapp.controller.StrentryController.AddRequest;
import com.project.fittapp.models.PersonalRecord;
import com.project.fittapp.models.StrengthEntry;
import com.project.fittapp.repositories.Personalrecord_Repository;
import com.project.fittapp.service.PersonalrecordSericeImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.List;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/personalrecord")
@CrossOrigin(origins = "http://localhost:3000")
public class personalrecordController {

    @Autowired
    private Personalrecord_Repository personalrecordRepository;

    @Autowired
    private PersonalrecordSericeImpl personalrecordSerice;

    private String secretKey = "{Your Key}";

    public personalrecordController(Personalrecord_Repository personalrecordRepository,
            PersonalrecordSericeImpl personalrecordSerice) {
        this.personalrecordRepository = personalrecordRepository;
        this.personalrecordSerice = personalrecordSerice;
    }

    //This endpoint takes the user input information sent to it through aN HTTP request,
    // creates an entity object and then saves it to the database
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000")
    public PersonalRecord add(@RequestBody PersonalrecordRequest personalrecordRequest, HttpServletRequest request ) {
        String username = tests(request);
        PersonalRecord personalRecord = new PersonalRecord(username, personalrecordRequest.record());
        return personalrecordRepository.save(personalRecord);
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

    //This endpoint receives a GET request from the frontend for all the personal records entered
    // under a specific username. The endpoint calls the appropriate methods to extract the
    // username of the user requesting the information and queries the database for all
    // entries registered with that username. It then returns this array
    // of JSON objects back to the frontend
    @GetMapping("/getrecords")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<PersonalRecord> getpersonalRecords(HttpServletRequest request) {
        String username = tests(request);
        List<PersonalRecord> listofentries = personalrecordRepository.findByEmail(username);
        return listofentries;
    }


    //This endpoint receives a DELETE request which has the name of the personal record that the user wants
    //to delete. It obtains the name of the entry from the request URl and obtains the username
    // of the user that requested the removal. It then makes a call to the repository to delete
    // that personal record.
    @Transactional
    @DeleteMapping("/removepr")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deleteEntry(@RequestParam String entryName, HttpServletRequest request) {
        String username = tests(request);
        personalrecordSerice.removePersonalrecord(username,entryName);
        return ResponseEntity.ok().build();
    }


    public record PersonalrecordRequest(String record) {}

}
