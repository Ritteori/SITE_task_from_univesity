// Рендер одной карточки автомобиля (обновлённая версия с иконками и локализацией)
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

// Переменные для хранения данных формы
let listingPhotos = [];
let selectedCategory = 'car';

// Инициализация формы подачи объявления (ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ)
function initListingForm() {
    console.log('Инициализация формы подачи объявления');
    
    // СБРАСЫВАЕМ ВСЕ СОСТОЯНИЕ ПРИ ИНИЦИАЛИЗАЦИИ
    listingPhotos = [];
    selectedCategory = 'car';
    
    // Выбор категории
    document.querySelectorAll('.category-option').forEach(opt => {
        // Удаляем старые обработчики, чтобы не было дублирования
        opt.replaceWith(opt.cloneNode(true));
    });
    
    // Заново добавляем обработчики
    document.querySelectorAll('.category-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.category-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedCategory = this.dataset.category;
            console.log('Выбрана категория:', selectedCategory);
        });
    });
    
    // Устанавливаем начальную выбранную категорию
    const defaultCategory = document.querySelector('.category-option[data-category="car"]');
    if (defaultCategory) {
        defaultCategory.classList.add('selected');
    }
    
    // Навигация по шагам (кнопки "Далее") - ВАЖНО: очищаем и добавляем заново
    document.querySelectorAll('.next-step').forEach(btn => {
        // Удаляем старые обработчики
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Заново добавляем обработчики для кнопок "Далее"
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const nextStep = parseInt(this.dataset.next);
            console.log('Клик по кнопке Далее на шаг:', nextStep);
            
            // Определяем текущий шаг (предыдущий)
            const currentStep = nextStep - 1;
            console.log('Текущий шаг для валидации:', currentStep);
            
            if (validateStep(currentStep)) {
                console.log('Валидация успешна, переходим на шаг:', nextStep);
                goToStep(nextStep);
            } else {
                console.log('Валидация не пройдена');
            }
        });
    });
    
    // Специальный обработчик для кнопки на шаге 3 (переход на шаг 4)
    const continueBtn = document.getElementById('continueToStep4');
    if (continueBtn) {
        // Удаляем предыдущие обработчики
        const newBtn = continueBtn.cloneNode(true);
        continueBtn.parentNode.replaceChild(newBtn, continueBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Клик по специальной кнопке continueToStep4');
            
            if (validateStep(3)) { // Валидация шага 3
                console.log('Валидация шага 3 успешна, переходим на шаг 4');
                goToStep(4); // Переход на шаг 4
            } else {
                console.log('Валидация шага 3 не пройдена');
            }
        });
        
        // Изначально кнопка отключена (нет фото)
        newBtn.disabled = true;
        console.log('Кнопка continueToStep4 инициализирована и отключена');
    } else {
        console.error('Кнопка continueToStep4 не найдена при инициализации');
    }
    
    // Навигация по шагам (кнопки "Назад")
    document.querySelectorAll('.prev-step').forEach(btn => {
        // Удаляем старые обработчики
        btn.replaceWith(btn.cloneNode(true));
    });
    
    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const prevStep = parseInt(this.dataset.prev);
            console.log('Клик по кнопке Назад на шаг:', prevStep);
            goToStep(prevStep);
        });
    });
    
    // Загрузка фото
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    
    if (dropZone && fileInput) {
        // Удаляем старые обработчики
        const newDropZone = dropZone.cloneNode(true);
        dropZone.parentNode.replaceChild(newDropZone, dropZone);
        
        const newFileInput = fileInput.cloneNode(true);
        fileInput.parentNode.replaceChild(newFileInput, fileInput);
        
        // Заново добавляем обработчики
        document.getElementById('dropZone').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        
        document.getElementById('dropZone').addEventListener('dragover', (e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.background = 'rgba(0,103,99,0.02)';
        });
        
        document.getElementById('dropZone').addEventListener('dragleave', (e) => {
            e.currentTarget.style.borderColor = '#cbd5d5';
            e.currentTarget.style.background = 'transparent';
        });
        
        document.getElementById('dropZone').addEventListener('drop', (e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = '#cbd5d5';
            e.currentTarget.style.background = 'transparent';
            handleFiles(e.dataTransfer.files);
        });
        
        document.getElementById('fileInput').addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    } else {
        console.error('Элементы загрузки фото не найдены');
    }
    
    // Отправка формы
    const submitBtn = document.getElementById('submitListing');
    if (submitBtn) {
        // Удаляем старые обработчики
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
        
        document.getElementById('submitListing').addEventListener('click', submitListingForm);
    } else {
        console.error('Кнопка submitListing не найдена');
    }
    
    // Сбрасываем форму на первый шаг
    goToStep(1);
}

