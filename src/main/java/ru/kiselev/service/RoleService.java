package ru.kiselev.service;

import ru.kiselev.model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    void saveRole(Role role);

    Role updateRole(Role role);

    void deleteRole(Long id);

    Optional<Role> findRoleById(Long id);

    List<Role> findAllRoles();
}