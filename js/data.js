// Данные автомобилей (ОСНОВНОЙ КАТАЛОГ) - делаем изменяемым, поэтому let вместо const
let cars = [
    { id: 1, make: 'Audi', model: 'A6', year: 2020, price: 25000, body: 'sedan', transmission: 'auto', engine: '2.0', mileage: 45000, color: 'черный', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', isPremium: true },
    { id: 2, make: 'BMW', model: 'X5', year: 2019, price: 32000, body: 'suv', transmission: 'auto', engine: '3.0', mileage: 60000, color: 'синий', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=400&h=300&fit=crop', isPremium: false },
    { id: 3, make: 'Volkswagen', model: 'Passat', year: 2018, price: 15000, body: 'sedan', transmission: 'manual', engine: '1.8', mileage: 80000, color: 'серебристый', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', isPremium: false },
    { id: 4, make: 'Audi', model: 'Q7', year: 2021, price: 45000, body: 'suv', transmission: 'auto', engine: '3.0', mileage: 20000, color: 'белый', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop', isPremium: true },
    { id: 5, make: 'Toyota', model: 'Camry', year: 2022, price: 28000, body: 'sedan', transmission: 'auto', engine: '2.5', mileage: 15000, color: 'красный', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop', isPremium: false },
    { id: 6, make: 'Honda', model: 'CR-V', year: 2020, price: 22000, body: 'suv', transmission: 'auto', engine: '1.5', mileage: 35000, color: 'серый', image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=400&h=300&fit=crop', isPremium: false },
    { id: 7, make: 'Mercedes-Benz', model: 'E-Class', year: 2021, price: 38000, body: 'sedan', transmission: 'auto', engine: '2.0', mileage: 30000, color: 'черный', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop', isPremium: true },
    { id: 8, make: 'Volvo', model: 'XC90', year: 2020, price: 42000, body: 'suv', transmission: 'auto', engine: '2.0', mileage: 28000, color: 'синий', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', isPremium: true },
    { id: 9, make: 'Ford', model: 'Focus', year: 2019, price: 12000, body: 'hatchback', transmission: 'manual', engine: '1.6', mileage: 70000, color: 'белый', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop', isPremium: false },
    { id: 10, make: 'Hyundai', model: 'Tucson', year: 2021, price: 23000, body: 'suv', transmission: 'auto', engine: '2.0', mileage: 25000, color: 'серый', image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=400&h=300&fit=crop', isPremium: false },
    { id: 11, make: 'Kia', model: 'Sportage', year: 2022, price: 26000, body: 'suv', transmission: 'auto', engine: '2.4', mileage: 18000, color: 'красный', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop', isPremium: false },
    { id: 12, make: 'Lexus', model: 'RX', year: 2020, price: 41000, body: 'suv', transmission: 'auto', engine: '3.5', mileage: 22000, color: 'серебристый', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop', isPremium: true },
];

// Статьи журнала
const articles = [
    { id: 1, title: 'Как выбрать подержанный автомобиль', date: '2026-02-15', preview: 'Проверка юридической чистоты, диагностика, тест-драйв...', content: 'Полный текст статьи о том, как правильно выбрать подержанный автомобиль. Мы рассмотрим основные моменты: проверка документов, диагностика двигателя, кузова, ходовой части, а также юридическая проверка истории автомобиля. Не забывайте про тест-драйв и проверку у официального дилера.' },
    { id: 2, title: 'Новинки авторынка Беларуси 2026', date: '2026-03-01', preview: 'Какие модели появятся у дилеров в этом году?', content: 'Обзор новых автомобилей, которые появятся в Беларуси в 2026 году. В этом году ожидается множество новых моделей от ведущих производителей. Мы расскажем о самых ожидаемых новинках, их характеристиках и ценах.' },
    { id: 3, title: 'Кредит или лизинг: что выгоднее?', date: '2026-02-20', preview: 'Сравниваем условия банков и лизинговых компаний', content: 'Подробный анализ условий кредитования и лизинга для автомобилей в Беларуси. Рассмотрим преимущества и недостатки каждого способа, скрытые комиссии и требования к заемщикам. Поможем вам выбрать наиболее выгодный вариант.' }
];

// Состояние пользователя
let currentUser = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    history: JSON.parse(localStorage.getItem('history')) || []
};

let compareList = JSON.parse(localStorage.getItem('compareList')) || [];

// Функции сохранения
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(currentUser.favorites));
}
function saveHistory() {
    localStorage.setItem('history', JSON.stringify(currentUser.history));
}
function saveCompare() {
    localStorage.setItem('compareList', JSON.stringify(compareList));
}

// Вспомогательная функция для добавления в историю
function addToHistory(carId) {
    if (!currentUser.history.includes(carId)) {
        currentUser.history.unshift(carId);
        if (currentUser.history.length > 10) currentUser.history.pop();
        saveHistory();
    }
}

// ========== НОВЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С КАТАЛОГОМ ==========

// При загрузке страницы восстанавливаем каталог из localStorage (если есть)
const savedCars = localStorage.getItem('carsCatalog');
if (savedCars) {
    try {
        const parsed = JSON.parse(savedCars);
        if (Array.isArray(parsed) && parsed.length > 0) {
            cars = parsed;
        }
    } catch (e) {
        console.error('Ошибка загрузки сохраненного каталога', e);
    }
}

// Функция для получения следующего доступного ID
function getNextCarId() {
    if (cars.length === 0) return 1;
    const maxId = Math.max(...cars.map(c => c.id));
    return maxId + 1;
}

// Функция для добавления нового автомобиля в каталог
function addCarToListing(carData) {
    const newCar = {
        id: getNextCarId(),
        make: carData.make,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        body: carData.body || 'sedan',
        transmission: carData.transmission || 'auto',
        engine: carData.engine || '2.0',
        mileage: carData.mileage || 0,
        color: carData.color || 'не указан',
        image: carData.mainPhoto || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        isPremium: false, // Новые объявления не премиум
        isUserListing: true // Отметка, что это объявление пользователя
    };
    
    cars.push(newCar);
    
    // Сохраняем обновленный каталог в localStorage
    localStorage.setItem('carsCatalog', JSON.stringify(cars));
    
    return newCar;
}

// Массив для хранения объявлений пользователя
let userListings = JSON.parse(localStorage.getItem('userListings')) || [];

// Функция сохранения объявлений
function saveListings() {
    localStorage.setItem('userListings', JSON.stringify(userListings));
}

// Функция добавления нового объявления (ОБНОВЛЕННАЯ)
function addListing(listingData) {
    console.log('Добавление нового объявления:', listingData);
    
    // Сначала добавляем в каталог
    const newCar = addCarToListing(listingData);
    
    // Затем создаем запись в личных объявлениях
    const newListing = {
        id: newCar.id, // Используем тот же ID, что и в каталоге
        ...listingData,
        carId: newCar.id,
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'active',
        views: 0
    };
    
    userListings.unshift(newListing);
    saveListings();
    
    console.log('Объявление добавлено, новый ID:', newCar.id);
    console.log('Всего автомобилей в каталоге:', cars.length);
    
    return newListing;
}