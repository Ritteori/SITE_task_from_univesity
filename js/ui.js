f// Рендер одной карточки автомобиля (обновлённая версия с иконками и локализацией)
function renderCarCard(car, showActions = true) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.dataset.id = car.id;
    
    // Локализация типа кузова
    const bodyMap = {
        'sedan': 'Седан',
        'suv': 'Внедорожник',
        'hatchback': 'Хэтчбек',
        'wagon': 'Универсал'
    };
    
    card.innerHTML = `
        <div class="car-img" style="background-image: url('${car.image}');">
            <span class="badge">${car.year}</span>
            ${car.isPremium ? '<span class="badge" style="left: auto; right: 10px; background: #ffc107; color: #000;">Premium</span>' : ''}
        </div>
        <div class="car-info">
            <div class="car-title">${car.make} ${car.model}</div>
            <div class="car-price">$${car.price.toLocaleString()}</div>
            <div class="car-details">
                <span title="Двигатель"><i class="fa-solid fa-gas-pump"></i> ${car.engine} л</span>
                <span title="Коробка"><i class="fa-solid fa-gear"></i> ${car.transmission === 'auto' ? 'Автомат' : 'Механика'}</span>
                <span title="Пробег"><i class="fa-solid fa-road"></i> ${car.mileage.toLocaleString()} км</span>
            </div>
            <div class="car-details" style="margin-top: 0.3rem;">
                <span title="Кузов"><i class="fa-solid fa-car"></i> ${bodyMap[car.body] || car.body}</span>
                <span title="Цвет"><i class="fa-solid fa-palette"></i> ${car.color}</span>
            </div>
            ${showActions ? `
            <div class="car-actions">
                <button class="icon-btn favorite-btn ${currentUser.favorites.includes(car.id) ? 'active' : ''}" data-id="${car.id}" title="В избранное">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <button class="icon-btn compare-btn ${compareList.includes(car.id) ? 'active' : ''}" data-id="${car.id}" title="Сравнить">
                    <i class="fa-solid fa-scale-balanced"></i>
                </button>
                <button class="btn btn-outline details-btn" data-id="${car.id}">Подробнее</button>
            </div>` : ''}
        </div>
    `;
    return card;
}

// Заполнить сетку
function renderCars(containerId, carsArray, showActions = true) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    carsArray.forEach(car => {
        container.appendChild(renderCarCard(car, showActions));
    });
}

