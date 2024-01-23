package com.project.fittapp.repositories;

import com.project.fittapp.models.EnduranceEntry;
import com.project.fittapp.models.PersonalRecord;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Personalrecord_Repository extends CrudRepository<PersonalRecord, Long> {

    @Query
    public List<PersonalRecord> findByEmail(String email);

    @Query
    public void deleteByEmailAndRecord(String email,String record);
}
