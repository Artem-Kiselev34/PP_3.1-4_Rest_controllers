package ru.kiselev.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kiselev.exception.UserNotFoundException;
import ru.kiselev.model.Role;
import ru.kiselev.repository.RoleRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    @Override
    @Transactional
    public Role updateRole(Role role) {
        if (roleRepository.existsById(role.getId())) {
            return roleRepository.save(role);
        } else {
            throw new UserNotFoundException("Role with ID " + role.getId() + " not found");
        }
    }

    @Override
    @Transactional
    public void deleteRole(Long id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
        } else {
            throw new UserNotFoundException("Role with ID " + id + " not found");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Role> findRoleById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }
}