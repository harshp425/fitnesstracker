package com.project.fittapp.service;

import com.project.fittapp.models.User;
import com.project.fittapp.repositories.User_Repository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements User_service {

    @Autowired
    private User_Repository userRepository;

    public UserServiceImpl(User_Repository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();

    }

}
