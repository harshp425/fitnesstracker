package com.project.fittapp.service;

import com.project.fittapp.models.PersonalRecord;
import com.project.fittapp.models.StrengthEntry;
import com.project.fittapp.repositories.Personalrecord_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonalrecordSericeImpl implements Personalrecord_service {

    @Autowired
    private Personalrecord_Repository personalrecordRepository;

    public PersonalrecordSericeImpl(Personalrecord_Repository personalrecordRepository) {
        this.personalrecordRepository = personalrecordRepository;
    }

    @Override
    public PersonalRecord save(PersonalRecord personalrecord) {
        return personalrecordRepository.save(personalrecord);
    }

    @Override
    public void removePersonalrecord(String email, String record) {
        personalrecordRepository.deleteByEmailAndRecord(email, record);
    }
}
