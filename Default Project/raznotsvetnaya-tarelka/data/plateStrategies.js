/* ============================================================================
   ПРОДУКТОВЫЕ СТРАТЕГИИ ПО КЛЮЧУ "<dietType>_<activity>"
   ----------------------------------------------------------------------------
   Каждый продукт: { name: строка, color: 'red'|'green'|'orange'|'purple'|'yellow'|'white'|'brown',
                     icon: эмодзи }
   Цвет используется для правила «4 цветов». Белый/коричневый — нейтральные
   (не учитываются в счётчике, но красиво смотрятся на тарелке).
   ========================================================================== */
window.App = window.App || {};

App.PLATE_STRATEGIES = {

  /* ----- ШАГ 2.1: Всеядный + Сидячий ---------------------------------- */
  'all_sedentary': {
    cold: { // Зима–осень
      vegetables: [
        { name: 'Капуста белокочанная', color: 'green',  icon: '🥬' },
        { name: 'Морковь',              color: 'orange', icon: '🥕' },
        { name: 'Свёкла отварная',      color: 'purple', icon: '🟣' },
        { name: 'Лук репчатый',         color: 'white',  icon: '🧅' },
        { name: 'Овощная смесь (зам.)', color: 'green',  icon: '🥦' },
        { name: 'Яблоки',               color: 'red',    icon: '🍎' },
        { name: 'Мандарины',            color: 'orange', icon: '🍊' }
      ],
      protein: [
        { name: 'Яйца куриные',         color: 'white',  icon: '🥚' },
        { name: 'Курица (бедро)',       color: 'white',  icon: '🍗' },
        { name: 'Минтай / хек',         color: 'white',  icon: '🐟' },
        { name: 'Фасоль или горох',     color: 'brown',  icon: '🫘' }
      ],
      carbs: [
        { name: 'Гречка',               color: 'brown',  icon: '🌾' },
        { name: 'Овсянка',              color: 'brown',  icon: '🥣' },
        { name: 'Картофель',            color: 'brown',  icon: '🥔' },
        { name: 'Цельнозерновой хлеб',  color: 'brown',  icon: '🍞' }
      ],
      note: 'Сидячий образ жизни: порция углеводов ≈ с кулак, порция белка ≈ с ладонь. Овощей — половина тарелки без ограничений.'
    },

    warm: { // Весна–лето
      vegetables: [
        { name: 'Огурцы свежие',        color: 'green',  icon: '🥒' },
        { name: 'Помидоры',             color: 'red',    icon: '🍅' },
        { name: 'Кабачки',              color: 'green',  icon: '🥒' },
        { name: 'Листовой салат',       color: 'green',  icon: '🥗' },
        { name: 'Молодая капуста',      color: 'green',  icon: '🥬' },
        { name: 'Ягоды',                color: 'red',    icon: '🍓' },
        { name: 'Яблоки / сливы',       color: 'red',    icon: '🍎' }
      ],
      protein: [
        { name: 'Яйца куриные',         color: 'white',  icon: '🥚' },
        { name: 'Курица (грудка)',      color: 'white',  icon: '🍗' },
        { name: 'Творог 5%',            color: 'white',  icon: '🧀' },
        { name: 'Минтай / хек',         color: 'white',  icon: '🐟' }
      ],
      carbs: [
        { name: 'Гречка',               color: 'brown',  icon: '🌾' },
        { name: 'Рис бурый',            color: 'brown',  icon: '🍚' },
        { name: 'Молодой картофель',    color: 'brown',  icon: '🥔' },
        { name: 'Цельнозерновой хлеб',  color: 'brown',  icon: '🍞' }
      ],
      note: 'Сидячий образ жизни: порция углеводов ≈ с кулак, порция белка ≈ с ладонь. Летом добавь побольше свежих овощей и ягод.'
    }
  }

  /* TODO: Шаг 2.2 — Вегетарианец + Сидячий */
  // 'vegetarian_sedentary': { cold: {...}, warm: {...} },

  /* TODO: Шаг 2.3 — Флекситарианец + Сидячий */
  // 'flexitarian_sedentary': { cold: {...}, warm: {...} },

  /* TODO: Шаг 2.4 — Без лактозы + Сидячий */
  // 'lactose_free_sedentary': { cold: {...}, warm: {...} },

  /* TODO: Шаг 2.5 — Без глютена + Сидячий */
  // 'gluten_free_sedentary': { cold: {...}, warm: {...} },

  /* TODO: Шаг 2.6 — Профили для активных */
  // 'all_mobile':          { cold: {...}, warm: {...} },
  // 'all_active_training': { cold: {...}, warm: {...} },
};

/**
 * Возвращает конфиг тарелки под текущего пользователя или null.
 */
App.getPlateConfig = function (user) {
  const key = `${user.dietType}_${user.activity}`;
  const bySeason = App.PLATE_STRATEGIES[key];
  if (!bySeason) return null;
  return bySeason[user.season] || null;
};

/**
 * Уникальный идентификатор продукта (для хранения выбранных).
 */
App.productId = function (category, product) {
  return `${category}:${product.name}`;
};

/**
 * Справочник «ярких» цветов для правила «4 цветов».
 * Белый и коричневый — нейтральные, не считаются.
 */
App.BRIGHT_COLORS = {
  red:    { label: 'красный',    suggestion: 'красного' },
  green:  { label: 'зелёный',    suggestion: 'зелёного' },
  orange: { label: 'оранжевый',  suggestion: 'оранжевого' },
  purple: { label: 'фиолетовый', suggestion: 'фиолетового' }
};