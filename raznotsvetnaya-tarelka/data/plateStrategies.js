
/* ============================================================================
   ПРОДУКТОВЫЕ СТРАТЕГИИ ПО КЛЮЧУ "<dietType>_<activity>"
   ========================================================================== */
window.App = window.App || {};

App.PLATE_STRATEGIES = {

  'all_sedentary': {

    /* ====================================================================
       ОБЩИЕ ГРУППЫ (одинаковы зимой и летом)
       ==================================================================== */

    fats: ['fat_olive', 'fat_pumpkin', 'fat_sunflower', 'fat_butter', 'fat_fish', 'fat_coconut'],

    water: ['water_plain', 'water_coffee', 'water_cocoa', 'water_matcha', 'water_karkade', 'water_anchan'],

    sweets: [
      { name: 'Тёмный шоколад 70%', color: 'brown' },
      { name: 'Мёд',                color: 'yellow' }
    ],

    harmful: [
      { name: 'Газировка сладкая', color: 'red' },
      { name: 'Фастфуд',           color: 'orange' }
    ],

    /* ====================================================================
       ЗИМА–ОСЕНЬ
       ==================================================================== */

    cold: {
      vegetables: {
        'Овощи и зелень': [
          { name: 'Шпинат',                   color: 'green' },
          { name: 'Брокколи',                 color: 'green' },
          { name: 'Руккола',                  color: 'green' },
          { name: 'Огурцы',                   color: 'green' },
          { name: 'Стручковая фасоль',        color: 'green' },
          { name: 'Зелёный лук',              color: 'green' },
          { name: 'Водоросли (нори, вакаме)', color: 'green' },
          { name: 'Кукуруза',                 color: 'yellow' },
          { name: 'Жёлтый болгарский перец',  color: 'yellow' },
          { name: 'Морковь',                  color: 'orange' },
          { name: 'Тыква',                    color: 'orange' },
          { name: 'Батат',                    color: 'orange' },
          { name: 'Томаты',                   color: 'red' },
          { name: 'Томатная паста',           color: 'red' },
          { name: 'Баклажаны',                color: 'purple' },
          { name: 'Краснокочанная капуста',   color: 'purple' },
          { name: 'Свёкла',                   color: 'purple' },
          { name: 'Лук репчатый',             color: 'white' },
          { name: 'Чеснок',                   color: 'white' },
          { name: 'Цветная капуста',          color: 'white' },
          { name: 'Имбирь',                   color: 'white' },
          { name: 'Белая редька',             color: 'white' },
          { name: 'Шампиньоны',               color: 'brown' },
          { name: 'Вешенки',                  color: 'brown' }
        ],
        'Фрукты': [
          { name: 'Киви',            color: 'green' },
          { name: 'Авокадо',         color: 'green' },
          { name: 'Лимоны',          color: 'yellow' },
          { name: 'Бананы',          color: 'yellow' },
          { name: 'Ананасы',         color: 'yellow' },
          { name: 'Хурма',           color: 'orange' },
          { name: 'Апельсины',       color: 'orange' },
          { name: 'Мандарины',       color: 'orange' },
          { name: 'Облепиха',        color: 'orange' },
          { name: 'Абрикосы',        color: 'orange' },
          { name: 'Гранат',          color: 'red' },
          { name: 'Арбуз',           color: 'red' },
          { name: 'Клубника',        color: 'red' },
          { name: 'Клюква',          color: 'red' },
          { name: 'Брусника',        color: 'red' },
          { name: 'Грейпфрут',       color: 'red' },
          { name: 'Черника',         color: 'purple' },
          { name: 'Голубика',        color: 'purple' },
          { name: 'Ежевика',         color: 'purple' },
          { name: 'Тёмный виноград', color: 'purple' },
          { name: 'Инжир',           color: 'purple' }
        ],
        'Проростки и микрозелень': [
          { name: 'Подсолнечник (проростки)', color: 'yellow' },
          { name: 'Льняное семя',             color: 'brown' },
          { name: 'Тыквенные семечки',        color: 'green' }
        ],
        'Специи': [
          { name: 'Базилик сушёный', color: 'green' },
          { name: 'Орегано',         color: 'green' },
          { name: 'Куркума',         color: 'yellow' },
          { name: 'Карри',           color: 'orange' },
          { name: 'Паприка сушёная', color: 'red' }
        ],
        'Переработанные продукты': [
          { name: 'Овощи консервированные', color: 'green' }
        ]
      },

      protein: {
        'Бобовые и орехи': [
          { name: 'Нут',              color: 'yellow' },
          { name: 'Красная чечевица', color: 'orange' },
          { name: 'Красная фасоль',   color: 'red' },
          { name: 'Чёрная чечевица',  color: 'purple' },
          { name: 'Тёмная фасоль',    color: 'purple' },
          { name: 'Грецкие орехи',    color: 'white' },
          { name: 'Миндаль',          color: 'white' },
          { name: 'Фисташки',         color: 'green' }
        ],
        'Молочные продукты': [
          { name: 'Твёрдые выдержанные сыры', color: 'yellow' },
          { name: 'Топлёное масло (гхи)',     color: 'yellow' },
          { name: 'Сыр Чеддер',               color: 'orange' },
          { name: 'Сыр тофу',                 color: 'white' },
          { name: 'Натуральный йогурт',       color: 'white' }
        ],
        'Яйца': [
          { name: 'Яйца куриные (белок)',  color: 'white' },
          { name: 'Желтки фермерских яиц', color: 'yellow' }
        ],
        'Птица': [
          { name: 'Филе птицы',     color: 'white' },
          { name: 'Курица (бедро)', color: 'white' }
        ],
        'Рыба и морепродукты': [
          { name: 'Дикий лосось', color: 'red' },
          { name: 'Дикая форель', color: 'red' },
          { name: 'Белая рыба',   color: 'white' },
          { name: 'Минтай / хек', color: 'white' }
        ],
        'Красное мясо': [
          { name: 'Говядина', color: 'red' },
          { name: 'Баранина', color: 'red' }
        ],
        'Переработанные продукты': [
          { name: 'Колбаса варёная', color: 'red' }
        ]
      },

      carbs: {
        'Цельнозерновые продукты': [
          { name: 'Цельнозерновой белый хлеб', color: 'white' }
        ],
        'Крупы': [
          { name: 'Гречка',               color: 'white' },
          { name: 'Овсянка долгой варки', color: 'white' },
          { name: 'Пшено',                color: 'yellow' },
          { name: 'Красный рис',          color: 'orange' },
          { name: 'Красное киноа',        color: 'orange' },
          { name: 'Чёрный (дикий) рис',   color: 'purple' },
          { name: 'Чёрное киноа',         color: 'purple' }
        ],
        'Хлеб': [
          { name: 'Хлеб белый цельнозерновой', color: 'white' },
          { name: 'Хлеб ржаной', color: 'brown' },
          { name: 'Хлеб черный цельнозерновой', color: 'brown' }
        ],
        'Крахмалистые корнеплоды': [
          { name: 'Картофель', color: 'white' },
          { name: 'Батат',     color: 'orange' }
        ],
        'Переработанные продукты': [
          { name: 'Белый рис', color: 'white' }
        ]
      },

      note: 'Сидячий образ жизни: порция углеводов ≈ с кулак, порция белка ≈ с ладонь. Овощей — половина тарелки без ограничений.'
    }
  }
};

