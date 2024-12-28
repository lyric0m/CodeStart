document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');

    if (!form) {
        console.error('Форма с id "signup-form" не найдена.');
        return;
    }

    const toggleErrorState = (field, message) => {
        const errorElement = field.parentElement.querySelector('.error-message');
        
        // Добавляем/обновляем текст ошибки
        if (message) {
            field.classList.add('error');
            if (!errorElement) {
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-message';
                errorSpan.textContent = message;
                field.parentElement.appendChild(errorSpan);
            } else {
                errorElement.textContent = message;
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Останавливаем отправку формы

        const nameField = document.querySelector('input[name="name"]');
        const phoneField = document.querySelector('input[name="phone"]');
        const emailField = document.querySelector('input[name="email"]');
        const serviceField = document.querySelector('select[name="service"]');
        const sessionsField = document.querySelector('input[name="sessions"]');
        const commentField = document.querySelector('textarea[name="comment"]');

        const name = nameField.value.trim();
        const phone = phoneField.value.trim();
        const email = emailField.value.trim();
        const service = serviceField.value;
        const sessions = sessionsField.value.trim();
        const comment = commentField.value.trim();

        let isValid = true;

        // Проверка имени
        if (!name) {
            toggleErrorState(nameField, 'Поле "Имя" обязательно для заполнения.');
            isValid = false;
        } else {
            toggleErrorState(nameField, '');
        }

        // Проверка телефона
        const phoneRegex = /^[0-9\-\+\s\(\)]{10,}$/;
        if (!phone || !phoneRegex.test(phone)) {
            toggleErrorState(phoneField, 'Введите корректный номер телефона.');
            isValid = false;
        } else {
            toggleErrorState(phoneField, '');
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            toggleErrorState(emailField, 'Введите корректный адрес электронной почты.');
            isValid = false;
        } else {
            toggleErrorState(emailField, '');
        }

        // Проверка выбора услуги
        if (!service) {
            toggleErrorState(serviceField, 'Выберите пакет услуг.');
            isValid = false;
        } else {
            toggleErrorState(serviceField, '');
        }

        // Проверка количества занятий
        if (!sessions || isNaN(sessions) || sessions <= 0) {
            toggleErrorState(sessionsField, 'Укажите корректное количество занятий в неделю.');
            isValid = false;
        } else {
            toggleErrorState(sessionsField, '');
        }

        // Если ошибок нет, показываем сообщение об успешной отправке
        if (isValid) {
            alert(`Форма успешно отправлена!\n\nДанные формы:\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nПакет услуг: ${service}\nКоличество занятий: ${sessions}\nКомментарий: ${comment}`);
            form.reset(); // Сбрасываем форму
            document.querySelectorAll('.error-message').forEach(error => error.remove()); // Убираем все сообщения об ошибках
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('callback-form');
    const message = document.getElementById('form-message-callback');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Получаем текущую дату и время
        const currentDate = new Date();

        // Получаем дату и время, выбранные в форме
        const selectedDate = new Date(dateInput.value);
        const selectedTime = timeInput.value;
        const [hours, minutes] = selectedTime.split(':').map(Number);

        // Устанавливаем время в выбранной дате (часы и минуты)
        selectedDate.setHours(hours);
        selectedDate.setMinutes(minutes);

        // Проверка: дата и время не могут быть меньше текущего времени и не меньше чем через 2 часа
        const twoHoursLater = new Date(currentDate);
        twoHoursLater.setHours(currentDate.getHours() + 2);

        // Если дата меньше текущей или меньше чем через 2 часа, выводим сообщение об ошибке
        if (selectedDate <= currentDate) {
            alert('Дата и время не могут быть в прошлом!');
            return;
        } else if (selectedDate < twoHoursLater) {
            alert('Дата и время должны быть хотя бы через 2 часа!');
            return;
        }

        // Если проверка прошла, то собираем данные формы
        const formData = new FormData(form);

        // Формируем информацию для отображения
        const formInfo = `
            <p><strong>Имя:</strong> ${formData.get('name')}</p>
            <p><strong>Телефон:</strong> ${formData.get('phone')}</p>
            <p><strong>Email:</strong> ${formData.get('email')}</p>
            <p><strong>Тип:</strong> ${formData.get('type')}</p>
            <p><strong>Курс:</strong> ${formData.get('course')}</p>
            <p><strong>Дата:</strong> ${formData.get('date')}</p>
            <p><strong>Время:</strong> ${formData.get('time')}</p>
            <p><strong>Комментарий:</strong> ${formData.get('comment')}</p>
        `;

        // Показываем сообщение
        message.innerHTML = formInfo;
        message.style.display = 'block'; // Показываем блок с информацией

        // Плавно увеличиваем opacity для появления
        setTimeout(() => {
            message.style.opacity = 1;
        }, 0);

        // Через 4 секунды скрываем сообщение
        setTimeout(() => {
            message.style.opacity = 0;
            setTimeout(() => {
                message.style.display = 'none'; // Прячем блок после завершения анимации
            }, 500);
        }, 4000); // Сообщение исчезает через 4 секунды
    });
});

window.addEventListener('load', function() {
    window.scrollTo(0, 0); // Прокрутка страницы в верхний левый угол
});