// Переход между шагами
function goToStep(step) {
    console.log('Переход на шаг:', step);
    
    // Проверяем, что step - число
    if (isNaN(step)) {
        console.error('Ошибка: step не является числом', step);
        return;
    }
    
    // Скрываем все шаги
    document.querySelectorAll('.step-content').forEach(s => {
        s.style.display = 'none';
    });
    
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active');
    });
    
    // Показываем нужный шаг
    const targetStep = document.getElementById(`step${step}`);
    if (targetStep) {
        targetStep.style.display = 'block';
        console.log(`Шаг ${step} отображен`);
    } else {
        console.error(`Шаг ${step} не найден в DOM`);
        return;
    }
    
    // Активируем индикатор шага
    const stepIndicator = document.querySelector(`.step[data-step="${step}"]`);
    if (stepIndicator) {
        stepIndicator.classList.add('active');
    } else {
        console.error(`Индикатор шага ${step} не найден`);
    }
    
    // Прокрутка вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Специальная обработка для шага 3 - проверяем кнопку "Далее"
    if (step === 3) {
        const continueBtn = document.getElementById('continueToStep4');
        if (continueBtn) {
            continueBtn.disabled = listingPhotos.length === 0;
            console.log('Кнопка continueToStep4 на шаге 3:', continueBtn.disabled ? 'отключена' : 'включена');
        }
    }
}

// Валидация шага
function validateStep(step) {
    switch(step) {
        case 1: // Шаг 1 всегда валиден (выбор категории)
            return true;
        case 2: // Шаг 2 - характеристики
            const make = document.getElementById('listingMake').value.trim();
            const model = document.getElementById('listingModel').value.trim();
            const year = document.getElementById('listingYear').value;
            
            if (!make || !model || !year) {
                alert('Заполните обязательные поля: Марка, Модель, Год');
                return false;
            }
            return true;
        case 3: // Шаг 3 - фото
            if (listingPhotos.length === 0) {
                alert('Добавьте хотя бы одно фото');
                return false;
            }
            return true;
        case 4: // Шаг 4 - цена
            const price = document.getElementById('listingPrice').value;
            if (!price || price < 100) {
                alert('Укажите корректную цену (мин. $100)');
                return false;
            }
            return true;
        default:
            return true;
    }
}

// Обработка файлов
function handleFiles(files) {
    const maxPhotos = 10;
    const maxSize = 10 * 1024 * 1024; // 10 МБ
    
    console.log('Обработка файлов:', files.length);
    
    for (let file of files) {
        if (listingPhotos.length >= maxPhotos) {
            alert(`Максимум ${maxPhotos} фото`);
            break;
        }
        
        if (file.size > maxSize) {
            alert(`Файл ${file.name} слишком большой (макс. 10 МБ)`);
            continue;
        }
        
        if (!file.type.startsWith('image/')) {
            alert(`Файл ${file.name} не является изображением`);
            continue;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            listingPhotos.push({
                data: e.target.result,
                name: file.name,
                isMain: listingPhotos.length === 0 // первое фото - главное
            });
            console.log('Фото добавлено, всего:', listingPhotos.length);
            updatePhotoPreview();
            
            // Активируем кнопку "Далее" если есть фото
            const continueBtn = document.getElementById('continueToStep4');
            if (continueBtn) {
                continueBtn.disabled = listingPhotos.length === 0;
                console.log('Кнопка continueToStep4 теперь:', continueBtn.disabled ? 'отключена' : 'включена');
            } else {
                console.error('Кнопка continueToStep4 не найдена при обработке фото');
            }
        };
        reader.readAsDataURL(file);
    }
}

