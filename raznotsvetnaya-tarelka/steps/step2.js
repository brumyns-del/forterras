/* ============================================================================
   ШАГ 2.1 — «Разноцветная тарелка»
   ========================================================================== */
(function () {
    const { escapeHtml, labelOf } = App.utils;

    const CATEGORY_META = {
        vegetables: { title: '🌱 Живые продукты (½ тарелки)', cls: 'veg' },
        protein: { title: '🍗 Белки (¼ тарелки)', cls: 'protein' },
        carbs: { title: '🌾 Углеводы (¼ тарелки)', cls: 'carbs' },
        fats: { title: '🥑 Полезные жиры', cls: 'fats' },
        water: { title: '💧 Вода и напитки', cls: 'water' },
        sweets: { title: '🍬 Сладкое', cls: 'sweets' },
        harmful: { title: '⚠️ Нежелательно и вредно', cls: 'harmful' }
    };

    App.registerStep(2, {
        render(container) {
            const { dietType, season, activity } = App.State.user;
            const config = App.getPlateConfig(App.State.user);

            if (!config) {
                container.innerHTML = `<div class="card"><h1>🍽️ Шаг 2 в разработке</h1><button onclick="App.goToStep(1)">← Назад</button></div>`;
                return;
            }

            const profileKey = `${dietType}_${activity}_${season}`;
            if (App.State._lastProfileKey !== profileKey) {
                App.State.selectedProducts = [];
                App.State._lastProfileKey = profileKey;
            }

            container.innerHTML = `
        <div class="card">
          <h1>🍽️ Собери свою тарелку <span class="badge">Шаг 2.1</span></h1>
          <div class="interactive-grid">
            <div class="products-panel">${this.renderProductSections(config)}</div>
                        <div class="plate-panel">
              <div class="plate-circle" id="plate-circle">
                <div class="plate-sector pc-veg" data-cat="vegetables"></div>
                <div class="plate-sector pc-protein" data-cat="protein"></div>
                <div class="plate-sector pc-carbs" data-cat="carbs"></div>
              </div>
              
              <!-- НОВЫЙ БЛОК: Полезные жиры с картинкой -->
              <div class="fats-section">
                <div class="fats-icon">
                  <!-- Векторная картинка: Бутылочка + Кубик масла -->
                  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Тень под предметами -->
                    <ellipse cx="60" cy="90" rx="45" ry="6" fill="rgba(0,0,0,0.08)" />
                    
                    <!-- Бутылочка масла -->
                    <path d="M35 25 L35 45 L25 65 L25 85 Q25 90 30 90 L50 90 Q55 90 55 85 L55 65 L45 45 L45 25 Z" fill="#f4f9f0" stroke="#4a7c59" stroke-width="2.5"/>
                    <rect x="37" y="18" width="6" height="7" fill="#4a7c59" rx="1"/>
                    <!-- Золотистая капля -->
                    <path d="M35 96 Q40 102 45 96 Q40 91 35 96 Z" fill="#f9a825"/>
                    <!-- Блик на бутылке -->
                    <path d="M32 70 L32 82" stroke="#c8e6c9" stroke-width="2" stroke-linecap="round"/>

                    <!-- Кубик сливочного масла -->
                    <rect x="65" y="60" width="40" height="30" rx="4" fill="#fef08a" stroke="#d97706" stroke-width="2.5"/>
                    <path d="M65 68 L105 68" stroke="#d97706" stroke-width="2"/>
                    <!-- Зеленый листик на кубике -->
                    <path d="M80 60 Q85 45 100 50 Q95 60 80 60 Z" fill="#43a047"/>
                  </svg>
                </div>
                <div class="fats-label">Немного полезного масла</div>
                <div class="fats-items" id="fats-items"></div>
              </div>
              <!-- НОВЫЙ БЛОК: Вода и напитки с картинкой -->
              <div class="water-section">
                <div class="water-icon">
                  <!-- Векторная картинка: Стакан воды с листиком -->
                  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Тень -->
                    <ellipse cx="60" cy="90" rx="40" ry="6" fill="rgba(0,0,0,0.08)" />
                    <!-- Стакан -->
                    <path d="M35 30 L45 80 Q50 90 60 90 Q70 90 75 80 L85 30 Z" fill="rgba(200, 230, 240, 0.4)" stroke="#00838f" stroke-width="2.5" stroke-linejoin="round"/>
                    <!-- Вода внутри -->
                    <path d="M40 50 L48 78 Q52 85 60 85 Q68 85 72 78 L80 50 Z" fill="#80deea" opacity="0.8"/>
                    <!-- Пузырьки -->
                    <circle cx="60" cy="60" r="3" fill="#ffffff" opacity="0.6"/>
                    <circle cx="55" cy="70" r="4" fill="#ffffff" opacity="0.6"/>
                    <circle cx="65" cy="75" r="2" fill="#ffffff" opacity="0.6"/>
                    <!-- Зеленый листик -->
                    <path d="M85 30 Q95 20 105 25 Q100 35 85 30 Z" fill="#43a047" />
                  </svg>
                </div>
                <div class="water-label">Вода и напитки</div>
                <div class="water-items" id="water-items"></div>
              </div>
              <div class="color-counter" id="color-counter"></div>
            </div></div>
          </div>
          <div class="feedback" id="feedback"></div>
        </div>
      `;

            container.querySelectorAll('.btn-food').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.toggleProduct(btn.dataset.pid);
                    btn.classList.toggle('active');
                });
            });

            container.querySelectorAll('.details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.openDetails(btn.dataset.details);
                });
            });

            this.updatePlate();
        },
        renderProductSections(config) {
            if (!config) return '';

            const renderButton = (cat, p) => {
                const pid = App.productId(cat, p);
                const isActive = App.State.selectedProducts.includes(pid);
                return `<product-card name="${escapeHtml(p.name)}" color="${p.color}" pid="${escapeHtml(pid)}" ${isActive ? 'active' : ''}></product-card>`;
            };

            const renderHeader = (cat, meta) => {
                const hasDetails = App.DETAILS && App.DETAILS[cat];
                return '<div class="product-section-header">' +
                    '<h3 class="' + meta.cls + '">' + meta.title + '</h3>' +
                    (hasDetails ? '<button type="button" class="details-btn" data-details="' + cat + '">Подробнее →</button>' : '') +
                    '</div>';
            };

            return Object.keys(CATEGORY_META).map(cat => {
                const meta = CATEGORY_META[cat];
                const data = config[cat];
                if (!data) return '';

                // 1. Обычный список продуктов (массив)
                if (Array.isArray(data)) {
                    if (!data.length) return '';
                    return '<div class="product-section">' + renderHeader(cat, meta) +
                        '<div class="product-buttons scrollable-box">' +
                        data.map(p => renderButton(cat, p)).join('') +
                        '</div>' +
                        '</div>';
                }

                // 2. Список с подгруппами (объект)
                let subgroupsHtml = '';
                Object.keys(data).forEach(subTitle => {
                    const products = data[subTitle] || [];
                    if (!products.length) return;
                    subgroupsHtml += '<details class="food-subgroup">' +
                        '<summary>' + escapeHtml(subTitle) + '</summary>' +
                        '<div class="food-dropdown-list scrollable-box">' +
                        products.map(p => renderButton(cat, p)).join('') +
                        '</div>' +
                        '</details>';
                });

                if (!subgroupsHtml) return '';
                return '<div class="product-section">' + renderHeader(cat, meta) + subgroupsHtml + '</div>';
            }).join('');
        },

        openDetails(cat) {
            const data = App.DETAILS && App.DETAILS[cat];
            if (!data) return;
            const old = document.getElementById('details-modal');
            if (old) old.remove();
            const modal = document.createElement('div');
            modal.id = 'details-modal';
            modal.className = 'modal-overlay';
            modal.innerHTML = '<div class="modal-card"><button type="button" class="modal-close">×</button><h2>' + escapeHtml(data.title || '') + '</h2><div class="modal-body">' + (data.html || '') + '</div></div>';
            document.body.appendChild(modal);
            const close = () => modal.remove();
            modal.querySelector('.modal-close').addEventListener('click', close);
            modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        },

        findProductByPid(pid) {
            const config = App.getPlateConfig(App.State.user);
            if (!config) return null;
            const [cat, ...nameParts] = pid.split(':');
            const name = nameParts.join(':');
            const data = config[cat];
            if (!data) return null;
            const list = Array.isArray(data) ? data : Object.values(data).flat();
            return list.find(p => p.name === name) || null;
        },

        toggleProduct(pid) {
            if (!pid) return;
            const list = App.State.selectedProducts;
            const idx = list.indexOf(pid);
            if (idx === -1) list.push(pid);
            else list.splice(idx, 1);
            this.updatePlate();
        },

        updatePlate() {
            const config = App.getPlateConfig(App.State.user);
            if (!config) return;
            ['vegetables', 'protein', 'carbs'].forEach(cat => {
                const sector = document.querySelector(`.plate-sector[data-cat="${cat}"]`);
                if (!sector) return;
                const selectedHere = App.State.selectedProducts.filter(pid => pid.startsWith(cat + ':')).map(pid => this.findProductByPid(pid)).filter(Boolean);
                const labelText = cat === 'vegetables' ? '½' : '¼';
                const labelSub = cat === 'vegetables' ? 'Овощи' : cat === 'protein' ? 'Белок' : 'Углеводы';
                if (selectedHere.length === 0) {
                    sector.innerHTML = `<div class="label">${labelText}</div><small>${labelSub}</small>`;
                } else {
                    sector.innerHTML = `<div class="items">${selectedHere.map(p => `<span title="${escapeHtml(p.name)}">${App.COLOR_EMOJI[p.color] || '⚪'}</span>`).join('')}</div>`;
                }
            });

            const brightColors = new Set();
            App.State.selectedProducts.forEach(pid => {
                const p = this.findProductByPid(pid);
                if (p && App.BRIGHT_COLORS[p.color]) brightColors.add(p.color);
            });
            const totalBright = Object.keys(App.BRIGHT_COLORS).length;

            const counterEl = document.getElementById('color-counter');
            if (counterEl) {
                counterEl.innerHTML = `🎨 Выбрано <strong>${brightColors.size}</strong> цветов из ${totalBright}<small class="counter-hint">Чем разноцветнее тарелка — тем полезнее меню.</small>`;
            }

            const feedbackEl = document.getElementById('feedback');
                  // 4. Отрисовываем выбранные напитки рядом с картинкой
      const waterContainer = document.getElementById('water-items');
      if (waterContainer) {
        const selectedWater = App.State.selectedProducts
          .filter(pid => pid.startsWith('water:'))
          .map(pid => this.findProductByPid(pid))
          .filter(Boolean);
        
        waterContainer.innerHTML = selectedWater.map(p => 
          `<span title="${escapeHtml(p.name)}">${App.COLOR_EMOJI[p.color] || '⚪'}</span>`
        ).join('');
      }
            // 4. Отрисовываем выбранные жиры рядом с картинкой
            const fatsContainer = document.getElementById('fats-items');
            if (fatsContainer) {
                const selectedFats = App.State.selectedProducts
                    .filter(pid => pid.startsWith('fats:'))
                    .map(pid => this.findProductByPid(pid))
                    .filter(Boolean);

                fatsContainer.innerHTML = selectedFats.map(p =>
                    `<span title="${escapeHtml(p.name)}">${App.COLOR_EMOJI[p.color] || '🟡'}</span>`
                ).join('');
            }

            // 3. Мягкая подсказка (тот самый блок feedbackEl, который уже был)
            if (!feedbackEl) return;
            if (App.State.selectedProducts.length === 0) {
                feedbackEl.innerHTML = 'Начни собирать тарелку: выбери продукты слева.';
            } else {
                feedbackEl.innerHTML = `🌈 Сейчас ярких цветов: <strong>${brightColors.size}</strong>.`;
            }
        }
    });
})();