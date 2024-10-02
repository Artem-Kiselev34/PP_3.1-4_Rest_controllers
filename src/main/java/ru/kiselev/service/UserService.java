package ru.kiselev.service;

import ru.kiselev.model.User;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();

    User findUserById(Long userId);

    void saveUser(User user);

    void updateUser(Long id, User user);

    void deleteUser(Long userId);

    User findByEmail(String email);

}

