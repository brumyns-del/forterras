/* ============================================================================
   ГЛОБАЛЬНАЯ БАЗА ДАННЫХ ПРОЕКТА (Master DB)
   ========================================================================== */
window.App = window.App || {};

App.DB = {
    // 1. СПРАВОЧНИК ПРОДУКТОВ (Базовые данные для всего проекта)
    Products: {
        'veg_spinach': { name: 'Шпинат', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_carrot': { name: 'Морковь', category: 'vegetables', group: 'Овощи и зелень', color: 'orange' },

        // --- ПОЛЕЗНЫЕ ЖИРЫ ---
        'fat_olive': { name: 'Оливковое масло Extra Virgin', category: 'fats', group: 'Полезные жиры', color: 'green' },
        'fat_pumpkin': { name: 'Тыквенное масло', category: 'fats', group: 'Полезные жиры', color: 'green' },
        'fat_sunflower': { name: 'Подсолнечное масло', category: 'fats', group: 'Полезные жиры', color: 'yellow' },
        'fat_butter': { name: 'Сливочное масло 82%', category: 'fats', group: 'Полезные жиры', color: 'yellow' },
        'fat_fish': { name: 'Рыбий жир', category: 'fats', group: 'Полезные жиры', color: 'orange' },
        'fat_coconut': { name: 'Кокосовое масло', category: 'fats', group: 'Полезные жиры', color: 'white' },

        // --- ВОДА И НАПИТКИ ---
        'water_plain': { name: 'Вода питьевая', category: 'water', group: 'Вода и напитки', color: 'white' },
        'water_coffee': { name: 'Кофе', category: 'water', group: 'Вода и напитки', color: 'brown' },
        'water_cocoa': { name: 'Цикорий', category: 'water', group: 'Вода и напитки', color: 'brown' },
        'water_matcha': { name: 'Матча', category: 'water', group: 'Вода и напитки', color: 'green' },
        'water_karkade': { name: 'Чай каркаде', category: 'water', group: 'Вода и напитки', color: 'red' },
        'water_anchan': { name: 'Анчан (синий чай)', category: 'water', group: 'Вода и напитки', color: 'purple' }
    },

    // 2. МАГАЗИНЫ И АССОРТИМЕНТ
    Stores: {
        'store_pyaterochka': {
            name: 'Пятёрочка',
            assortment: [
                { productId: 'fat_olive', price: 450 },
                { productId: 'fat_sunflower', price: 120 },
                { productId: 'fat_butter', price: 180 },
                { productId: 'water_plain', price: 30 },
                { productId: 'water_coffee', price: 250 }
            ]
        }
    },

    // 3. ТОЧКИ ПИТАНИЯ
    Places: {
        'place_vkusno': {
            name: 'Вкусно и точка',
            menu: [
                { dishName: 'Салат овощной', categories: ['vegetables'], colors: ['green', 'red'] },
                { dishName: 'Картофель фри', categories: ['carbs'], colors: ['yellow'] },
                { dishName: 'Чай чёрный', categories: ['water'], colors: ['brown', 'orange'] }
            ]
        }
    }
};