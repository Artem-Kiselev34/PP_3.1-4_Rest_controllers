package ru.kiselev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kiselev.model.User;
import ru.kiselev.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile_user")
    public User getUserProfile(Principal principal) {
        return userService.findByEmail(principal.getName());
    }
}
