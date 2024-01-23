package com.project.fittapp.repositories;

import com.project.fittapp.models.StrengthEntry;
import com.project.fittapp.models.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Strentry_Repository extends CrudRepository<StrengthEntry, Long> {
    @Query
    public Optional<StrengthEntry> findByEmail(String email);

    @Query
    public List<StrengthEntry> findByEmailAndExercise(String email, String exercise);

//    @Query
//    public List<StrengthEntry> findByexercise(String exercise);
}
