// Глобальные функции для onclick (используются в детальной карточке)
window.showPage = showPage;
window.showCarDetail = showCarDetail;
window.openArticle = openArticle;
window.closeModal = closeModal;

// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем фильтры и инициализируем модули
    loadFilterOptions();
    initRouter();
    initFilters();
    initProfileTabs();
    initCalculator();

    // Делегирование событий на кнопки внутри карточек
    document.addEventListener('click', (e) => {
        if (e.target.closest('.details-btn')) {
            const id = parseInt(e.target.closest('.details-btn').dataset.id);
            showCarDetail(id);
        }
        if (e.target.closest('.favorite-btn')) {
            const btn = e.target.closest('.favorite-btn');
            const id = parseInt(btn.dataset.id);
            const idx = currentUser.favorites.indexOf(id);
            if (idx === -1) currentUser.favorites.push(id);
            else currentUser.favorites.splice(idx, 1);
            saveFavorites();
            btn.classList.toggle('active');
        }
        if (e.target.closest('.compare-btn')) {
            const btn = e.target.closest('.compare-btn');
            const id = parseInt(btn.dataset.id);
            const idx = compareList.indexOf(id);
            if (idx === -1) {
                compareList.push(id);
            } else {
                compareList.splice(idx, 1);
            }
            saveCompare();
            btn.classList.toggle('active');
        }
        
        // Обработчик для открытия статей
        const articleCard = e.target.closest('.article-card');
        if (articleCard) {
            const id = parseInt(articleCard.dataset.id);
            openArticle(id);
        }
    });

    // Закрытие модального окна
    document.querySelector('.close-modal')?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Показываем главную страницу по умолчанию
    showPage('home');
});