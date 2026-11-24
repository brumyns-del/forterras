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
        'vkusno': {
            name: 'Вкусно — и точка',
            menu: [
                // --- БУРГЕРЫ ---
                { id: 'v_cheeseburger', name: 'Чизбургер', category: 'burger', groups: ['protein', 'grain', 'dairy', 'sauce'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 291, p: 14, f: 11, c: 33 }, servings: { protein: 1, carbs: 1 } },
                { id: 'v_double_cheeseburger', name: 'Двойной Чизбургер', category: 'burger', groups: ['protein', 'grain', 'dairy', 'sauce'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 416, p: 24, f: 21, c: 34 }, servings: { protein: 2, carbs: 1 } },
                { id: 'v_hamburger', name: 'Гамбургер', category: 'burger', groups: ['protein', 'grain', 'sauce'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 252, p: 12, f: 8.2, c: 33 }, servings: { protein: 1, carbs: 1 } },
                { id: 'v_fish_burger', name: 'Фиш Бургер', category: 'burger', groups: ['protein', 'grain', 'dairy', 'sauce'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 327, p: 13, f: 13, c: 40 }, servings: { protein: 1, carbs: 1.5 } },
                { id: 'v_double_fish', name: 'Двойной Фиш Бургер', category: 'burger', groups: ['protein', 'grain', 'dairy', 'sauce'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 464, p: 22, f: 20, c: 50 }, servings: { protein: 2, carbs: 2 } },
                { id: 'v_chickenburger', name: 'Чикенбургер', category: 'burger', groups: ['protein', 'grain', 'veg', 'sauce'], green: 5, protein: true, junk: false, dye: false, macros: { kcal: 331, p: 10, f: 14, c: 40 }, servings: { protein: 1, carbs: 1.5 } },
                { id: 'v_grand', name: 'Гранд', category: 'burger', groups: ['protein', 'grain', 'dairy', 'sauce'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 478, p: 30, f: 22, c: 38 }, servings: { protein: 2, carbs: 1.5 } },
                { id: 'v_double_grand', name: 'Двойной Гранд', category: 'burger', groups: ['protein', 'grain', 'dairy', 'sauce'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 671, p: 48, f: 35, c: 40 }, servings: { protein: 3, carbs: 1.5 } },
                { id: 'v_grand_deluxe', name: 'Гранд Де Люкс', category: 'burger', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 546, p: 30, f: 28, c: 43 }, servings: { protein: 2, carbs: 1.5, veggies: 0.5 } },
                { id: 'v_chicken_premier', name: 'Чикен Премьер', category: 'burger', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 476, p: 22, f: 20, c: 52 }, servings: { protein: 1.5, carbs: 2, veggies: 0.5 } },
                { id: 'v_big_special', name: 'Биг Спешиал', category: 'burger', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 756, p: 41, f: 42, c: 52 }, servings: { protein: 2.5, carbs: 2, veggies: 0.5 } },
                { id: 'v_double_big_special', name: 'Двойной Биг Спешиал', category: 'burger', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 1042, p: 67, f: 63, c: 52 }, servings: { protein: 4, carbs: 2, veggies: 0.5 } },
                { id: 'v_big_special_jr', name: 'Биг Спешиал Джуниор', category: 'burger', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 5, protein: true, junk: false, dye: false, macros: { kcal: 545, p: 30, f: 30, c: 38 }, servings: { protein: 2, carbs: 1.5 } },
                { id: 'v_chicken_hit', name: 'Чикен Хит', category: 'burger', groups: ['protein', 'grain', 'veg', 'sauce'], green: 5, protein: true, junk: false, dye: false, macros: { kcal: 445, p: 19, f: 19, c: 50 }, servings: { protein: 1.5, carbs: 2 } },
                { id: 'v_big_hit', name: 'Биг Хит', category: 'burger', groups: ['protein', 'grain', 'veg', 'sauce'], green: 5, protein: true, junk: false, dye: false, macros: { kcal: 503, p: 25, f: 25, c: 45 }, servings: { protein: 2, carbs: 1.5 } },
                { id: 'v_double_big_hit', name: 'Двойной Биг Хит', category: 'burger', groups: ['protein', 'grain', 'veg', 'sauce'], green: 5, protein: true, junk: false, dye: false, macros: { kcal: 676, p: 40, f: 37, c: 46 }, servings: { protein: 3, carbs: 1.5 } },
                { id: 'v_big_chicken', name: 'Биг Чикен Бургер', category: 'burger', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 678, p: 37, f: 32, c: 58 }, servings: { protein: 2.5, carbs: 2, veggies: 0.5 } },
                { id: 'v_big_chicken_sesame', name: 'Биг Чикен Бургер Кунжутный', category: 'burger', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 735, p: 39, f: 37, c: 59 }, servings: { protein: 2.5, carbs: 2, veggies: 0.5 } },
                { id: 'v_triple_cheese', name: 'Тройной Чизбургер Три Сыра', category: 'burger', groups: ['protein', 'grain', 'dairy', 'sauce'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 538, p: 34, f: 29, c: 34 }, servings: { protein: 3, carbs: 1 } },

                // --- РОЛЛЫ ---
                { id: 'v_caesar_roll', name: 'Цезарь Ролл', category: 'roll', groups: ['protein', 'grain', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 429, p: 17, f: 22, c: 41 }, servings: { protein: 1.5, carbs: 1.5, veggies: 0.5 } },
                { id: 'v_big_special_roll', name: 'Биг Спешиал Ролл', category: 'roll', groups: ['protein', 'grain', 'dairy', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 487, p: 25, f: 28, c: 33 }, servings: { protein: 2, carbs: 1.5, veggies: 0.5 } },
                { id: 'v_shrimp_roll', name: 'Шримп Ролл', category: 'roll', groups: ['protein', 'grain', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 397, p: 14, f: 17, c: 46 }, servings: { protein: 1.5, carbs: 1.5, veggies: 0.5 } },
                { id: 'v_curry_roll', name: 'Чикен Карри ролл', category: 'roll', groups: ['protein', 'grain', 'veg', 'sauce'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 426, p: 18, f: 20, c: 44 }, servings: { protein: 1.5, carbs: 1.5, veggies: 0.5 } },

                // --- СНЭКИ ---
                { id: 'v_fries_s', name: 'Картофель фри (мал.)', category: 'snack', groups: ['grain', 'fat'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 230, p: 3, f: 10, c: 30 }, servings: { carbs: 1 } },
                { id: 'v_fries_l', name: 'Картофель фри (бол.)', category: 'snack', groups: ['grain', 'fat'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 450, p: 5, f: 20, c: 60 }, servings: { carbs: 2 } },
                { id: 'v_nuggets', name: 'Наггетсы (6 шт.)', category: 'snack', groups: ['protein', 'grain'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 280, p: 15, f: 15, c: 20 }, servings: { protein: 1 } },
                { id: 'v_mozzarella', name: 'Сырные палочки', category: 'snack', groups: ['dairy', 'grain', 'fat'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 380, p: 14, f: 22, c: 32 }, servings: { protein: 1, carbs: 1 } },

                // --- ЗАВТРАКИ ---
                { id: 'v_breakfast_big', name: 'Большой завтрак', category: 'breakfast', groups: ['protein', 'grain', 'fat'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 600, p: 25, f: 35, c: 45 }, servings: { protein: 1.5, carbs: 1 } },
                { id: 'v_omelet', name: 'Омлет с сосисками', category: 'breakfast', groups: ['protein', 'fat'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 400, p: 20, f: 25, c: 15 }, servings: { protein: 1.5 } },
                { id: 'v_pancakes', name: 'Блины с сюрпризом', category: 'breakfast', groups: ['grain', 'sweet'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 350, p: 6, f: 12, c: 55 }, servings: { carbs: 2 } },

                // --- САЛАТЫ И ОВОЩИ ---
                { id: 'v_salad_caesar', name: 'Салат Цезарь', category: 'salad', groups: ['veg', 'protein', 'sauce'], green: 40, protein: true, junk: false, dye: false, macros: { kcal: 250, p: 15, f: 15, c: 10 }, servings: { protein: 0.5, veggies: 1 } },
                { id: 'v_salad_veg', name: 'Салат овощной', category: 'salad', groups: ['veg'], green: 50, protein: false, junk: false, dye: false, macros: { kcal: 80, p: 2, f: 4, c: 8 }, servings: { veggies: 1.5 } },
                { id: 'v_carrot_sticks', name: 'Морковные палочки', category: 'salad', groups: ['veg'], green: 40, protein: false, junk: false, dye: false, macros: { kcal: 50, p: 1, f: 0, c: 10 }, servings: { veggies: 1 } },
                { id: 'v_apple_slices', name: 'Яблочные дольки', category: 'salad', groups: ['fruit'], green: 30, protein: false, junk: false, dye: false, macros: { kcal: 60, p: 0, f: 0, c: 15 }, servings: { veggies: 1 } },

                // --- ДЕСЕРТЫ ---
                { id: 'v_profiterole', name: 'Профитроль', category: 'dessert', groups: ['sweet', 'grain', 'fat'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 250, p: 4, f: 14, c: 28 }, servings: { carbs: 1 } },
                { id: 'v_whoopie', name: 'Вупи пай', category: 'dessert', groups: ['sweet', 'grain', 'fat'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 350, p: 4, f: 18, c: 45 }, servings: { carbs: 1.5 } },
                { id: 'v_pie_raspberry', name: 'Пирожок Фондан-малина', category: 'dessert', groups: ['sweet', 'grain', 'fruit'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 300, p: 3, f: 15, c: 40 }, servings: { carbs: 1.5 } },

                // --- НАПИТКИ ---
                { id: 'v_water', name: 'Вода', category: 'drink', groups: ['drink'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 0, p: 0, f: 0, c: 0 }, servings: {} },
                { id: 'v_tea', name: 'Чай без сахара', category: 'drink', groups: ['drink'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 5, p: 0, f: 0, c: 1 }, servings: {} },
                { id: 'v_cappuccino', name: 'Капучино', category: 'drink', groups: ['drink', 'dairy'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 120, p: 6, f: 6, c: 10 }, servings: {} },
                { id: 'v_latte', name: 'Латте Попкорн', category: 'drink', groups: ['drink', 'dairy', 'sweet'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 250, p: 6, f: 8, c: 38 }, servings: { carbs: 1.5 } },
                { id: 'v_bubble_tea', name: 'Бабл-ти Розовый помело', category: 'drink', groups: ['drink', 'sweet', 'fruit'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 300, p: 1, f: 2, c: 70 }, servings: { carbs: 2 } },
                { id: 'v_cola', name: 'Кола (средняя)', category: 'drink', groups: ['drink', 'sweet'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 150, p: 0, f: 0, c: 38 }, servings: { carbs: 1.5 } },
                { id: 'v_juice', name: 'Сок апельсиновый', category: 'drink', groups: ['drink', 'fruit'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 120, p: 1, f: 0, c: 28 }, servings: { carbs: 1 } },

                // --- ДЕТСКОЕ И СОУСЫ ---
                { id: 'v_kids_combo', name: 'Кидз Комбо', category: 'kids', groups: ['protein', 'grain', 'fruit'], green: 20, protein: true, junk: false, dye: true, macros: { kcal: 400, p: 15, f: 15, c: 50 }, servings: { protein: 1, carbs: 1 } },
                { id: 'v_sauce_cheese', name: 'Соус Сырный', category: 'sauce', groups: ['sauce', 'dairy', 'fat'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 80, p: 1, f: 7, c: 3 }, servings: {} },
                { id: 'v_sauce_bbq', name: 'Соус Барбекю', category: 'sauce', groups: ['sauce', 'sweet'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 60, p: 0, f: 0, c: 14 }, servings: {} }
            ]
        }
    }
};