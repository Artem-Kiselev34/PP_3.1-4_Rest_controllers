// --- Получение данных о текущем пользователе и настройка элементов навигации на основе его ролей ---
document.addEventListener("DOMContentLoaded", function () {
    // Запрос данных о пользователе через API
    fetch("/user/profile_user")
        .then(response => response.json())
        .then(user => {
            // Отображение полей в таблице пользователя
            document.getElementById("userId").textContent = user.id;
            document.getElementById("firstName").textContent = user.firstName;
            document.getElementById("lastName").textContent = user.lastName;
            document.getElementById("age").textContent = user.age;
            document.getElementById("email").textContent = user.email;

            // Обработка ролей (если есть несколько)
            let roles = user.authorities.map(role => role.authority.substring(5)).join(", ");
            document.getElementById("roles").textContent = roles;

            // Отображение роли пользователя в навигации
            document.getElementById("navbarUserEmail").textContent = user.username;
            document.getElementById("navbarUserRoles").textContent = roles;

            // Скрываем элемент навигации для админа, если у пользователя нет роли ADMIN
            const adminNavItem = document.getElementById('adminNavItem');
            if (!user.authorities.some(role => role.authority === 'ROLE_ADMIN')) {
                adminNavItem.style.display = 'none';
            }
        })
        .catch(error => console.error("Error fetching user data:", error));
});