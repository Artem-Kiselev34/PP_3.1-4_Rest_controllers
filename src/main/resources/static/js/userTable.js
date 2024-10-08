document.addEventListener('DOMContentLoaded', function () {
    fetchCurrentUser();
    fetchUsers();
    loadRoles();
});

// Получение и отображение всех пользователей в таблице
function fetchUsers() {
    console.log('Fetching users...');
    fetch('/admin/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(response => {
            console.log('Users fetched:', response);
            const tableBody = document.getElementById('users-table-body');
            tableBody.innerHTML = '';
            response.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.name.replace('ROLE_', '')).join(', ')}</td> 
                    <td><button class="btn btn-info" onclick="openEditUserPopup(${user.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="openDeleteUserPopup(${user.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            // alert('Ошибка при загрузке пользователей');
        });
}

// Загрузка ролей и отображение их в селектах
function loadRoles() {
    console.log('Loading roles...');
    fetch('/admin/users/roles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch roles');
            }
            return response.json();
        })
        .then(roles => {
            console.log('Roles fetched:', roles);
            const roleSelect = document.getElementById('roles');
            const editRoleSelect = document.getElementById('editRoles');
            const deleteRoleSelect = document.getElementById('deleteRoles');

            roleSelect.innerHTML = '';
            editRoleSelect.innerHTML = '';
            deleteRoleSelect.innerHTML = '';
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id;
                option.text = role.authority.replace('ROLE_', '');
                roleSelect.appendChild(option);

                const editOption = document.createElement('option');
                editOption.value = role.id;
                editOption.text = role.authority.replace('ROLE_', '');
                editRoleSelect.appendChild(editOption);

                const deleteOption = document.createElement('option');
                deleteOption.value = role.id;
                deleteOption.text = role.authority.replace('ROLE_', '');
                deleteRoleSelect.appendChild(deleteOption);
            });
        })
        .catch(error => {
            console.error('Error loading roles:', error);
            // alert('Ошибка при загрузке ролей');
        });
}









