// Загрузить опции марок в select
function loadFilterOptions() {
    const makes = [...new Set(cars.map(c => c.make))];
    const makeSelect = document.getElementById('filterMake');
    makeSelect.innerHTML = '<option value="">Все</option>' + makes.map(m => `<option value="${m}">${m}</option>`).join('');
}

// Обработчик изменения марки — загружаем модели
document.getElementById('filterMake')?.addEventListener('change', function() {
    const make = this.value;
    const modelSelect = document.getElementById('filterModel');
    modelSelect.disabled = !make;
    if (make) {
        const models = [...new Set(cars.filter(c => c.make === make).map(c => c.model))];
        modelSelect.innerHTML = '<option value="">Все</option>' + models.map(m => `<option value="${m}">${m}</option>`).join('');
    } else {
        modelSelect.innerHTML = '<option value="">Сначала выберите марку</option>';
    }
});

// Применить фильтры и отрисовать каталог
function applyCatalogFilters() {
    let filtered = [...cars];
    const make = document.getElementById('filterMake').value;
    const model = document.getElementById('filterModel').value;
    const body = document.getElementById('filterBody').value;
    const trans = document.getElementById('filterTransmission').value;
    const priceMax = document.getElementById('filterPriceMax').value;
    const yearMin = document.getElementById('filterYearMin').value;

    if (make) filtered = filtered.filter(c => c.make === make);
    if (model) filtered = filtered.filter(c => c.model === model);
    if (body) filtered = filtered.filter(c => c.body === body);
    if (trans) filtered = filtered.filter(c => c.transmission === trans);
    if (priceMax) filtered = filtered.filter(c => c.price <= parseInt(priceMax));
    if (yearMin) filtered = filtered.filter(c => c.year >= parseInt(yearMin));

    renderCars('catalogCars', filtered);
}

// Инициализация фильтров
function initFilters() {
    document.getElementById('applyFilters').addEventListener('click', applyCatalogFilters);
}