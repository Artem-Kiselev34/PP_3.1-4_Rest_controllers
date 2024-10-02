package ru.kiselev.Initializer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kiselev.model.Role;
import ru.kiselev.model.User;
import ru.kiselev.service.RoleService;
import ru.kiselev.service.UserService;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class UserAndRoleSeeder {
    private final RoleService roleService;
    private final UserService userService;

    @Autowired
    public UserAndRoleSeeder(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    private void init() {
        roleService.saveRole(new Role(1L, "ROLE_ADMIN"));
        roleService.saveRole(new Role(2L, "ROLE_USER"));

        Set<Role> adminRole = new HashSet<>(roleService.findRoleById(1L).stream().toList());
        Set<Role> userRole = new HashSet<>(roleService.findRoleById(2L).stream().toList());
        userService.saveUser(new User("admin", "admin", 33, "admin@mail.ru", "admin", adminRole));
        userService.saveUser(new User("user", "user", 44, "user@mail.ru", "user", userRole));
    }
}