// Обновление превью фото
function updatePhotoPreview() {
    const container = document.getElementById('photoPreview');
    if (!container) return;
    
    container.innerHTML = '';
    
    listingPhotos.forEach((photo, index) => {
        const div = document.createElement('div');
        div.className = 'photo-preview-item';
        div.innerHTML = `
            <img src="${photo.data}" alt="Фото ${index + 1}">
            <button class="remove-photo" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
            ${index === 0 ? '<span class="main-photo-badge">Главное</span>' : ''}
        `;
        container.appendChild(div);
    });
    
    // Обработчики удаления
    document.querySelectorAll('.remove-photo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            listingPhotos.splice(index, 1);
            
            // Если удалили главное, делаем первое фото главным
            if (index === 0 && listingPhotos.length > 0) {
                listingPhotos[0].isMain = true;
            }
            
            updatePhotoPreview();
            
            // Обновляем состояние кнопки
            const continueBtn = document.getElementById('continueToStep4');
            if (continueBtn) {
                continueBtn.disabled = listingPhotos.length === 0;
                console.log('После удаления, кнопка:', continueBtn.disabled ? 'отключена' : 'включена');
            }
        });
    });
}

// Отправка формы
function submitListingForm() {
    if (!validateStep(4)) return;
    
    const priceInput = document.getElementById('listingPrice');
    if (!priceInput) {
        console.error('Элемент listingPrice не найден');
        return;
    }
    
    if (!validateStep(4)) return;
    
    const price = priceInput.value;
    if (!price || price < 100) {
        alert('Укажите корректную цену (мин. $100)');
        return;
    }
    
    // Собираем данные
    const listingData = {
        category: selectedCategory,
        make: document.getElementById('listingMake').value,
        model: document.getElementById('listingModel').value,
        year: parseInt(document.getElementById('listingYear').value),
        body: document.getElementById('listingBody').value,
        engine: parseFloat(document.getElementById('listingEngine').value) || 2.0,
        transmission: document.getElementById('listingTransmission').value,
        mileage: parseInt(document.getElementById('listingMileage').value) || 0,
        color: document.getElementById('listingColor').value || 'не указан',
        price: parseInt(price),
        description: document.getElementById('listingDescription').value,
        sellerName: document.getElementById('listingSellerName').value,
        phone: document.getElementById('listingPhone').value,
        contacts: {
            telegram: document.getElementById('contactTelegram').checked,
            whatsapp: document.getElementById('contactWhatsapp').checked,
            viber: document.getElementById('contactViber').checked
        },
        photos: listingPhotos.map(p => p.data),
        mainPhoto: listingPhotos[0]?.data || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
    };
    
    // Добавляем в массив объявлений
    const newListing = addListing(listingData);
    
    // Показываем сообщение об успехе
    alert('Объявление успешно опубликовано!');
    
    // Сбрасываем форму
    resetListingForm();
    
    // Переходим в личный кабинет
    showPage('profile');
    loadProfileTab('myads');
}

// Сброс формы
function resetListingForm() {
    listingPhotos = [];
    selectedCategory = 'car';
    
    document.getElementById('listingMake').value = '';
    document.getElementById('listingModel').value = '';
    document.getElementById('listingYear').value = '2020';
    document.getElementById('listingBody').value = 'sedan';
    document.getElementById('listingEngine').value = '2.0';
    document.getElementById('listingTransmission').value = 'auto';
    document.getElementById('listingMileage').value = '50000';
    document.getElementById('listingColor').value = '';
    document.getElementById('listingPrice').value = '';
    document.getElementById('listingDescription').value = '';
    document.getElementById('listingSellerName').value = 'Герман Т.В.';
    document.getElementById('listingPhone').value = '+375 (29) 123-45-67';
    
    document.querySelectorAll('.category-option').forEach(o => o.classList.remove('selected'));
    const defaultCategory = document.querySelector('.category-option[data-category="car"]');
    if (defaultCategory) defaultCategory.classList.add('selected');
    
    updatePhotoPreview();
    
    // Деактивируем кнопку "Далее" на шаге 3
    const continueBtn = document.getElementById('continueToStep4');
    if (continueBtn) {
        continueBtn.disabled = true;
    }
    
    goToStep(1);
}