// Обновить состояние кнопок избранного/сравнения на всех карточках
function refreshActionButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const id = parseInt(btn.dataset.id);
        if (currentUser.favorites.includes(id)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    document.querySelectorAll('.compare-btn').forEach(btn => {
        const id = parseInt(btn.dataset.id);
        if (compareList.includes(id)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// Загрузка главной страницы (теперь статичная, ничего не делаем)
function loadHomePage() {
    // Главная теперь статична, автомобили не загружаем
}

// Показать детальную карточку (обновлённая версия)
function showCarDetail(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return;
    addToHistory(carId);
    
    // Находим похожие авто (та же марка или тот же ценовой диапазон)
    const similarCars = cars.filter(c => 
        c.id !== carId && (c.make === car.make || Math.abs(c.price - car.price) < 5000)
    ).slice(0, 3);
    
    const detailPage = document.getElementById('carDetail');
    detailPage.innerHTML = `
        <button class="btn" onclick="showPage('catalog')"><i class="fa-solid fa-arrow-left"></i> Назад</button>
        <div class="car-detail">
            <div class="detail-gallery">
                <div class="main-photo" style="background-image:url('${car.image}')"></div>
                <div class="thumbnails">
                    <div class="thumb active" style="background-image:url('${car.image}')"></div>
                    <div class="thumb" style="background-image:url('${car.image}')"></div>
                    <div class="thumb" style="background-image:url('${car.image}')"></div>
                </div>
            </div>
            <h2>${car.make} ${car.model}, ${car.year}</h2>
            <div class="detail-specs">
                <div class="spec-item"><strong>Цена:</strong> $${car.price}</div>
                <div class="spec-item"><strong>Кузов:</strong> ${car.body === 'sedan' ? 'Седан' : car.body === 'suv' ? 'Внедорожник' : car.body}</div>
                <div class="spec-item"><strong>Двигатель:</strong> ${car.engine}L</div>
                <div class="spec-item"><strong>Коробка:</strong> ${car.transmission === 'auto' ? 'Автомат' : 'Механика'}</div>
                <div class="spec-item"><strong>Пробег:</strong> ${car.mileage} км</div>
                <div class="spec-item"><strong>Цвет:</strong> ${car.color}</div>
            </div>
            
            <!-- Блок контактов продавца -->
            <div style="background: var(--bg-light); padding: 1.5rem; border-radius: var(--border-radius); margin: 1.5rem 0;">
                <h3>Контакты продавца</h3>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
                    <a href="https://t.me/shift_by" target="_blank" class="btn" style="background: #0088cc; color: white;">
                        <i class="fa-brands fa-telegram"></i> Telegram
                    </a>
                    <a href="https://wa.me/375291234567" target="_blank" class="btn" style="background: #25D366; color: white;">
                        <i class="fa-brands fa-whatsapp"></i> WhatsApp
                    </a>
                    <a href="viber://chat?number=%2B375291234567" target="_blank" class="btn" style="background: #7360F2; color: white;">
                        <i class="fa-brands fa-viber"></i> Viber
                    </a>
                    <button class="btn btn-outline" onclick="alert('Телефон: +375 (29) 123-45-67')">
                        <i class="fa-solid fa-phone"></i> Показать телефон
                    </button>
                </div>
                <p style="margin-top: 1rem;"><i class="fa-solid fa-user"></i> ИП Иванов И.И., на рынке с 2020 года</p>
            </div>
            
            <div style="display:flex; gap:1rem; margin-bottom: 2rem;">
                <button class="btn btn-primary favorite-btn-detail ${currentUser.favorites.includes(car.id) ? 'active' : ''}" data-id="${car.id}">
                    <i class="fa-solid fa-heart"></i> ${currentUser.favorites.includes(car.id) ? 'В избранном' : 'В избранное'}
                </button>
            </div>
            
            <!-- Похожие предложения -->
            ${similarCars.length > 0 ? `
            <h3>Похожие предложения</h3>
            <div class="cars-grid" id="similarCars" style="grid-template-columns: repeat(3, 1fr);"></div>
            ` : ''}
        </div>
    `;
    
    // Отрисовываем похожие
    if (similarCars.length > 0) {
        const similarContainer = document.getElementById('similarCars');
        similarCars.forEach(similar => {
            similarContainer.appendChild(renderCarCard(similar, true));
        });
    }
    
    showPage('carDetail');
    
    // Обработчик для избранного внутри детальной
    detailPage.querySelector('.favorite-btn-detail')?.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        const idx = currentUser.favorites.indexOf(id);
        if (idx === -1) {
            currentUser.favorites.push(id);
            this.innerHTML = '<i class="fa-solid fa-heart"></i> В избранном';
        } else {
            currentUser.favorites.splice(idx, 1);
            this.innerHTML = '<i class="fa-solid fa-heart"></i> В избранное';
        }
        saveFavorites();
        this.classList.toggle('active');
        refreshActionButtons();
    });
}

// Рендер страницы сравнения (обновлённая версия)
function renderCompare() {
    const container = document.getElementById('compareContainer');
    if (compareList.length === 0) {
        container.innerHTML = '<p>Нет автомобилей для сравнения. Добавьте авто в сравнение из каталога.</p>';
        return;
    }
    
    const compareCars = cars.filter(c => compareList.includes(c.id));
    
    let html = '<div style="margin-bottom: 1rem;"><button class="btn btn-outline" id="clearCompare">Очистить список</button></div>';
    html += '<table class="compare-table"><tr><th>Характеристика</th>';
    
    compareCars.forEach(c => html += `<th>${c.make} ${c.model} <button class="icon-btn remove-compare" data-id="${c.id}" style="float: right;" title="Убрать"><i class="fa-solid fa-xmark"></i></button></th>`);
    html += '</tr>';
    
    const rows = [
        { label: 'Год', field: 'year' },
        { label: 'Цена, $', field: 'price' },
        { label: 'Кузов', field: 'body', transform: (v) => v === 'sedan' ? 'Седан' : v === 'suv' ? 'Внедорожник' : v },
        { label: 'Двигатель, л', field: 'engine' },
        { label: 'Коробка', field: 'transmission', transform: (v) => v === 'auto' ? 'Автомат' : 'Механика' },
        { label: 'Пробег, км', field: 'mileage' },
        { label: 'Цвет', field: 'color' }
    ];
    
    rows.forEach(r => {
        html += `<tr><td>${r.label}</td>`;
        compareCars.forEach(c => {
            let value = c[r.field];
            if (r.transform) value = r.transform(value);
            html += `<td>${value}</td>`;
        });
        html += '</tr>';
    });
    html += '</table>';
    
    container.innerHTML = html;
    
    // Обработчики удаления из сравнения
    document.querySelectorAll('.remove-compare').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.dataset.id);
            const idx = compareList.indexOf(id);
            if (idx !== -1) {
                compareList.splice(idx, 1);
                saveCompare();
                renderCompare(); // перерисовываем
                refreshActionButtons(); // обновляем кнопки в других местах
            }
        });
    });
    
    // Очистить всё
    document.getElementById('clearCompare')?.addEventListener('click', () => {
        compareList = [];
        saveCompare();
        renderCompare();
        refreshActionButtons();
    });
}

