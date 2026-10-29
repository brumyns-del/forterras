const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

console.log("1. Начинаем сборку двуязычной базы USDA...");

const filePath = path.join(__dirname, 'food.csv');
const allProducts = {};
const uniqueNames = new Set();

const badWords = ['canned', 'frozen', 'baby food', 'fast food', 'restaurant', 'cooked', 'boiled', 'dehydrated'];

// Словарь для перевода
const ruDictionary = {
    'broccoli': 'Брокколи', 'spinach': 'Шпинат', 'carrot': 'Морковь', 'apple': 'Яблоко',
    'banana': 'Банан', 'orange': 'Апельсин', 'tomato': 'Томат', 'potato': 'Картофель',
    'cucumber': 'Огурец', 'lettuce': 'Салат', 'onion': 'Лук', 'garlic': 'Чеснок',
    'strawberry': 'Земляника', 'grape': 'Виноград', 'peach': 'Персик', 'pear': 'Груша',
    'corn': 'Кукуруза', 'pepper': 'Перец', 'cabbage': 'Капуста', 'beet': 'Свёкла',
    'sprout': 'Проростки', 'bean': 'Фасоль', 'pea': 'Горох', 'avocado': 'Авокадо',
    'lemon': 'Лимон', 'lime': 'Лайм', 'melon': 'Дыня', 'watermelon': 'Арбуз'
};

fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        if (Object.keys(allProducts).length >= 200) return;

        const name = row.description ? row.description.toLowerCase() : '';
        const categoryId = row.food_category_id;

        // Овощи (11), Фрукты (9) или Проростки
        if (categoryId === '11' || categoryId === '9' || name.includes('sprout')) {
            if (badWords.some(bad => name.includes(bad))) return;

            const cleanName = row.description.split(',')[0].trim();
            const lowerClean = cleanName.toLowerCase();

            if (uniqueNames.has(lowerClean)) return;
            uniqueNames.add(lowerClean);

            // Формируем двуязычное название (English / Russian)
            let finalName = cleanName; // По умолчанию английское
            Object.keys(ruDictionary).forEach(eng => {
                if (lowerClean.includes(eng)) {
                    finalName = `${cleanName} / ${ruDictionary[eng]}`; // Склеиваем: Английский / Русский
                }
            });

            // Определяем цвет
            let color = 'white';
            if (name.includes('green') || name.includes('broccoli') || name.includes('spinach') || name.includes('lettuce') || name.includes('cucumber')) color = 'green';
            if (name.includes('red') || name.includes('tomato') || name.includes('strawberry')) color = 'red';
            if (name.includes('orange') || name.includes('carrot')) color = 'orange';
            if (name.includes('yellow') || name.includes('corn')) color = 'yellow';
            if (name.includes('purple') || name.includes('eggplant')) color = 'purple';

            const safeId = 'usda_' + row.fdc_id;

            // Сортируем по группам (Овощи, Фрукты или Проростки)
            let group = categoryId === '9' ? 'Фрукты' : 'Овощи и зелень';
            if (name.includes('sprout')) group = 'Проростки и микрозелень'; // Выносим проростки отдельно

            allProducts[safeId] = {
                name: finalName,
                category: 'vegetables',
                group: group,
                color: color
            };
        }
    })
    .on('end', () => {
        console.log(`\n✅ Сборка завершена. Продуктов: ${Object.keys(allProducts).length}`);

        const jsCode = `window.App = window.App || {};\nApp.DB_IMPORT = ${JSON.stringify(allProducts, null, 2)};`;
        fs.writeFileSync(path.join(__dirname, 'usda-import.js'), jsCode);
        console.log("💾 Результат сохранен в файл: scripts/usda-import.js");
    });