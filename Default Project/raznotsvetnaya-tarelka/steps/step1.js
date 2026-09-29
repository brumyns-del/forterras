/* ============================================================================
   ШАГ 1 — Знакомство и сбор ответов
   ========================================================================== */
(function () {
  const { renderRadioGroup, labelOf, escapeHtml } = App.utils;

  App.registerStep(1, {
    render(container) {
      container.innerHTML = `
        <div class="card">
          <h1>🍽️ Разноцветная тарелка <span class="badge">Шаг 1</span></h1>
          <p class="lead">
            Привет! Я — AI-помощник по питанию. Мы не считаем калории и не взвешиваем
            продукты. Соберём твою «разноцветную тарелку» по принципу Гарварда:
            <strong>½ — овощи и фрукты</strong>,
            <strong>¼ — белок</strong>, <strong>¼ — сложные углеводы</strong>.
            Ответь, пожалуйста, на 3 коротких вопроса.
          </p>

          <form id="step1-form" novalidate>
            <fieldset>
              <legend>1. Тип питания</legend>
              ${renderRadioGroup('dietType', App.DIET_OPTIONS)}
            </fieldset>
            <fieldset>
              <legend>2. Текущий сезон</legend>
              ${renderRadioGroup('season', App.SEASON_OPTIONS)}
            </fieldset>
            <fieldset>
              <legend>3. Уровень активности сегодня</legend>
              ${renderRadioGroup('activity', App.ACTIVITY_OPTIONS)}
            </fieldset>
            <button type="submit">Сохранить ответы</button>
            <p class="error" id="step1-error">Пожалуйста, ответь на все три вопроса.</p>
          </form>
        </div>
      `;

      container.querySelector('#step1-form')
        .addEventListener('submit', e => this.handleSubmit(e, container));
    },

    handleSubmit(event, container) {
      event.preventDefault();
      const data = new FormData(event.target);
      const dietType = data.get('dietType');
      const season   = data.get('season');
      const activity = data.get('activity');

      const errorEl = container.querySelector('#step1-error');
      if (!dietType || !season || !activity) {
        errorEl.classList.add('visible');
        return;
      }
      errorEl.classList.remove('visible');

      // Сохраняем ответы
      Object.assign(App.State.user, { dietType, season, activity });

      console.log('[Шаг 1] Ответы сохранены:', App.State.user);
      alert(
        'Ответы сохранены!\n\n' +
        '• Тип питания: ' + labelOf(App.DIET_OPTIONS, dietType) + '\n' +
        '• Сезон: '      + labelOf(App.SEASON_OPTIONS, season) + '\n' +
        '• Активность: ' + labelOf(App.ACTIVITY_OPTIONS, activity) + '\n\n' +
        'Переходим к тарелке…'
      );

      // Дальше — Шаг 2
      App.goToStep(2);
    }
  });
})();