/**
 * Возвращает конфиг тарелки под текущего пользователя.
 */
App.getPlateConfig = function (user) {
  const key = `${user.dietType}_${user.activity}`;
  const strat = App.PLATE_STRATEGIES[key];
  if (!strat) return null;

  const seasonal = strat[user.season] || strat.cold;
  if (!seasonal) return null;

  // 1. Сначала создаем "коробку" mappedVeg и переводим старые ID в продукты
  const vegData = seasonal.vegetables || {};
  const mappedVeg = {};

  Object.keys(vegData).forEach(sub => {
    mappedVeg[sub] = vegData[sub].map(item => {
      if (typeof item === 'string') return App.DB.Products[item];
      return item;
    }).filter(Boolean);
  });

  // 2. ТЕПЕРЬ добавляем новые продукты из базы USDA в нашу коробку
  if (window.App && App.DB && App.DB.Products) {
    Object.keys(App.DB.Products).forEach(id => {
      if (id.startsWith('usda_')) {
        const p = App.DB.Products[id];
        if (!mappedVeg[p.group]) mappedVeg[p.group] = []; // Создаем подгруппу, если её нет
        mappedVeg[p.group].push(p);
      }
    });
  }

  // 3. Возвращаем готовый результат
  return Object.assign({}, seasonal, {
    vegetables: mappedVeg,
    fats: (strat.fats || []).map(id => App.DB.Products[id]).filter(Boolean),
    water: (strat.water || []).map(id => App.DB.Products[id]).filter(Boolean),
    sweets: strat.sweets || [],
    harmful: strat.harmful || []
  });
};
/**
 * Уникальный идентификатор продукта.
 */
App.productId = function (category, product) {
  return `${category}:${product.name}`;
};

/* ----------------------------------------------------------------------------
   ПАЛИТРА И КРУЖОЧКИ
---------------------------------------------------------------------------- */
App.COLOR_EMOJI = {
  green:  '🟢',
  yellow: '🟡',
  orange: '🟠',
  red:    '🔴',
  purple: '🟣',
  white:  '⚪',
  brown:  '🟤'
};

App.BRIGHT_COLORS = {
  green:  { label: 'изумрудно-зелёный',    suggestion: 'зелёного' },
  yellow: { label: 'золотисто-жёлтый',     suggestion: 'жёлтого' },
  orange: { label: 'янтарно-оранжевый',    suggestion: 'оранжевого' },
  red:    { label: 'рубиново-красный',     suggestion: 'красного' },
  purple: { label: 'сапфирово-фиолетовый', suggestion: 'фиолетового' },
  white:  { label: 'мраморно-белый',       suggestion: 'белого' },
  brown:  { label: 'древесно-коричневый',  suggestion: 'коричневого' }
};