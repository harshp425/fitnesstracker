package com.project.fittapp.repositories;

import com.project.fittapp.models.EnduranceEntry;
import com.project.fittapp.models.StrengthEntry;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Enduentry_Repository extends CrudRepository<EnduranceEntry, Long> {
    @Query
    public Optional<EnduranceEntry> findByEmail(String email);


    @Query
    public List<EnduranceEntry> findByEmailAndExercise(String email, String exercise);
}
