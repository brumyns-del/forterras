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
                // --- БУРГЕРЫ (Белок + Углеводы) ---
                { id: 'v_grand', name: 'Гранд Де Люкс', category: 'burger', colors: ['brown', 'yellow', 'red'], green: 5, protein: true, junk: false, dye: false, macros: { kcal: 610, p: 27, f: 34, c: 48 }, servings: { protein: 1.5, carbs: 1.5 } },
                { id: 'v_big_hit', name: 'Биг Хит', category: 'burger', colors: ['brown', 'yellow', 'red'], green: 5, protein: true, junk: false, dye: false, macros: { kcal: 620, p: 25, f: 32, c: 55 }, servings: { protein: 1.5, carbs: 1.5 } },
                { id: 'v_big_chicken', name: 'Биг Чикен', category: 'burger', colors: ['brown', 'yellow', 'green'], green: 8, protein: true, junk: false, dye: false, macros: { kcal: 550, p: 28, f: 26, c: 50 }, servings: { protein: 1.5, carbs: 1.5 } },
                { id: 'v_cheese', name: 'Чизбургер', category: 'burger', colors: ['brown', 'yellow', 'red'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 300, p: 15, f: 13, c: 30 }, servings: { protein: 1, carbs: 1 } },
                { id: 'v_chicken', name: 'Чикен Премьер', category: 'burger', colors: ['brown', 'yellow', 'white'], green: 3, protein: true, junk: false, dye: false, macros: { kcal: 490, p: 24, f: 22, c: 48 }, servings: { protein: 1.5, carbs: 1.5 } },
                { id: 'v_fish', name: 'Фиш Бургер', category: 'burger', colors: ['brown', 'yellow', 'white'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 340, p: 15, f: 14, c: 38 }, servings: { protein: 1, carbs: 1 } },

                // --- РОЛЛЫ И ПАНИНИ ---
                { id: 'v_roll_curry', name: 'Чикен Карри Ролл', category: 'roll', colors: ['yellow', 'brown', 'white'], green: 2, protein: true, junk: false, dye: false, macros: { kcal: 450, p: 18, f: 22, c: 45 }, servings: { protein: 1, carbs: 1.5 } },
                { id: 'v_panini_toscana', name: 'Панини Тоскана', category: 'roll', colors: ['yellow', 'brown', 'red'], green: 4, protein: true, junk: false, dye: false, macros: { kcal: 400, p: 20, f: 18, c: 38 }, servings: { protein: 1, carbs: 1.5 } },
                { id: 'v_roll_fresh', name: 'Фреш Ролл с индейкой', category: 'roll', colors: ['yellow', 'green', 'white'], green: 15, protein: true, junk: false, dye: false, macros: { kcal: 350, p: 22, f: 12, c: 40 }, servings: { protein: 1, carbs: 1 } },

                // --- СНЭКИ ---
                { id: 'v_fries_s', name: 'Картофель фри (мал.)', category: 'snack', colors: ['yellow'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 230, p: 3, f: 10, c: 30 }, servings: { carbs: 1 } },
                { id: 'v_fries_l', name: 'Картофель фри (бол.)', category: 'snack', colors: ['yellow'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 450, p: 5, f: 20, c: 60 }, servings: { carbs: 2 } },
                { id: 'v_nuggets', name: 'Наггетсы (6 шт.)', category: 'snack', colors: ['brown', 'yellow'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 280, p: 15, f: 15, c: 20 }, servings: { protein: 1 } },
                { id: 'v_mozzarella', name: 'Сырные палочки', category: 'snack', colors: ['yellow', 'brown'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 380, p: 14, f: 22, c: 32 }, servings: { protein: 1, carbs: 1 } },

                // --- ЗАВТРАКИ ---
                { id: 'v_breakfast_big', name: 'Большой завтрак', category: 'breakfast', colors: ['brown', 'yellow', 'white'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 600, p: 25, f: 35, c: 45 }, servings: { protein: 1.5, carbs: 1 } },
                { id: 'v_omelet', name: 'Омлет с сосисками', category: 'breakfast', colors: ['yellow', 'brown'], green: 0, protein: true, junk: false, dye: false, macros: { kcal: 400, p: 20, f: 25, c: 15 }, servings: { protein: 1.5 } },
                { id: 'v_pancakes', name: 'Блины с сюрпризом', category: 'breakfast', colors: ['yellow', 'white'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 350, p: 6, f: 12, c: 55 }, servings: { carbs: 2 } },

                // --- САЛАТЫ И ОВОЩИ ---
                { id: 'v_salad_caesar', name: 'Салат Цезарь', category: 'salad', colors: ['green', 'brown'], green: 40, protein: true, junk: false, dye: false, macros: { kcal: 250, p: 15, f: 15, c: 10 }, servings: { protein: 0.5, veggies: 1 } },
                { id: 'v_salad_veg', name: 'Салат овощной', category: 'salad', colors: ['green', 'red'], green: 50, protein: false, junk: false, dye: false, macros: { kcal: 80, p: 2, f: 4, c: 8 }, servings: { veggies: 1.5 } },
                { id: 'v_carrot_sticks', name: 'Морковные палочки', category: 'salad', colors: ['orange'], green: 40, protein: false, junk: false, dye: false, macros: { kcal: 50, p: 1, f: 0, c: 10 }, servings: { veggies: 1 } },
                { id: 'v_apple_slices', name: 'Яблочные дольки', category: 'salad', colors: ['green', 'red'], green: 30, protein: false, junk: false, dye: false, macros: { kcal: 60, p: 0, f: 0, c: 15 }, servings: { veggies: 1 } },

                // --- ДЕСЕРТЫ (Добавили красители некоторым) ---
                { id: 'v_profiterole', name: 'Профитроль', category: 'dessert', colors: ['yellow', 'brown'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 250, p: 4, f: 14, c: 28 }, servings: { carbs: 1 } },
                { id: 'v_whoopie', name: 'Вупи пай', category: 'dessert', colors: ['brown', 'white'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 350, p: 4, f: 18, c: 45 }, servings: { carbs: 1.5 } },
                { id: 'v_pie_raspberry', name: 'Пирожок Фондан-малина', category: 'dessert', colors: ['brown', 'red'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 300, p: 3, f: 15, c: 40 }, servings: { carbs: 1.5 } },

                // --- НАПИТКИ (Добавили красители коле и бабл-ти) ---
                { id: 'v_water', name: 'Вода', category: 'drink', colors: ['white'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 0, p: 0, f: 0, c: 0 }, servings: {} },
                { id: 'v_tea', name: 'Чай без сахара', category: 'drink', colors: ['white'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 5, p: 0, f: 0, c: 1 }, servings: {} },
                { id: 'v_cappuccino', name: 'Капучино', category: 'drink', colors: ['white', 'brown'], green: 0, protein: false, junk: false, dye: false, macros: { kcal: 120, p: 6, f: 6, c: 10 }, servings: {} },
                { id: 'v_latte', name: 'Латте Попкорн', category: 'drink', colors: ['white', 'brown', 'yellow'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 250, p: 6, f: 8, c: 38 }, servings: { carbs: 1.5 } },
                { id: 'v_bubble_tea', name: 'Бабл-ти Розовый помело', category: 'drink', colors: ['white', 'red'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 300, p: 1, f: 2, c: 70 }, servings: { carbs: 2 } },
                { id: 'v_cola', name: 'Кола (средняя)', category: 'drink', colors: ['yellow'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 150, p: 0, f: 0, c: 38 }, servings: { carbs: 1.5 } },
                { id: 'v_juice', name: 'Сок апельсиновый', category: 'drink', colors: ['orange', 'red'], green: 0, protein: false, junk: true, dye: false, macros: { kcal: 120, p: 1, f: 0, c: 28 }, servings: { carbs: 1 } },

                // --- ДЕТСКОЕ И СОУСЫ (Добавили красители соусам и комбо) ---
                { id: 'v_kids_combo', name: 'Кидз Комбо', category: 'kids', colors: ['yellow', 'green', 'white'], green: 20, protein: true, junk: false, dye: true, macros: { kcal: 400, p: 15, f: 15, c: 50 }, servings: { protein: 1, carbs: 1 } },
                { id: 'v_sauce_cheese', name: 'Соус Сырный', category: 'sauce', colors: ['white', 'yellow'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 80, p: 1, f: 7, c: 3 }, servings: {} },
                { id: 'v_sauce_bbq', name: 'Соус Барбекю', category: 'sauce', colors: ['brown', 'red'], green: 0, protein: false, junk: true, dye: true, macros: { kcal: 60, p: 0, f: 0, c: 14 }, servings: {} }
            ]
        }
    }
};