// Рендер журнала (карточки)
function renderJournal() {
    const container = document.getElementById('articlesContainer');
    container.className = 'articles-grid'; // меняем класс для сетки
    container.innerHTML = articles.map(a => `
        <div class="article-card" data-id="${a.id}">
            <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-${150000 + a.id * 100}?w=400&h=300&fit=crop');"></div>
            <div class="article-info">
                <h3>${a.title}</h3>
                <div class="article-date">
                    <i class="fa-regular fa-calendar"></i> ${a.date}
                </div>
                <p class="article-preview">${a.preview}</p>
            </div>
        </div>
    `).join('');
}

// Открыть модальное окно со статьёй
function openArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    document.getElementById('modalTitle').textContent = article.title;
    document.getElementById('modalDate').innerHTML = `<i class="fa-regular fa-calendar"></i> ${article.date}`;
    document.getElementById('modalContent').innerHTML = `<p>${article.content.replace(/\n/g, '</p><p>')}</p>`;
    
    document.getElementById('articleModal').style.display = 'block';
}

// Закрыть модальное окно
function closeModal() {
    document.getElementById('articleModal').style.display = 'none';
}

// Инициализация калькулятора (обновлённая версия)
function initCalculator() {
    // Добавим выбор банка
    const calculatorDiv = document.querySelector('.calculator');
    
    // Добавляем select перед существующими полями
    const bankSelect = document.createElement('div');
    bankSelect.className = 'calc-row';
    bankSelect.innerHTML = `
        <label>Банк / программа</label>
        <select id="bankProgram">
            <option value="5.5">Беларусбанк (5.5%)</option>
            <option value="6.0">Белинвестбанк (6.0%)</option>
            <option value="4.9">Акция "Авто на выгодных" (4.9%)</option>
            <option value="7.0">Приорбанк (7.0%)</option>
        </select>
    `;
    
    // Вставляем первым элементом
    calculatorDiv.insertBefore(bankSelect, calculatorDiv.firstChild);
    
    document.getElementById('calcLoan').addEventListener('click', () => {
        const price = parseFloat(document.getElementById('carPrice').value) || 0;
        const down = parseFloat(document.getElementById('downPayment').value) || 0;
        const term = parseFloat(document.getElementById('loanTerm').value) || 1;
        const rate = parseFloat(document.getElementById('bankProgram').value) || 5.5;
        
        const principal = price - down;
        const monthlyRate = rate / 100 / 12;
        
        let payment;
        if (monthlyRate === 0 || principal <= 0) {
            payment = principal / term;
        } else {
            payment = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
        }
        
        document.getElementById('monthlyPayment').innerHTML = `
            $${payment.toFixed(2)} <small style="font-size: 0.8rem;">в месяц</small>
            <br>
            <small style="font-size: 0.7rem; color: #666;">Общая сумма: $${(payment * term).toFixed(2)}</small>
        `;
    });
    
    // Добавим быстрые подсказки
    const hints = document.createElement('div');
    hints.className = 'calc-row';
    hints.innerHTML = `
        <p style="font-size: 0.9rem; color: #666;">
            <i class="fa-solid fa-info-circle"></i> 
            Пример: при цене $25000, первом взносе $5000 на 5 лет (60 мес.) платёж ≈ $380
        </p>
    `;
    calculatorDiv.appendChild(hints);
}