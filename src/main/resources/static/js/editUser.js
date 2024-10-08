// ----------- Открытие модального окна редактирования пользователя и заполнения формы -----------
function openEditUserPopup(userId) {
    console.log('Opening edit modal for user ID:', userId);
    fetch(`/admin/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        })
        .then(user => {
            console.log('User fetched for edit:', user);
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editEmail').value = user.email;
            const editRolesSelect = document.getElementById('editRoles');
            Array.from(editRolesSelect.options).forEach(option => {
                option.selected = user.roles.some(role => role.id === parseInt(option.value, 10));
            });
            openModal('editUserModal');
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            // alert('Ошибка при загрузке данных пользователя');
        });
}

// Обработчик отправки формы редактирования пользователя
document.getElementById('editUserForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const rolesSelected = Array.from(document.getElementById('editRoles').selectedOptions).map(option => ({
        id: parseInt(option.value, 10)
    }));

    const user = {
        id: parseInt(formData.get('id'), 10),
        firstName: formData.get('editFirstName'),
        lastName: formData.get('editLastName'),
        age: parseInt(formData.get('editAge'), 10),
        email: formData.get('editEmail'),
        password: formData.get('editPassword'),
        roles: rolesSelected
    };

    console.log('Updating user:', user);

    fetch(`/admin/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                fetchUsers();
                this.reset();
                closeModal('editUserModal');
                const tabTrigger = new bootstrap.Tab(document.querySelector('#nav-home-tab'));
                tabTrigger.show();
            } else {
                return response.json().then(errors => {
                    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                    Object.keys(errors).forEach(field => {
                        const errorElement = document.getElementById(field + '2-error');
                        if (errorElement) {
                            errorElement.textContent = errors[field];
                        }
                    });
                    throw new Error('Validation failed');
                });
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
            // Обработка ошибок для каждого поля
            if (error.errors) {
                Object.keys(error.errors).forEach(field => {
                    const errorElement = document.getElementById(field + '2-error');
                    if (errorElement) {
                        errorElement.textContent = error.errors[field];
                    }
                });
            }
        });
});

// Очистка сообщений об ошибках валидации формы
document.querySelector('#editUserForm button[type="submit"]').addEventListener('click', function(event) {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
});