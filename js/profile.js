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
        const myadsContainer = document.getElementById('myadsList');
        
        if (userListings.length === 0) {
            myadsContainer.innerHTML = `
                <div class="profile-empty">
                    <i class="fa-regular fa-rectangle-ad"></i>
                    <p>У вас пока нет объявлений</p>
                    <button class="btn btn-primary" onclick="showPage('addListing')">
                        <i class="fa-regular fa-plus"></i> Подать объявление
                    </button>
                </div>
            `;
        } else {
            let html = '';
            userListings.forEach(listing => {
                const statusClass = listing.status === 'active' ? 'status-active' : 
                                listing.status === 'pending' ? 'status-pending' : 'status-sold';
                const statusText = listing.status === 'active' ? 'Активно' :
                                listing.status === 'pending' ? 'На модерации' : 'Продано';
                
                html += `
                    <div class="myad-card">
                        <img src="${listing.mainPhoto}" alt="${listing.make} ${listing.model}" class="myad-image">
                        <div class="myad-info">
                            <div class="myad-title">${listing.make} ${listing.model} ${listing.year}</div>
                            <div class="myad-status">
                                <i class="fa-regular fa-circle-check ${statusClass}"></i> ${statusText}
                                <span style="margin: 0 0.5rem;">•</span>
                                <i class="fa-regular fa-eye"></i> ${listing.views || 0} просмотров
                                <span style="margin: 0 0.5rem;">•</span>
                                <i class="fa-regular fa-calendar"></i> ${listing.date}
                            </div>
                        </div>
                        <div class="myad-actions">
                            <button class="myad-btn" onclick="alert('Редактирование (демо)')">
                                <i class="fa-regular fa-pen-to-square"></i> Редактировать
                            </button>
                            ${listing.status === 'active' ? `
                            <button class="myad-btn" onclick="alert('Продление (демо)')">
                                <i class="fa-regular fa-circle-check"></i> Продлить
                            </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            });
            myadsContainer.innerHTML = html;
        }
        
        document.getElementById('myadsCount').textContent = userListings.length;
        
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