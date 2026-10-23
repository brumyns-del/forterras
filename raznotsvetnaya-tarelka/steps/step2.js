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
              <div class="color-counter" id="color-counter"></div>
            </div>
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
                return '<div class="product-section-header"><h3 class="' + meta.cls + '">' + meta.title + '</h3>' + (hasDetails ? '<button type="button" class="details-btn" data-details="' + cat + '">Подробнее →</button>' : '') + '</div>';
            };

            return Object.keys(CATEGORY_META).map(cat => {
                const meta = CATEGORY_META[cat];
                const data = config[cat];
                if (!data) return '';
                if (Array.isArray(data)) {
                    if (!data.length) return '';
                    return '<div class="product-section">' + renderHeader(cat, meta) + '<div class="product-buttons">' + data.map(p => renderButton(cat, p)).join('') + '</div></div>';
                }
                let subgroupsHtml = '';
                Object.keys(data).forEach(subTitle => {
                    const products = data[subTitle] || [];
                    if (!products.length) return;
                    subgroupsHtml += '<details class="food-subgroup"><summary>' + escapeHtml(subTitle) + '</summary><div class="food-dropdown-list scrollable">' + products.map(p => renderButton(cat, p)).join('') + '</div></details>';
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
                counterEl.innerHTML = `🎨 Цветов на тарелке: <strong>${brightColors.size} из ${totalBright}</strong><small class="counter-hint">Чем разноцветнее тарелка — тем полезнее меню.</small>`;
            }

            const feedbackEl = document.getElementById('feedback');
            if (!feedbackEl) return;
            if (App.State.selectedProducts.length === 0) {
                feedbackEl.innerHTML = 'Начни собирать тарелку: выбери продукты слева.';
            } else {
                feedbackEl.innerHTML = `🌈 Сейчас ярких цветов: <strong>${brightColors.size}</strong>.`;
            }
        }
    });
})();