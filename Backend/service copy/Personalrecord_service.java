package com.project.fittapp.service;

import com.project.fittapp.models.PersonalRecord;
import com.project.fittapp.models.StrengthEntry;

public interface Personalrecord_service {

    public PersonalRecord save(PersonalRecord personalRecord);

    public void removePersonalrecord(String email, String record);
}
