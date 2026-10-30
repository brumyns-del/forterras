const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// ВОТ НАША МЕТКА!
console.log("=== ЗАПУЩЕН НОВЫЙ ЧИСТЫЙ СКРИПТ ===");

const filePath = path.join(__dirname, 'food.csv');
const allProducts = {};
const uniqueNames = new Set();

const skipWords = [
    'juice', 'canned', 'frozen', 'cooked', 'boiled', 'brussels sprouts', 'restaurant', 'baby food',
    'thiamin', 'riboflavin', 'niacin', 'vitamin', 'nutrient', 'tdf', 'ash', 'water', 'energy',
    'protein', 'carbohydrate', 'fat', 'sugar', 'fiber', 'calcium', 'iron', 'zinc', 'sodium',
    'potassium', 'phosphorus', 'magnesium', 'cholesterol', 'fatty acid', 'ketchup', 'burger',
    'mcdonald', 'subway', 'sauce', 'syrup', 'candy', 'chocolate', 'soda', 'beverage'
];

const ruDictionary = {
    'broccoli': 'Брокколи', 'spinach': 'Шпинат', 'carrot': 'Морковь', 'apple': 'Яблоко',
    'banana': 'Банан', 'orange': 'Апельсин', 'tomato': 'Томат', 'potato': 'Картофель',
    'cucumber': 'Огурец', 'lettuce': 'Салат', 'onion': 'Лук', 'garlic': 'Чеснок',
    'strawberry': 'Земляника', 'grape': 'Виноград', 'peach': 'Персик', 'pear': 'Груша',
    'corn': 'Кукуруза', 'pepper': 'Перец', 'cabbage': 'Капуста', 'beet': 'Свёкла',
    'sprout': 'Проростки', 'bean': 'Фасоль', 'pea': 'Горох', 'avocado': 'Авокадо',
    'lemon': 'Лимон', 'lime': 'Лайм', 'melon': 'Дыня', 'watermelon': 'Арбуз',
    'nectarine': 'Нектарин', 'mushroom': 'Гриб', 'celery': 'Сельдерей', 'radish': 'Редис',
    'turnip': 'Репа', 'pumpkin': 'Тыква', 'zucchini': 'Кабачок', 'blueberry': 'Голубика',
    'raspberry': 'Малина', 'blackberry': 'Ежевика', 'cranberry': 'Клюква', 'cherry': 'Вишня',
    'plum': 'Слива', 'apricot': 'Абрикос', 'pineapple': 'Ананас', 'mango': 'Манго',
    'kiwi': 'Киви', 'grapefruit': 'Грейпфрут', 'asparagus': 'Спаржа', 'eggplant': 'Баклажан',
    'squash': 'Сквош', 'sweet potato': 'Батат', 'ginger': 'Имбирь', 'parsley': 'Петрушка',
    'cilantro': 'Кинза', 'dill': 'Укроп', 'basil': 'Базилик', 'mint': 'Мята', 'fig': 'Инжир',
    'okra': 'Окра', 'leek': 'Лук-порей', 'kale': 'Кейл (Капуста)', 'mustard greens': 'Горчичная зелень',
    'collards': 'Капуста кормовая', 'endive': 'Эндивий', 'chives': 'Шнитт-лук', 'fennel': 'Фенхель'
};

fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        if (Object.keys(allProducts).length >= 200) return;

        const originalDescription = row.description || '';
        const name = originalDescription.toLowerCase();
        const categoryId = row.food_category_id;

        const isSprout = name.includes('sprout') && !name.includes('brussels');
        const isVegOrFruit = categoryId === '11' || categoryId === '9';

        if (isVegOrFruit || isSprout) {
            if (skipWords.some(bad => name.includes(bad))) return;

            let cleanName = originalDescription.split(',')[0].split(' - ')[0].trim();
            if (/\d/.test(cleanName)) return;

            let lowerClean = cleanName.toLowerCase();
            let checkName = lowerClean.endsWith('s') ? lowerClean.slice(0, -1) : lowerClean;

            if (uniqueNames.has(checkName)) return;
            uniqueNames.add(checkName);

            cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

            let finalName = cleanName;
            Object.keys(ruDictionary).forEach(eng => {
                if (lowerClean.includes(eng)) {
                    finalName = `${cleanName} / ${ruDictionary[eng]}`;
                }
            });

            let color = 'white';
            if (name.includes('green') || name.includes('broccoli') || name.includes('spinach') || name.includes('lettuce') || name.includes('cucumber') || name.includes('celery') || name.includes('sprout') || name.includes('kale')) color = 'green';
            if (name.includes('red') || name.includes('tomato') || name.includes('strawberry') || name.includes('cherry')) color = 'red';
            if (name.includes('orange') || name.includes('carrot') || name.includes('apricot')) color = 'orange';
            if (name.includes('yellow') || name.includes('corn') || name.includes('banana')) color = 'yellow';
            if (name.includes('purple') || name.includes('eggplant') || name.includes('blueberry') || name.includes('blackberry')) color = 'purple';

            const safeId = 'usda_' + row.fdc_id;

            let group = categoryId === '9' ? 'Фрукты' : 'Овощи и зелень';
            if (isSprout) group = 'Проростки и микрозелень';

            allProducts[safeId] = {
                name: finalName,
                category: 'vegetables',
                group: group,
                color: color
            };
        }
    })
    .on('end', () => {
        console.log(`\n✅ Очистка завершена. Оставлено продуктов: ${Object.keys(allProducts).length}`);
        const jsCode = `window.App = window.App || {};\nApp.DB_IMPORT = ${JSON.stringify(allProducts, null, 2)};`;
        fs.writeFileSync(path.join(__dirname, 'usda-import.js'), jsCode);
        console.log("💾 Результат сохранен: scripts/usda-import.js");
    });