package com.project.fittapp.service;

import com.project.fittapp.models.StrengthEntry;
import com.project.fittapp.repositories.Strentry_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StrentryServiceImpl implements Strentry_service{

    @Autowired
    private Strentry_Repository strentryRepository;

    public StrentryServiceImpl(Strentry_Repository strentryRepository) {
        this.strentryRepository = strentryRepository;
    }

    @Override
    public StrengthEntry save(StrengthEntry strengthEntry) {
        return strentryRepository.save(strengthEntry);
    }


}
