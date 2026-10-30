/* ============================================================================
   ГЛОБАЛЬНАЯ БАЗА ДАННЫХ ПРОЕКТА (150+ чистых продуктов)
   ========================================================================== */
window.App = window.App || {};

App.DB = {
    // 1. СПРАВОЧНИК ПРОДУКТОВ
    Products: {
        // --- ОВОЩИ И ЗЕЛЕНЬ (Овощи) ---
        'veg_spinach': { name: 'Шпинат', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_broccoli': { name: 'Брокколи', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_cucumber': { name: 'Огурец', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_zucchini': { name: 'Кабачок', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_cabbage': { name: 'Капуста белокочанная', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_avocado': { name: 'Авокадо', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_celery': { name: 'Сельдерей', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_asparagus': { name: 'Спаржа', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_lettuce': { name: 'Салат листовой', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_peas': { name: 'Горошек зелёный', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_beans': { name: 'Стручковая фасоль', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_artichoke': { name: 'Артишок', category: 'vegetables', group: 'Овощи и зелень', color: 'green' },
        'veg_tomato': { name: 'Томат', category: 'vegetables', group: 'Овощи и зелень', color: 'red' },
        'veg_pepper_red': { name: 'Перец болгарский красный', category: 'vegetables', group: 'Овощи и зелень', color: 'red' },
        'veg_radish': { name: 'Редис', category: 'vegetables', group: 'Овощи и зелень', color: 'red' },
        'veg_chili': { name: 'Перец чили', category: 'vegetables', group: 'Овощи и зелень', color: 'red' },
        'veg_carrot': { name: 'Морковь', category: 'vegetables', group: 'Овощи и зелень', color: 'orange' },
        'veg_pumpkin': { name: 'Тыква', category: 'vegetables', group: 'Овощи и зелень', color: 'orange' },
        'veg_sweet_potato': { name: 'Батат', category: 'vegetables', group: 'Овощи и зелень', color: 'orange' },
        'veg_pepper_yellow': { name: 'Перец болгарский жёлтый', category: 'vegetables', group: 'Овощи и зелень', color: 'yellow' },
        'veg_corn': { name: 'Кукуруза', category: 'vegetables', group: 'Овощи и зелень', color: 'yellow' },
        'veg_beet': { name: 'Свёкла', category: 'vegetables', group: 'Овощи и зелень', color: 'purple' },
        'veg_eggplant': { name: 'Баклажан', category: 'vegetables', group: 'Овощи и зелень', color: 'purple' },
        'veg_cabbage_red': { name: 'Капуста краснокочанная', category: 'vegetables', group: 'Овощи и зелень', color: 'purple' },
        'veg_onion': { name: 'Лук репчатый', category: 'vegetables', group: 'Овощи и зелень', color: 'white' },
        'veg_garlic': { name: 'Чеснок', category: 'vegetables', group: 'Овощи и зелень', color: 'white' },
        'veg_cauliflower': { name: 'Цветная капуста', category: 'vegetables', group: 'Овощи и зелень', color: 'white' },
        'veg_turnip': { name: 'Репа', category: 'vegetables', group: 'Овощи и зелень', color: 'white' },
        'veg_mushroom': { name: 'Шампиньоны', category: 'vegetables', group: 'Овощи и зелень', color: 'brown' },
        'veg_oyster_mush': { name: 'Вешенки', category: 'vegetables', group: 'Овощи и зелень', color: 'brown' },

        // --- ФРУКТЫ И ЯГОДЫ ---
        'fruit_apple': { name: 'Яблоко', category: 'vegetables', group: 'Фрукты', color: 'red' },
        'fruit_strawberry': { name: 'Земляника', category: 'vegetables', group: 'Фрукты', color: 'red' },
        'fruit_cherry': { name: 'Вишня', category: 'vegetables', group: 'Фрукты', color: 'red' },
        'fruit_watermelon': { name: 'Арбуз', category: 'vegetables', group: 'Фрукты', color: 'red' },
        'fruit_pomegranate': { name: 'Гранат', category: 'vegetables', group: 'Фрукты', color: 'red' },
        'fruit_raspberry': { name: 'Малина', category: 'vegetables', group: 'Фрукты', color: 'red' },
        'fruit_orange': { name: 'Апельсин', category: 'vegetables', group: 'Фрукты', color: 'orange' },
        'fruit_mandarin': { name: 'Мандарин', category: 'vegetables', group: 'Фрукты', color: 'orange' },
        'fruit_apricot': { name: 'Абрикос', category: 'vegetables', group: 'Фрукты', color: 'orange' },
        'fruit_peach': { name: 'Персик', category: 'vegetables', group: 'Фрукты', color: 'orange' },
        'fruit_persimmon': { name: 'Хурма', category: 'vegetables', group: 'Фрукты', color: 'orange' },
        'fruit_banana': { name: 'Банан', category: 'vegetables', group: 'Фрукты', color: 'yellow' },
        'fruit_lemon': { name: 'Лимон', category: 'vegetables', group: 'Фрукты', color: 'yellow' },
        'fruit_pineapple': { name: 'Ананас', category: 'vegetables', group: 'Фрукты', color: 'yellow' },
        'fruit_kiwi': { name: 'Киви', category: 'vegetables', group: 'Фрукты', color: 'green' },
        'fruit_pear': { name: 'Груша', category: 'vegetables', group: 'Фрукты', color: 'green' },
        'fruit_lime': { name: 'Лайм', category: 'vegetables', group: 'Фрукты', color: 'green' },
        'fruit_grape': { name: 'Виноград тёмный', category: 'vegetables', group: 'Фрукты', color: 'purple' },
        'fruit_blueberry': { name: 'Голубика', category: 'vegetables', group: 'Фрукты', color: 'purple' },
        'fruit_plum': { name: 'Слива', category: 'vegetables', group: 'Фрукты', color: 'purple' },
        'fruit_blackberry': { name: 'Ежевика', category: 'vegetables', group: 'Фрукты', color: 'purple' },
        'fruit_currant': { name: 'Смородина чёрная', category: 'vegetables', group: 'Фрукты', color: 'purple' },

        // --- ПРОРОСТКИ И МИКРОЗЕЛЕНЬ ---
        'sprout_sunflower': { name: 'Подсолнечник (проростки)', category: 'vegetables', group: 'Проростки и микрозелень', color: 'yellow' },
        'sprout_flax': { name: 'Льняное семя', category: 'vegetables', group: 'Проростки и микрозелень', color: 'brown' },
        'sprout_pumpkin': { name: 'Тыквенные семечки', category: 'vegetables', group: 'Проростки и микрозелень', color: 'green' },
        'sprout_alfalfa': { name: 'Люцерна (проростки)', category: 'vegetables', group: 'Проростки и микрозелень', color: 'green' },
        'sprout_broccoli': { name: 'Брокколи (проростки)', category: 'vegetables', group: 'Проростки и микрозелень', color: 'green' },

        // --- БЕЛКИ ---
        'prot_egg': { name: 'Яйцо куриное', category: 'protein', group: 'Яйца', color: 'white' },
        'prot_chicken': { name: 'Курица (грудка)', category: 'protein', group: 'Птица', color: 'white' },
        'prot_turkey': { name: 'Индейка (филе)', category: 'protein', group: 'Птица', color: 'white' },
        'prot_beef': { name: 'Говядина (нежирная)', category: 'protein', group: 'Красное мясо', color: 'red' },
        'prot_lamb': { name: 'Баранина', category: 'protein', group: 'Красное мясо', color: 'red' },
        'prot_salmon': { name: 'Лосось', category: 'protein', group: 'Рыба и морепродукты', color: 'red' },
        'prot_tuna': { name: 'Тунец', category: 'protein', group: 'Рыба и морепродукты', color: 'red' },
        'prot_cod': { name: 'Треска (белая рыба)', category: 'protein', group: 'Рыба и морепродукты', color: 'white' },
        'prot_shrimp': { name: 'Креветки', category: 'protein', group: 'Рыба и морепродукты', color: 'orange' },
        'prot_tofu': { name: 'Тофу', category: 'protein', group: 'Бобовые и орехи', color: 'white' },
        'prot_lentils': { name: 'Чечевица', category: 'protein', group: 'Бобовые и орехи', color: 'brown' },
        'prot_chickpeas': { name: 'Нут', category: 'protein', group: 'Бобовые и орехи', color: 'yellow' },
        'prot_beans': { name: 'Фасоль красная', category: 'protein', group: 'Бобовые и орехи', color: 'red' },
        'prot_walnut': { name: 'Грецкий орех', category: 'protein', group: 'Бобовые и орехи', color: 'brown' },
        'prot_almond': { name: 'Миндаль', category: 'protein', group: 'Бобовые и орехи', color: 'brown' },
        'prot_cashew': { name: 'Кешью', category: 'protein', group: 'Бобовые и орехи', color: 'brown' },
        'prot_yogurt': { name: 'Йогурт натуральный', category: 'protein', group: 'Молочные продукты', color: 'white' },
        'prot_cheese': { name: 'Сыр твёрдый', category: 'protein', group: 'Молочные продукты', color: 'yellow' },
        'prot_cottage': { name: 'Творог 5%', category: 'protein', group: 'Молочные продукты', color: 'white' },

        // --- УГЛЕВОДЫ ---
        'carb_buckwheat': { name: 'Гречка', category: 'carbs', group: 'Крупы', color: 'brown' },
        'carb_rice_brown': { name: 'Рис бурый', category: 'carbs', group: 'Крупы', color: 'brown' },
        'carb_rice_wild': { name: 'Рис дикий', category: 'carbs', group: 'Крупы', color: 'purple' },
        'carb_oatmeal': { name: 'Овсянка', category: 'carbs', group: 'Крупы', color: 'brown' },
        'carb_quinoa': { name: 'Киноа', category: 'carbs', group: 'Крупы', color: 'yellow' },
        'carb_bulgur': { name: 'Булгур', category: 'carbs', group: 'Крупы', color: 'yellow' },
        'carb_bread': { name: 'Хлеб цельнозерновой', category: 'carbs', group: 'Хлеб', color: 'brown' },
        'carb_bread_rye': { name: 'Хлеб ржаной', category: 'carbs', group: 'Хлеб', color: 'brown' },
        'carb_potato': { name: 'Картофель', category: 'carbs', group: 'Крахмалистые корнеплоды', color: 'yellow' },
        'carb_pasta': { name: 'Макароны из твёрдых сортов', category: 'carbs', group: 'Переработанные продукты', color: 'yellow' },

        // --- ЖИРЫ ---
        'fat_olive': { name: 'Оливковое масло', category: 'fats', group: 'Полезные жиры', color: 'green' },
        'fat_flaxseed': { name: 'Льняное масло', category: 'fats', group: 'Полезные жиры', color: 'yellow' },
        'fat_butter': { name: 'Сливочное масло 82%', category: 'fats', group: 'Полезные жиры', color: 'yellow' },
        'fat_ghee': { name: 'Топлёное масло (гхи)', category: 'fats', group: 'Полезные жиры', color: 'yellow' },
        'fat_coconut': { name: 'Кокосовое масло', category: 'fats', group: 'Полезные жиры', color: 'white' },
        'fat_fish': { name: 'Рыбий жир', category: 'fats', group: 'Полезные жиры', color: 'orange' },

        // --- ВОДА ---
        'water_plain': { name: 'Вода питьевая', category: 'water', group: 'Вода и напитки', color: 'white' },
        'water_coffee': { name: 'Кофе', category: 'water', group: 'Вода и напитки', color: 'brown' },
        'water_cocoa': { name: 'Цикорий', category: 'water', group: 'Вода и напитки', color: 'brown' },
        'water_green_tea': { name: 'Зелёный чай', category: 'water', group: 'Вода и напитки', color: 'green' },
        'water_black_tea': { name: 'Чёрный чай', category: 'water', group: 'Вода и напитки', color: 'brown' },
        'water_matcha': { name: 'Матча', category: 'water', group: 'Вода и напитки', color: 'green' },
        'water_karkade': { name: 'Чай каркаде', category: 'water', group: 'Вода и напитки', color: 'red' },

        // --- СЛАДКОЕ И ВРЕДНОЕ ---
        'sweet_honey': { name: 'Мёд', category: 'sweets', group: 'Сладкое', color: 'yellow' },
        'sweet_chocolate': { name: 'Шоколад тёмный 70%', category: 'sweets', group: 'Сладкое', color: 'brown' },
        'sweet_dates': { name: 'Финики', category: 'sweets', group: 'Сладкое', color: 'brown' },
        'harm_soda': { name: 'Газировка сладкая', category: 'harmful', group: 'Нежелательно', color: 'red' },
        'harm_chips': { name: 'Чипсы', category: 'harmful', group: 'Нежелательно', color: 'yellow' },
        'harm_fastfood': { name: 'Фастфуд', category: 'harmful', group: 'Нежелательно', color: 'orange' },
        'harm_sausage': { name: 'Колбаса варёная', category: 'harmful', group: 'Нежелательно', color: 'red' }
    },

    // 2. МАГАЗИНЫ И АССОРТИМЕНТ
    Stores: {
        'store_pyaterochka': {
            name: 'Пятёрочка',
            assortment: [
                { productId: 'fat_olive', price: 450 },
                { productId: 'fat_butter', price: 180 },
                { productId: 'water_plain', price: 30 },
                { productId: 'water_coffee', price: 250 },
                { productId: 'prot_egg', price: 120 },
                { productId: 'veg_tomato', price: 90 }
            ]
        }
    },

    // 3. ТОЧКИ ПИТАНИЯ (Фундамент для "Вкусно и точка")
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