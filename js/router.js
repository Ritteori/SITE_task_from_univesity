// Функция показа страницы
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    // Обновить активный класс в навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.dataset.page === pageId) link.classList.add('active');
        else link.classList.remove('active');
    });
}

// Инициализация навигации
function initRouter() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            showPage(page);

            // Дополнительные действия при переходе
            if (page === 'profile') loadProfileTab('favorites');
            if (page === 'compare') renderCompare();
            if (page === 'catalog') {
                loadFilterOptions();
                applyCatalogFilters();
            }
            if (page === 'journal') renderJournal();
        });
    });

    // Кнопка "Подать объявление"
    document.getElementById('addListingBtn').addEventListener('click', () => {
        showPage('addListing');
    });

    // Обработчик поиска
    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('quickSearch').value.toLowerCase().trim();
        
        // Переходим в каталог
        showPage('catalog');
        
        // Применяем фильтр по поиску (если есть запрос)
        if (query) {
            // Фильтруем автомобили по марке или модели
            const filtered = cars.filter(c => 
                c.make.toLowerCase().includes(query) || 
                c.model.toLowerCase().includes(query)
            );
            
            // Отображаем отфильтрованные
            renderCars('catalogCars', filtered);
            
            // Сбрасываем фильтры в панели (опционально)
            document.getElementById('filterMake').value = '';
            document.getElementById('filterModel').innerHTML = '<option value="">Сначала выберите марку</option>';
            document.getElementById('filterModel').disabled = true;
            document.getElementById('filterBody').value = '';
            document.getElementById('filterTransmission').value = '';
            document.getElementById('filterPriceMax').value = '';
            document.getElementById('filterYearMin').value = '';
            
            // Показываем сообщение о результате поиска
            const catalogTitle = document.querySelector('#catalog h1');
            const oldTitle = catalogTitle.innerText;
            catalogTitle.innerText = `Результаты поиска: "${query}" (найдено ${filtered.length})`;
            setTimeout(() => {
                catalogTitle.innerText = oldTitle;
            }, 3000);
        } else {
            // Если пустой запрос - показываем все
            renderCars('catalogCars', cars);
        }
    });

    document.getElementById('quickSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('searchBtn').click();
        }
    });
}