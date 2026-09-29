/* ============================================================================
   ШАГ 2.1 — «Разноцветная тарелка»: Всеядный + Сидячий
   ----------------------------------------------------------------------------
   Для остальных комбинаций dietType+activity модуль покажет заглушку, пока
   соответствующий ключ в data/plateStrategies.js не будет заполнен.
   ========================================================================== */
(function () {
  const { escapeHtml, labelOf } = App.utils;

  App.registerStep(2, {
    render(container) {
      const { dietType, season, activity } = App.State.user;
      const config = App.getPlateConfig(App.State.user);

      if (!config) {
        container.innerHTML = `
          <div class="card">
            <h1>🍽️ Шаг 2 <span class="badge">в разработке</span></h1>
            <p class="lead">
              Комбинация «${escapeHtml(labelOf(App.DIET_OPTIONS, dietType))} +
              ${escapeHtml(labelOf(App.ACTIVITY_OPTIONS, activity))}» пока
              не настроена. Добавим её на следующем шаге.
            </p>
            <button onclick="App.goToStep(1)">← Вернуться к Шагу 1</button>
          </div>`;
        console.warn('[Шаг 2] Нет конфига для ключа:',
          `${dietType}_${activity}`);
        return;
      }

      container.innerHTML = `
        <div class="card">
          <h1>🍽️ Твоя разноцветная тарелка <span class="badge">Шаг 2.1</span></h1>
          <p class="lead">
            Профиль: <strong>${escapeHtml(labelOf(App.DIET_OPTIONS, dietType))}</strong> ·
            <strong>${escapeHtml(labelOf(App.SEASON_OPTIONS, season))}</strong> ·
            <strong>${escapeHtml(labelOf(App.ACTIVITY_OPTIONS, activity))}</strong>.
            Ниже — бюджетные продукты по секторам Гарвардской тарелки.
          </p>

          <div class="plate-circle" aria-label="Схема тарелки">
            <div class="pc-veg">½<small>Овощи и фрукты</small></div>
            <div class="pc-protein">¼<small>Белок</small></div>
            <div class="pc-carbs">¼<small>Углеводы</small></div>
          </div>

          <div class="product-grid">
            <div class="product-card veg">
              <h3>🥦 Овощи и фрукты</h3>
              <ul>${config.vegetables.map(p =>
                `<li>${escapeHtml(p)}</li>`).join('')}</ul>
            </div>
            <div class="product-card protein">
              <h3>🍗 Белок</h3>
              <ul>${config.protein.map(p =>
                `<li>${escapeHtml(p)}</li>`).join('')}</ul>
            </div>
            <div class="product-card carbs">
              <h3>🌾 Сложные углеводы</h3>
              <ul>${config.carbs.map(p =>
                `<li>${escapeHtml(p)}</li>`).join('')}</ul>
            </div>
          </div>

          ${config.note
            ? `<p class="plate-note">💡 ${escapeHtml(config.note)}</p>`
            : ''}

          <button onclick="App.goToStep(1)">← Изменить ответы</button>

          <!-- TODO: Шаг 3 — здесь появится кнопка
               «Собрать меню на день», которая вызовет App.goToStep(3). -->
        </div>`;

      console.log('[Шаг 2.1] Тарелка отрисована:', App.State.user, config);
    }

    // TODO: Шаг 3 — метод generateMenu() соберёт блюда из этих продуктов.
    // TODO: Шаг 4 — метод logMeal() запишет приём пищи в App.State.history.
  });
})();