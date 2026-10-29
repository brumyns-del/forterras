const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

console.log("1. Начинаем собирать базу продуктов...");

const filePath = path.join(__dirname, 'food.csv');
const allProducts = {}; // Здесь мы соберем уникальные продукты
let count = 0;

fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        const name = row.description ? row.description.toLowerCase() : '';
        const categoryId = row.food_category_id;

        // Ищем только овощи (категория 11), фрукты (9), или проростки
        if (categoryId === '11' || categoryId === '9' || name.includes('sprout')) {

            // Очищаем длинные американские названия (берем текст до первой запятой)
            const cleanName = row.description.split(',')[0].trim();

            // Создаем уникальный ID для нашего проекта
            const safeId = 'usda_' + row.fdc_id;

            // Определяем цвет по ключевым словам
            let color = 'white'; // по умолчанию
            if (name.includes('green') || name.includes('broccoli') || name.includes('spinach') || name.includes('lettuce')) color = 'green';
            if (name.includes('red') || name.includes('tomato') || name.includes('strawberry')) color = 'red';
            if (name.includes('orange') || name.includes('carrot')) color = 'orange';
            if (name.includes('yellow') || name.includes('corn')) color = 'yellow';
            if (name.includes('purple') || name.includes('eggplant')) color = 'purple';

            // Сохраняем в нашу будущую базу (чтобы не было дубликатов)
            allProducts[safeId] = {
                name: cleanName,
                category: 'vegetables',
                group: categoryId === '9' ? 'Фрукты' : 'Овощи и зелень',
                color: color
            };
            count++;
        }
    })
    .on('end', () => {
        console.log(`\n✅ Сбор завершен. Найдено уникальных продуктов: ${count}`);

        // Формируем текст нового файла базы
        const jsCode = `window.App = window.App || {};\nApp.DB_IMPORT = ${JSON.stringify(allProducts, null, 2)};`;

        // Сохраняем результат в новый файл
        fs.writeFileSync(path.join(__dirname, 'usda-import.js'), jsCode);
        console.log("💾 Результат сохранен в файл: scripts/usda-import.js");
    });