/* ============================================================================
   ГЛОБАЛЬНОЕ СОСТОЯНИЕ + СПРАВОЧНИКИ ОТВЕТОВ
   ----------------------------------------------------------------------------
   Единая точка хранения. На новых шагах сюда просто добавляются поля —
   уже готовые модули не трогаем.
   ========================================================================== */
window.App = window.App || {};

App.State = {
  currentStep: 1,
  completedSteps: [],

  // Ответы, собранные на Шаге 1
  user: {
    dietType: null,   // 'all' | 'vegetarian' | 'flexitarian' | 'lactose_free' | 'gluten_free'
    season:   null,   // 'cold' | 'warm'
    activity: null    // 'sedentary' | 'mobile' | 'active_training'
    // TODO: Шаг 2.7 — сюда добавится budget ('low' | 'mid' | 'high')
  },

  // Базовая структура тарелки (из knowledge_base.txt) — 50/25/25
  plate: { vegetables: 0.5, protein: 0.25, carbs: 0.25 },

    selectedProducts: [],   // Продукты, которые пользователь выбрал на тарелке
 
  products: [],   // TODO: Шаг 3 — подборка продуктов под профиль
  menu: [],       // TODO: Шаг 4 — меню на день
  history: []     // TODO: Шаг 5 — история приёмов пищи
};

App.DIET_OPTIONS = [
  { value: 'all',          label: 'Всеядный' },
  { value: 'vegetarian',   label: 'Вегетарианец' },
  { value: 'flexitarian',  label: 'Флекситарианец' },
  { value: 'lactose_free', label: 'Без лактозы' },
  { value: 'gluten_free',  label: 'Без глютена' }
];

App.SEASON_OPTIONS = [
  { value: 'cold', label: 'Зима–осень' },
  { value: 'warm', label: 'Весна–лето' }
];

App.ACTIVITY_OPTIONS = [
  { value: 'sedentary',       label: 'Сидячий' },
  { value: 'mobile',          label: 'Подвижный' },
  { value: 'active_training', label: 'Активный день и тренировка' }
];

// Для отладки из консоли браузера
window.AppState = App.State;