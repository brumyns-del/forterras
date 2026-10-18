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
  // Тарелочные группы (½ / ¼ / ¼)
  vegetables: { title: '🌱 Живые продукты (½ тарелки)', cls: 'veg',     color: '#2e7d32' },
  protein:    { title: '🍗 Белки (¼ тарелки)',           cls: 'protein', color: '#d84315' },
  carbs:      { title: '🌾 Углеводы (¼ тарелки)',         cls: 'carbs',   color: '#b28704' },
  // Отдельные группы
  fats:       { title: '🥑 Полезные жиры',                cls: 'fats',    color: '#6a4c93' },
  water:      { title: '💧 Вода и напитки',               cls: 'water',   color: '#00838f' },
  sweets:     { title: '🍬 Сладкое',                      cls: 'sweets',  color: '#c2185b' },
  harmful:    { title: '⚠️ Нежелательно и вредно',         cls: 'harmful', color: '#555' }
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
      // Открытие/закрытие дропдаунов
container.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = toggle.closest('.custom-dropdown');
    const wasOpen = dd.classList.contains('is-open');
    container.querySelectorAll('.custom-dropdown.is-open')
      .forEach(d => d.classList.remove('is-open'));
    if (!wasOpen) dd.classList.add('is-open');
  });
});


// Клик вне дропдауна — закрыть все
document.addEventListener('click', () => {
  document.querySelectorAll('.custom-dropdown.is-open')
    .forEach(d => d.classList.remove('is-open'));
});
           // Клик по продукту — добавить/убрать с тарелки
           container.querySelectorAll('.btn-food').forEach(btn => {
        btn.addEventListener('click', () => {
          this.toggleProduct(btn.dataset.pid);
          btn.classList.toggle('active');
        });
      });

      // Кнопки «Подробнее» — открыть модалку
      container.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openDetails(btn.dataset.details);
        });
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
    
            renderProductSections(config) {
      if (!config) return '';

      const renderButton = (cat, p) => {
        const pid = App.productId(cat, p);
        const isActive = App.State.selectedProducts.includes(pid);
        return '<button type="button" class="btn-food' + (isActive ? ' active' : '') +
               '" data-pid="' + escapeHtml(pid) + '">' +
                                  '<span class="icon">' + (App.COLOR_EMOJI[p.color] || '⚪') + '</span>' +
                 '<span>' + escapeHtml(p.name) + '</span>' +
               '</button>';
      };

      const renderHeader = (cat, meta) => {
        const hasDetails = App.DETAILS && App.DETAILS[cat];
        return '<div class="product-section-header">' +
                 '<h3 class="' + meta.cls + '">' + meta.title + '</h3>' +
                 (hasDetails
                   ? '<button type="button" class="details-btn" data-details="' + cat + '">Подробнее →</button>'
                   : '') +
               '</div>';
      };

      return Object.keys(CATEGORY_META).map(cat => {
        const meta = CATEGORY_META[cat];
        const data = config[cat];
        if (!data) return '';

        // Массив — плоский список продуктов
        if (Array.isArray(data)) {
          if (!data.length) return '';
          return '<div class="product-section">' +
                   renderHeader(cat, meta) +
                   '<div class="product-buttons">' +
                     data.map(p => renderButton(cat, p)).join('') +
                   '</div>' +
                 '</div>';
        }

        // Объект — с подгруппами
        let subgroupsHtml = '';
        Object.keys(data).forEach(subTitle => {
          const products = data[subTitle] || [];
          if (!products.length) return;
          subgroupsHtml += '<details class="food-subgroup">' +
                             '<summary>' + escapeHtml(subTitle) + '</summary>' +
                             '<div class="food-dropdown-list scrollable">' +
                               products.map(p => renderButton(cat, p)).join('') +
                             '</div>' +
                           '</details>';
        });

        if (!subgroupsHtml) return '';
        return '<div class="product-section">' +
                 renderHeader(cat, meta) +
                 subgroupsHtml +
               '</div>';
      }).join('');
    },

    /* --------------------------------------------------------------------- */
    
    findProductByPid(pid) {
      const config = App.getPlateConfig(App.State.user);
      if (!config) return null;

      const [cat, ...nameParts] = pid.split(':');
      const name = nameParts.join(':');
      const data = config[cat];
      if (!data) return null;

      const list = Array.isArray(data)
        ? data
        : Object.values(data).flat();

      return list.find(p => p.name === name) || null;
    },


    /* --------------------------------------------------------------------- */
    

    /* --------------------------------------------------------------------- */
        /* ------------------------------------------------------------------ */
    toggleProduct(pid) {
      if (!pid) return;

      const list = App.State.selectedProducts;
      const idx  = list.indexOf(pid);

      if (idx === -1) {
        list.push(pid);          // добавляем продукт
      } else {
        list.splice(idx, 1);     // убираем, если уже выбран
      }

      this.updatePlate();        // перерисовать тарелку, счётчик, фидбек
    },

     /* ------------------------------------------------------------------ */
    openDetails(cat) {
      const data = App.DETAILS && App.DETAILS[cat];
      if (!data) return;

      // Убираем старую модалку, если есть
      const old = document.getElementById('details-modal');
      if (old) old.remove();

      const modal = document.createElement('div');
      modal.id = 'details-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML =
        '<div class="modal-card" role="dialog" aria-modal="true">' +
          '<button type="button" class="modal-close" aria-label="Закрыть">×</button>' +
          '<h2>' + escapeHtml(data.title || '') + '</h2>' +
          '<div class="modal-body">' + (data.html || '') + '</div>' +
        '</div>';

      document.body.appendChild(modal);

      const close = () => modal.remove();
      modal.querySelector('.modal-close').addEventListener('click', close);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
      });
      const escHandler = (e) => {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
      };
      document.addEventListener('keydown', escHandler);
    },
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
              ${selectedHere.map(p => `<span title="${escapeHtml(p.name)}">${App.COLOR_EMOJI[p.color] || '⚪'}</span>`).join('')}
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
        counterEl.innerHTML =
          `🎨 Цветов на тарелке: <strong>${brightColors.size} из ${totalBright}</strong>` +
          `<small class="counter-hint">Чем разноцветнее тарелка — тем полезнее меню.</small>`;
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