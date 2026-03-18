// Загрузить вкладку профиля
function loadProfileTab(tab) {
    // Скрываем все вкладки
    document.querySelectorAll('.profile-tab-content').forEach(t => t.style.display = 'none');
    
    // Показываем выбранную
    document.getElementById(tab + 'Tab').style.display = 'block';
    
    // Обновляем активный класс у кнопок
    document.querySelectorAll('.tab-btn-modern').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn-modern[data-tab="${tab}"]`).classList.add('active');

    // Загружаем контент в зависимости от вкладки
    if (tab === 'favorites') {
        const favCars = cars.filter(c => currentUser.favorites.includes(c.id));
        const container = document.getElementById('favoritesList');
        
        if (favCars.length === 0) {
            container.innerHTML = `
                <div class="profile-empty">
                    <i class="fa-regular fa-heart"></i>
                    <p>У вас пока нет избранных автомобилей</p>
                    <a href="#" data-page="catalog" class="btn btn-primary nav-link">
                        <i class="fa-solid fa-magnifying-glass"></i> Перейти в каталог
                    </a>
                </div>
            `;
        } else {
            container.innerHTML = '';
            favCars.forEach(car => {
                container.appendChild(renderCarCard(car, true));
            });
        }
        
        // Обновляем счётчик
        document.getElementById('favoritesCount').textContent = favCars.length;
        
    } else if (tab === 'history') {
        // Получаем автомобили из истории (сохраняем порядок)
        const historyCars = currentUser.history
            .map(id => cars.find(c => c.id === id))
            .filter(c => c !== undefined);
            
        const container = document.getElementById('historyList');
        
        if (historyCars.length === 0) {
            container.innerHTML = `
                <div class="profile-empty">
                    <i class="fa-regular fa-clock"></i>
                    <p>Вы ещё не просматривали автомобили</p>
                    <a href="#" data-page="catalog" class="btn btn-primary nav-link">
                        <i class="fa-solid fa-magnifying-glass"></i> Перейти в каталог
                    </a>
                </div>
            `;
        } else {
            container.innerHTML = '';
            historyCars.forEach(car => {
                container.appendChild(renderCarCard(car, true));
            });
        }
        
        // Обновляем счётчик
        document.getElementById('historyCount').textContent = historyCars.length;
        
    } else if (tab === 'myads') {
        // Пример моих объявлений (можно заменить на реальные данные)
        const myadsContainer = document.getElementById('myadsList');
        
        // Для демонстрации покажем пример объявления
        myadsContainer.innerHTML = `
            <div class="myad-card">
                <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop" alt="Audi A6" class="myad-image">
                <div class="myad-info">
                    <div class="myad-title">Audi A6 2020</div>
                    <div class="myad-status">
                        <i class="fa-regular fa-circle-check status-active"></i> Активно
                        <span style="margin: 0 0.5rem;">•</span>
                        <i class="fa-regular fa-eye"></i> 45 просмотров
                    </div>
                </div>
                <div class="myad-actions">
                    <button class="myad-btn"><i class="fa-regular fa-pen-to-square"></i> Редактировать</button>
                    <button class="myad-btn"><i class="fa-regular fa-circle-check"></i> Продлить</button>
                </div>
            </div>
            <div class="myad-card">
                <img src="https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=400&h=300&fit=crop" alt="BMW X5" class="myad-image">
                <div class="myad-info">
                    <div class="myad-title">BMW X5 2019</div>
                    <div class="myad-status">
                        <i class="fa-regular fa-clock status-pending"></i> На модерации
                        <span style="margin: 0 0.5rem;">•</span>
                        <i class="fa-regular fa-eye"></i> 0 просмотров
                    </div>
                </div>
                <div class="myad-actions">
                    <button class="myad-btn"><i class="fa-regular fa-pen-to-square"></i> Редактировать</button>
                </div>
            </div>
        `;
        
        document.getElementById('myadsCount').textContent = 2;
        
    } else if (tab === 'settings') {
        // Настройки уже есть в HTML, ничего не делаем
    }
}

// Инициализация вкладок
function initProfileTabs() {
    document.querySelectorAll('.tab-btn-modern').forEach(btn => {
        btn.addEventListener('click', () => loadProfileTab(btn.dataset.tab));
    });
    
    // Обновляем счётчики при загрузке
    document.getElementById('favoritesCount').textContent = currentUser.favorites.length;
    document.getElementById('historyCount').textContent = currentUser.history.length;
}