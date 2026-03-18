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

// Рендер страницы сравнения (табличная версия)
function renderCompare() {
    const container = document.getElementById('compareContainer');
    
    if (compareList.length === 0) {
        container.innerHTML = `
            <div class="compare-empty">
                <i class="fa-solid fa-scale-balanced"></i>
                <h3>Список сравнения пуст</h3>
                <p>Добавьте автомобили в сравнение из каталога</p>
                <a href="#" data-page="catalog" class="btn btn-primary nav-link">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    Перейти в каталог
                </a>
            </div>
        `;
        return;
    }
    
    const compareCars = cars.filter(c => compareList.includes(c.id));
    
    // Локализация типов кузова
    const bodyMap = {
        'sedan': 'Седан',
        'suv': 'Внедорожник',
        'hatchback': 'Хэтчбек',
        'wagon': 'Универсал'
    };
    
    // Начинаем формировать таблицу
    let html = '<div class="compare-table-wrapper">';
    html += '<table class="compare-table">';
    
    // Шапка с автомобилями
    html += '<tr><th>Характеристики</th>';
    compareCars.forEach(car => {
        html += `
            <th style="position: relative;">
                <button class="remove-car-btn" data-id="${car.id}" title="Убрать из сравнения">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="compare-car-header">
                    <img src="${car.image}" alt="${car.make} ${car.model}" class="compare-car-image">
                    <div class="compare-car-title">${car.make} ${car.model}</div>
                    <div class="compare-car-price">$${car.price.toLocaleString()}</div>
                </div>
            </th>
        `;
    });
    html += '</tr>';
    
    // Год
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-solid fa-calendar"></i></span> Год выпуска</td>';
    compareCars.forEach(car => html += `<td><span class="compare-spec-value">${car.year}</span></td>`);
    html += '</tr>';
    
    // Пробег
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-solid fa-road"></i></span> Пробег</td>';
    compareCars.forEach(car => html += `<td><span class="compare-spec-value">${car.mileage.toLocaleString()} км</span></td>`);
    html += '</tr>';
    
    // Двигатель
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-solid fa-gas-pump"></i></span> Двигатель</td>';
    compareCars.forEach(car => html += `<td><span class="compare-spec-value">${car.engine} л</span></td>`);
    html += '</tr>';
    
    // Коробка передач
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-solid fa-gear"></i></span> Коробка</td>';
    compareCars.forEach(car => {
        const trans = car.transmission === 'auto' ? 'Автомат' : 'Механика';
        html += `<td><span class="compare-spec-value">${trans}</span></td>`;
    });
    html += '</tr>';
    
    // Кузов
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-solid fa-car"></i></span> Кузов</td>';
    compareCars.forEach(car => html += `<td><span class="compare-spec-value">${bodyMap[car.body] || car.body}</span></td>`);
    html += '</tr>';
    
    // Цвет
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-solid fa-palette"></i></span> Цвет</td>';
    compareCars.forEach(car => html += `<td><span class="compare-spec-value">${car.color}</span></td>`);
    html += '</tr>';
    
    // Привод (добавим для примера, можно расширить)
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-solid fa-tire"></i></span> Привод</td>';
    compareCars.forEach(car => html += `<td><span class="compare-spec-value">Передний</span></td>`);
    html += '</tr>';
    
    // Кнопка подробнее в последней строке
    html += '<tr><td><span class="compare-spec-icon"><i class="fa-regular fa-eye"></i></span> Действия</td>';
    compareCars.forEach(car => {
        html += `
            <td>
                <button class="btn-compare-detail details-btn" data-id="${car.id}">
                    <i class="fa-regular fa-eye"></i> Подробнее
                </button>
                <button class="icon-btn favorite-btn ${currentUser.favorites.includes(car.id) ? 'active' : ''}" 
                        data-id="${car.id}" title="В избранное" style="margin-left: 0.5rem;">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </td>
        `;
    });
    html += '</tr>';
    
    html += '</table>';
    html += '</div>';
    
    container.innerHTML = html;
    
    // Обработчики удаления из сравнения
    document.querySelectorAll('.remove-car-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
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
    
    // Обработчик для кнопки "Очистить всё"
    document.getElementById('clearCompare')?.addEventListener('click', () => {
        if (compareList.length > 0 && confirm('Очистить список сравнения?')) {
            compareList = [];
            saveCompare();
            renderCompare();
            refreshActionButtons();
        }
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

// Инициализация калькулятора (новая версия с ползунками)
function initCalculator() {
    const carPrice = document.getElementById('carPrice');
    const carPriceRange = document.getElementById('carPriceRange');
    const priceValue = document.getElementById('priceValue');
    
    const downPayment = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');
    const downValue = document.getElementById('downValue');
    
    const loanTerm = document.getElementById('loanTerm');
    const loanTermRange = document.getElementById('loanTermRange');
    const termValue = document.getElementById('termValue');
    
    const bankProgram = document.getElementById('bankProgram');
    const interestRateDisplay = document.getElementById('interestRateDisplay');
    
    // Синхронизация ползунков и числовых полей
    function syncInputs(range, number, display, suffix = '$', isPrice = false) {
        range.addEventListener('input', function() {
            const val = this.value;
            number.value = val;
            if (isPrice) {
                display.textContent = Number(val).toLocaleString();
            } else {
                display.textContent = val;
            }
            calculatePayment();
        });
        
        number.addEventListener('input', function() {
            let val = this.value;
            if (val < this.min) val = this.min;
            if (val > this.max) val = this.max;
            this.value = val;
            range.value = val;
            if (isPrice) {
                display.textContent = Number(val).toLocaleString();
            } else {
                display.textContent = val;
            }
            calculatePayment();
        });
    }
    
    syncInputs(carPriceRange, carPrice, priceValue, '$', true);
    syncInputs(downPaymentRange, downPayment, downValue, '$', true);
    syncInputs(loanTermRange, loanTerm, termValue, ' мес', false);
    
    // Обновление процентной ставки при выборе банка
    bankProgram.addEventListener('change', function() {
        const rate = this.value;
        interestRateDisplay.textContent = rate + '%';
        calculatePayment();
    });
    
    // Основная функция расчёта
    function calculatePayment() {
        const price = parseFloat(carPrice.value) || 0;
        const down = parseFloat(downPayment.value) || 0;
        const term = parseFloat(loanTerm.value) || 1;
        const rate = parseFloat(bankProgram.value) || 5.5;
        
        const principal = price - down;
        const monthlyRate = rate / 100 / 12;
        
        let payment;
        if (monthlyRate === 0 || principal <= 0) {
            payment = principal / term;
        } else {
            payment = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
        }
        
        const totalPayment = payment * term;
        const overpayment = totalPayment - principal;
        
        // Обновляем отображение
        document.getElementById('monthlyPayment').innerHTML = `$${payment.toFixed(0)}`;
        document.getElementById('loanAmount').textContent = `$${principal.toLocaleString()}`;
        document.getElementById('overpayment').textContent = `$${overpayment.toFixed(0)}`;
        interestRateDisplay.textContent = rate + '%';
        
        // Прогресс-бар (соотношение выплаченного к общей сумме)
        const progressPercent = (payment * term / (price * 1.2)) * 100;
        document.getElementById('paymentProgress').style.width = Math.min(progressPercent, 100) + '%';
    }
    
    // Первоначальный расчёт
    calculatePayment();
}