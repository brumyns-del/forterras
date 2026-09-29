/* ============================================================================
   ШАГ 2.1 — «Разноцветная тарелка» с интерактивной сборкой
   ----------------------------------------------------------------------------
   Логика:
   • Слева — кнопки продуктов, сгруппированные по секторам (овощи/белок/углеводы).
   • Справа — тарелка ½ / ¼ / ¼, в секторы которой «падают» выбранные продукты.
   • Внизу — счётчик «4 цветов» и мягкая подсказка (принцип «добавь, а не убери»).
   • Выбранные продукты хранятся в App.State.selectedProducts, чтобы Шаг 3
     мог использовать их при сборке меню.
   ========================================================================== */
(function () {
  const { escapeHtml, labelOf } = App.utils;

  const CATEGORY_META = {
    vegetables: { title: '🥦 Овощи и фрукты (½ тарелки)', cls: 'veg' },
    protein:    { title: '🍗 Белок (¼ тарелки)',          cls: 'protein' },
    carbs:      { title: '🌾 Сложные углеводы (¼ тарелки)', cls: 'carbs' }
  };

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
        console.warn('[Шаг 2] Нет конфига для ключа:', `${dietType}_${activity}`);
        return;
      }

      // Если профиль другой — сбрасываем выбор с прошлого профиля
      const profileKey = `${dietType}_${activity}_${season}`;
      if (App.State._lastProfileKey !== profileKey) {
        App.State.selectedProducts = [];
        App.State._lastProfileKey = profileKey;
      }

      container.innerHTML = `
        <div class="card">
          <h1>🍽️ Собери свою тарелку <span class="badge">Шаг 2.1</span></h1>
          <p class="lead">
            Профиль:
            <strong>${escapeHtml(labelOf(App.DIET_OPTIONS, dietType))}</strong> ·
            <strong>${escapeHtml(labelOf(App.SEASON_OPTIONS, season))}</strong> ·
            <strong>${escapeHtml(labelOf(App.ACTIVITY_OPTIONS, activity))}</strong>.
            Кликай по продуктам слева — они появятся на тарелке справа.
          </p>

          ${config.note ? `<p class="plate-note">💡 ${escapeHtml(config.note)}</p>` : ''}

          <div class="interactive-grid">
            <!-- Левая колонка: выбор продуктов -->
            <div class="products-panel">
              ${this.renderProductSections(config)}
            </div>

            <!-- Правая колонка: тарелка + счётчик + фидбек -->
            <div class="plate-panel">
              <div class="plate-circle" id="plate-circle">
                <div class="plate-sector pc-veg"     data-cat="vegetables"></div>
                <div class="plate-sector pc-protein" data-cat="protein"></div>
                <div class="plate-sector pc-carbs"   data-cat="carbs"></div>
              </div>
              <div class="color-counter" id="color-counter"></div>
            </div>
          </div>

          <div class="feedback" id="feedback"></div>

          <div class="actions">
            <button class="btn-secondary" onclick="App.goToStep(1)">← Изменить ответы</button>
            <button id="step2-next">Собрать меню на день →</button>
          </div>

          <!-- TODO: Шаг 3 — кнопка «Собрать меню на день» будет вести на Шаг 3. -->
        </div>
      `;

      // Навешиваем обработчики
      container.querySelectorAll('.btn-food').forEach(btn => {
        btn.addEventListener('click', () => this.toggleProduct(btn.dataset.pid));
      });

      container.querySelector('#step2-next').addEventListener('click', () => {
        console.log('[Шаг 2.1] Выбранные продукты:', App.State.selectedProducts);
        alert(
          'Шаг 2.1 завершён!\n\n' +
          'Ты выбрал(а) ' + App.State.selectedProducts.length + ' продукт(ов).\n' +
          'Дальше — Шаг 3 «Меню на день» (пока в разработке).'
        );
        // TODO: Шаг 3 — раскомментировать: App.goToStep(3);
      });

      // Первая отрисовка тарелки
      this.updatePlate();

      console.log('[Шаг 2.1] Интерактив запущен для:', App.State.user);
    },

    /* --------------------------------------------------------------------- */
    renderProductSections(config) {
      return Object.keys(CATEGORY_META).map(cat => {
        const meta = CATEGORY_META[cat];
        const products = config[cat] || [];
        return `
          <div class="product-section">
            <h3 class="${meta.cls}">${meta.title}</h3>
            <div class="product-buttons">
              ${products.map(p => {
                const pid = App.productId(cat, p);
                return `
                  <button type="button"
                          class="btn-food"
                          data-pid="${escapeHtml(pid)}">
                    <span class="icon">${p.icon}</span>
                    <span>${escapeHtml(p.name)}</span>
                  </button>`;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');
    },

    /* --------------------------------------------------------------------- */
    toggleProduct(pid) {
      const idx = App.State.selectedProducts.indexOf(pid);
      if (idx > -1) {
        App.State.selectedProducts.splice(idx, 1);
      } else {
        App.State.selectedProducts.push(pid);
      }

      // Обновляем класс .active на кнопке
      const btn = document.querySelector(`.btn-food[data-pid="${CSS.escape(pid)}"]`);
      if (btn) btn.classList.toggle('active', App.State.selectedProducts.includes(pid));

      this.updatePlate();
    },

    /* --------------------------------------------------------------------- */
    findProductByPid(pid) {
      const config = App.getPlateConfig(App.State.user);
      if (!config) return null;
      const [cat, ...nameParts] = pid.split(':');
      const name = nameParts.join(':');
      const list = config[cat] || [];
      return list.find(p => p.name === name) || null;
    },

    /* --------------------------------------------------------------------- */
    updatePlate() {
      const config = App.getPlateConfig(App.State.user);
      if (!config) return;

      // 1. Отрисовываем секторы тарелки
      ['vegetables', 'protein', 'carbs'].forEach(cat => {
        const sector = document.querySelector(`.plate-sector[data-cat="${cat}"]`);
        if (!sector) return;

        const selectedHere = App.State.selectedProducts
          .filter(pid => pid.startsWith(cat + ':'))
          .map(pid => this.findProductByPid(pid))
          .filter(Boolean);

        const labelText = cat === 'vegetables' ? '½' : '¼';
        const labelSub  = cat === 'vegetables' ? 'Овощи' :
                          cat === 'protein'    ? 'Белок' : 'Углеводы';

        if (selectedHere.length === 0) {
          sector.innerHTML = `
            <div class="label">${labelText}</div>
            <small>${labelSub}</small>
          `;
        } else {
          sector.innerHTML = `
            <div class="items">
              ${selectedHere.map(p => `<span title="${escapeHtml(p.name)}">${p.icon}</span>`).join('')}
            </div>
          `;
        }
      });

      // 2. Счётчик ярких цветов
      const brightColors = new Set();
      App.State.selectedProducts.forEach(pid => {
        const p = this.findProductByPid(pid);
        if (p && App.BRIGHT_COLORS[p.color]) brightColors.add(p.color);
      });
      const totalBright = Object.keys(App.BRIGHT_COLORS).length; // 4

      const counterEl = document.getElementById('color-counter');
      if (counterEl) {
        counterEl.innerHTML = `🎨 Цветов на тарелке: <strong>${brightColors.size} из ${totalBright}</strong>`;
      }

      // 3. Мягкая подсказка
      const feedbackEl = document.getElementById('feedback');
      if (!feedbackEl) return;

      const selected = App.State.selectedProducts;
      const vegCount     = selected.filter(p => p.startsWith('vegetables:')).length;
      const proteinCount = selected.filter(p => p.startsWith('protein:')).length;
      const carbsCount   = selected.filter(p => p.startsWith('carbs:')).length;

      if (selected.length === 0) {
        feedbackEl.innerHTML =
          'Начни собирать тарелку: выбери продукты слева. Цель — ' +
          '½ овощей и фруктов, ¼ белка, ¼ сложных углеводов и максимум цветов.';
        return;
      }

      // Сначала — подсказка по цветам
      let colorTip = '';
      if (brightColors.size < totalBright) {
        const missing = Object.keys(App.BRIGHT_COLORS)
          .filter(c => !brightColors.has(c));
        const firstMissing = missing[0];
        colorTip = `🌈 Отлично! Сейчас ярких цветов: <strong>${brightColors.size}</strong>. ` +
                   `Попробуй добавить что-то <strong>${App.BRIGHT_COLORS[firstMissing].suggestion}</strong>.`;
      } else {
        colorTip = '🎉 <strong>Идеальное разноцветие!</strong> Микробиом скажет спасибо.';
      }

      // Затем — мягкая подсказка по балансу
      let balanceTip = '';
      if (vegCount === 0) {
        balanceTip = 'Начни с овощей — они занимают половину тарелки.';
      } else if (proteinCount === 0) {
        balanceTip = 'Добавь белок — четверть тарелки (яйцо, курица, рыба или бобовые).';
      } else if (carbsCount === 0) {
        balanceTip = 'И немного сложных углеводов — ещё четверть (гречка, картофель, хлеб).';
      } else {
        balanceTip = 'Баланс ½ / ¼ / ¼ соблюдён — отлично!';
      }

      feedbackEl.innerHTML = `${colorTip}<br><span class="muted">${balanceTip}</span>`;
    }

    // TODO: Шаг 3 — метод buildMenu() возьмёт App.State.selectedProducts
    //       и соберёт из них конкретные блюда на день.
  });
})();