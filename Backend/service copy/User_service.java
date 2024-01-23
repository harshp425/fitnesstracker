package com.project.fittapp.service;
import com.project.fittapp.models.User;
import java.util.List;

public interface User_service {
    public User save(User user);
    public List<User> getAllUsers();
}
