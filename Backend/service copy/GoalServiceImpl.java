package com.project.fittapp.service;

import com.project.fittapp.models.Goals;
import com.project.fittapp.models.PersonalRecord;
import com.project.fittapp.repositories.Goals_Repository;
import com.project.fittapp.repositories.Personalrecord_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoalServiceImpl implements Goals_Service{
    @Autowired
    private Goals_Repository goalsRepository;

    public GoalServiceImpl(Goals_Repository goalsRepository) {
        this.goalsRepository = goalsRepository;
    }

    @Override
    public Goals save(Goals goal) {
        return goalsRepository.save(goal);
    }

    @Override
    public void removeGoal(String email, String goal) {
        goalsRepository.deleteByEmailAndGoal(email, goal);
    }

}
