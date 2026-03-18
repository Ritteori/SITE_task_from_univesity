// Загрузить вкладку профиля
function loadProfileTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.getElementById(tab + 'Tab').style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');

    if (tab === 'favorites') {
        const favCars = cars.filter(c => currentUser.favorites.includes(c.id));
        renderCars('favoritesList', favCars);
    } else if (tab === 'history') {
        // Получаем автомобили из истории (сохраняем порядок)
        const historyCars = currentUser.history
            .map(id => cars.find(c => c.id === id))
            .filter(c => c !== undefined);
        renderCars('historyList', historyCars);
    } else if (tab === 'myads') {
        // Заглушка для моих объявлений
        const myadsContainer = document.getElementById('myadsTab');
        myadsContainer.innerHTML = `
            <h3>Мои объявления</h3>
            <p>У вас пока нет активных объявлений.</p>
            <button class="btn btn-primary" onclick="showPage('addListing')">Подать объявление</button>
        `;
    } else if (tab === 'settings') {
        // Заглушка для настроек
        const settingsContainer = document.getElementById('settingsTab');
        settingsContainer.innerHTML = `
            <h3>Настройки профиля</h3>
            <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
                <div>
                    <label>Имя:</label>
                    <input type="text" value="Герман Т.В." style="width: 100%; padding: 0.5rem;">
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value="shift_by@gmail.ru" style="width: 100%; padding: 0.5rem;">
                </div>
                <div>
                    <label>Телефон:</label>
                    <input type="tel" value="+375 (29) 123-45-67" style="width: 100%; padding: 0.5rem;">
                </div>
                <button class="btn btn-primary" type="button">Сохранить</button>
            </form>
        `;
    }
}

// Инициализация вкладок
function initProfileTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => loadProfileTab(btn.dataset.tab));
    });
}