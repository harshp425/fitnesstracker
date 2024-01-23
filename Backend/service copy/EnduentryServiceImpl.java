package com.project.fittapp.service;

import com.project.fittapp.models.EnduranceEntry;
import com.project.fittapp.repositories.Enduentry_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnduentryServiceImpl implements Enduentry_Service {

    @Autowired
    private Enduentry_Repository enduentryRepository;

    public EnduentryServiceImpl(Enduentry_Repository enduentryRepository) {
        this.enduentryRepository = enduentryRepository;
    }

    @Override
    public EnduranceEntry save(EnduranceEntry enduranceEntry) {
        return enduentryRepository.save(enduranceEntry);
    }


}
