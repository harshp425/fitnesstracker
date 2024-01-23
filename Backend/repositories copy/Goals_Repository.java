package com.project.fittapp.repositories;

import com.project.fittapp.models.Goals;
import com.project.fittapp.models.PersonalRecord;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Goals_Repository extends CrudRepository<Goals, Long> {

    @Query
    public List<Goals> findByEmail(String email);

    @Query
    public void deleteByEmailAndGoal(String email, String goal);
}


