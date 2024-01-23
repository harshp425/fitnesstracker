package com.project.fittapp.repositories;

import com.project.fittapp.models.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User_Repository extends CrudRepository<User, Long> {

//    @Query("SELECT u FROM User u WHERE u.email = ?1")
//    public User findByEmail(String email);
    @Query
    public Optional<User> findByEmail(String email);

}
