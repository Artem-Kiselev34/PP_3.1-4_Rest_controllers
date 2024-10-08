package ru.kiselev.service;

import ru.kiselev.model.Role;

import java.util.Optional;

public interface RoleService {

    void saveRole(Role role);

    Optional<Role> findRoleById(Long id);

}