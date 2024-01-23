package com.project.fittapp.service;

import com.project.fittapp.models.Goals;
import com.project.fittapp.models.PersonalRecord;

public interface Goals_Service {

    public Goals save(Goals goal);

    public void removeGoal(String email, String goal);
}
