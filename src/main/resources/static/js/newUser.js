// ---------------------- Обработчик отправки формы создания нового пользователя ----------------------
document.getElementById('new-user-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const rolesSelected = Array.from(document.getElementById('roles').selectedOptions).map(option => ({
        id: parseInt(option.value, 10)
    }));

    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        age: parseInt(formData.get('age'), 10),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: rolesSelected
    };

    console.log('Creating user:', user);

    fetch('/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                fetchUsers();
                this.reset();
                closeModal('newUserPopup');
                // Переключение на вкладку "Users table"
                const tabTrigger = new bootstrap.Tab(document.querySelector('#nav-home-tab'));
                tabTrigger.show();
            } else {
                return response.json().then(errors => {
                    // Очистка предыдущих сообщений об ошибках
                    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

                    // Отображение новых сообщений об ошибках
                    Object.keys(errors).forEach(field => {
                        const errorElement = document.getElementById(field + '-error');
                        if (errorElement) {
                            errorElement.textContent = errors[field];
                        }
                    });
                    throw new Error('Validation failed');
                });
            }
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
});
// Очистка сообщений об ошибках валидации
document.querySelector('#nav-home-tab').addEventListener('shown.bs.tab', function (event) {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
});