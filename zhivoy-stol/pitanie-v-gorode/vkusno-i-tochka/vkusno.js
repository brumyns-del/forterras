document.addEventListener('DOMContentLoaded', () => {
    let isPro = localStorage.getItem('app_isPro') === 'true';
    updateProUI(isPro);

    // Словарь для эмодзи (пищевые группы ресторана)
    const FOOD_GROUPS = {
        veg: '🥦', fruit: '🍎', grain: '🌾', protein: '🍗', dairy: '🥛',
        fat: '🧈', drink: '🥤', sauce: '🥫', sweet: '🍬'
    };

    // Проверка, что база данных загрузилась
    if (!window.App || !App.DB || !App.DB.Places || !App.DB.Places.vkusno) {
        console.error("Ошибка: База данных App.DB не загружена. Проверьте путь к products-db.js");
        return;
    }

    const vkusnoMenu = App.DB.Places.vkusno.menu;
    let selectedDishes = [];

    // Отрисовка карточек блюд
    vkusnoMenu.forEach(dish => {
        const btn = document.createElement('button');
        btn.className = 'menu-btn';

        // Берем группы (если их нет, ставим пустой массив)
        const groups = dish.groups || [];
        const groupEmojis = groups.map(g => FOOD_GROUPS[g] || '🍽️').join('');

        // Добавляем каплю чистоты состава
        let dropHtml = '';
        if (window.App && App.MENU_DETAILS && App.MENU_DETAILS[dish.id]) {
            const detail = App.MENU_DETAILS[dish.id];
            dropHtml = `<span class="clean-label-drop drop-${detail.clean_label}" title="Чистота состава"></span>`;
        }

        btn.innerHTML = `<span>${groupEmojis} ${dish.name}</span> ${dropHtml}`;
        btn.addEventListener('click', () => toggleDish(dish, btn));

        const catContainer = document.getElementById(`cat-${dish.category}`);
        if (catContainer) {
            catContainer.appendChild(btn);
        }
    });

    // Логика выбора/отмены блюда
    function toggleDish(dish, btn) {
        const index = selectedDishes.findIndex(d => d.id === dish.id);
        if (index === -1) {
            selectedDishes.push(dish);
            btn.classList.add('active');
        } else {
            selectedDishes.splice(index, 1);
            btn.classList.remove('active');
        }
        updateTray();
    }

    // Обновление подноса, БЖУ и оценок
    function updateTray() {
        const totalGreen = selectedDishes.reduce((sum, dish) => sum + (dish.green || 0), 0);
        const trayTip = document.getElementById('smart-tip');

        let totalKcal = 0, totalP = 0, totalF = 0, totalC = 0;
        let totalProteinServings = 0;
        let junkCount = 0;

        // Переменные для порций
        let totalVeggiePortions = 0;

        selectedDishes.forEach(dish => {
            if (dish.macros) {
                totalKcal += dish.macros.kcal;
                totalP += dish.macros.p;
                totalF += dish.macros.f;
                totalC += dish.macros.c;
            }
            // Считаем овощи (если есть порции в базе)
            if (dish.servings && dish.servings.veggies) {
                totalVeggiePortions += dish.servings.veggies;
            } else if (dish.green > 0) {
                // Если в бургере есть салат, добавляем 0.2 порции (треть кулака)
                totalVeggiePortions += 0.2;
            }
            if (dish.servings && dish.servings.protein) totalProteinServings += dish.servings.protein;
            if (dish.junk) junkCount++;
        });

        // === РАСЧЕТ ПРОЦЕНТОВ ЗАПОЛНЕНИЯ (НОВЫЕ НОРМЫ НА 2300 ККАЛ) ===
        const targetProt = 115;   // 115 г белка = 100%
        const targetCarbs = 291;  // 291 г углеводов = 100%
        const targetVegPortions = 4; // 4 порции овощей = 100%

        const fillVeg = Math.min((totalVeggiePortions / targetVegPortions) * 100, 100);
        const fillProt = Math.min((totalP / targetProt) * 100, 100);
        const fillCarbs = Math.min((totalC / targetCarbs) * 100, 100);

        // Заливаем сектора
        const trayEl = document.getElementById('tray-circle');
        if (trayEl) {
            trayEl.style.setProperty('--fill-veg', fillVeg + '%');
            trayEl.style.setProperty('--fill-protein', fillProt + '%');
            trayEl.style.setProperty('--fill-carbs', fillCarbs + '%');
        }

        // === ОТРИСОВКА ЭМОДЗИ (ГРУППЫ) ===
        const vegContainer = document.getElementById('tray-veg');
        const proteinContainer = document.getElementById('tray-protein');
        const carbsContainer = document.getElementById('tray-carbs');

        if (vegContainer && proteinContainer && carbsContainer) {
            vegContainer.innerHTML = '';
            proteinContainer.innerHTML = '';
            carbsContainer.innerHTML = '';

            let groupsInVeg = new Set();
            let groupsInProtein = new Set();
            let groupsInCarbs = new Set();

            selectedDishes.forEach(dish => {
                const groups = dish.groups || [];
                groups.forEach(g => {
                    const emoji = FOOD_GROUPS[g] || '🍽️';
                    if (g === 'veg' || g === 'fruit') groupsInVeg.add(emoji);
                    else if (g === 'protein' || g === 'dairy') groupsInProtein.add(emoji);
                    else if (g === 'grain' || g === 'sweet') groupsInCarbs.add(emoji);
                });
            });

            groupsInVeg.forEach(emoji => vegContainer.innerHTML += `<span>${emoji}</span>`);
            groupsInProtein.forEach(emoji => proteinContainer.innerHTML += `<span>${emoji}</span>`);
            groupsInCarbs.forEach(emoji => carbsContainer.innerHTML += `<span>${emoji}</span>`);
        }

        // === РАСЧЕТ БЖУ ===
        let ratioText = "0 : 0 : 0";
        if (totalP > 0) {
            ratioText = `1 : ${(totalF / totalP).toFixed(1)} : ${(totalC / totalP).toFixed(1)}`;
        } else if (totalF > 0) {
            ratioText = `0 : 1 : ${(totalC / totalF).toFixed(1)}`;
        } else if (totalC > 0) {
            ratioText = `0 : 0 : 1`;
        }

        const macrosDisplay = document.getElementById('macros-display');
        const showMacrosCheckbox = document.getElementById('show-macros');
        if (showMacrosCheckbox) showMacrosCheckbox.onchange = updateTray;

        if (showMacrosCheckbox && showMacrosCheckbox.checked && macrosDisplay) {
            macrosDisplay.style.display = 'block';
            macrosDisplay.innerHTML = `
                <div class="bju-header">
                    <span>Итого по чеку:</span>
                    <span>${totalKcal} ккал</span>
                </div>
                <div class="bju-macros">
                    <span>Б: ${totalP}г</span>
                    <span>Ж: ${totalF}г</span>
                    <span>У: ${totalC}г</span>
                </div>
                <div class="bju-ratio-box">
                    <div class="ratio-row">
                        <span>Ваше соотношение:</span>
                        <span class="ratio-value">${ratioText}</span>
                    </div>
                    <div class="ratio-row">
                        <span>Норма:</span>
                        <span class="ratio-value normal-ratio">1 : 1 : 4</span>
                    </div>
                </div>
            `;
        } else if (macrosDisplay) {
            macrosDisplay.style.display = 'none';
        }

        // === ЧЕСТНАЯ ОЦЕНКА И МОСТ К ТАРЕЛКЕ ===
        const bridgeSection = document.getElementById('bridge-section');

        if (selectedDishes.length === 0) {
            trayTip.innerHTML = 'Выберите блюда, чтобы получить совет по балансу.';
            trayTip.className = 'smart-tip';
            if (bridgeSection) bridgeSection.style.display = 'none';
            return;
        }

        // Скрываем старую подсказку, показываем мост
        trayTip.style.display = 'none';
        if (bridgeSection) bridgeSection.style.display = 'block';

        // 1. Заполняем левую часть (Ваш заказ)
        const orderList = document.getElementById('bridge-order-list');
        if (orderList) {
            orderList.innerHTML = selectedDishes.map(d => `<li>${d.name}</li>`).join('');
        }

        // 2. Считаем нехватку
        const missingProt = Math.max(0, 115 - totalP);
        const missingCarbs = Math.max(0, 291 - totalC);
        const missingVeg = Math.max(0, 4 - totalVeggiePortions);

        // 3. Заполняем правую часть (Советы)
        const adviceList = document.getElementById('bridge-advice-list');
        let adviceHtml = '';

        // Логика: Если белка мало
        if (missingProt > 20) {
            adviceHtml += `<div class="advice-row"><span class="advice-condition">Если белка мало или нет:</span><span class="advice-action">🥩 Рыба, яйца, творог, мясо, бобовые</span></div>`;
        } else if (totalProteinServings > 0 && junkCount === 0) {
            adviceHtml += `<div class="advice-row"><span class="advice-condition">Белок есть, но однообразный:</span><span class="advice-action">🫘 Добавьте бобовые или рыбу</span></div>`;
        }

        // Логика: Углеводы
        if (missingCarbs > 50) {
            adviceHtml += `<div class="advice-row"><span class="advice-condition">Углеводов мало:</span><span class="advice-action">🌾 Гречка, овсянка, цельнозерновой хлеб</span></div>`;
        } else if (totalCarbs > 200) {
            adviceHtml += `<div class="advice-row"><span class="advice-condition">Углеводов много:</span><span class="advice-action">🥦 Овощи вместо гарнира</span></div>`;
        }

        // Логика: Сахар и соусы
        if (junkCount >= 1) {
            adviceHtml += `<div class="advice-row"><span class="advice-condition">Был сладкий напиток/десерт:</span><span class="advice-action">💧 Вода или чай без сахара</span></div>`;
        }
        if (selectedDishes.some(d => d.groups && d.groups.includes('sauce'))) {
            adviceHtml += `<div class="advice-row"><span class="advice-condition">Много соуса и солёного:</span><span class="advice-action">🥒 Свежие овощи и зелень</span></div>`;
        }

        // Всегда добавляем базовый совет
        adviceHtml += `<div class="advice-row"><span class="advice-condition">Всегда:</span><span class="advice-action">🥗 Овощной салат и фрукты</span></div>`;

        if (adviceList) adviceList.innerHTML = adviceHtml;
    }

    // Логика для кнопки PRO (заглушка)
    window.App = window.App || {};
    App.buyPro = function () {
        if (confirm("Это демо-версия оплаты. Активировать PRO?")) {
            localStorage.setItem('app_isPro', 'true');
            updateProUI(true);
            alert("✅ PRO активирован!");
        }
    };

    function updateProUI(proStatus) {
        isPro = proStatus;
        const lock = document.getElementById('pro-lock');
        const content = document.getElementById('pro-content');
        if (isPro) {
            lock.style.display = 'none';
            content.style.display = 'block';
            renderHistory();
        } else {
            lock.style.display = 'block';
            content.style.display = 'none';
        }
    }

    function saveToHistory(dishes, greenScore) {
        const today = new Date().toISOString().split('T')[0];
        let history = JSON.parse(localStorage.getItem('app_week_history') || '{}');
        history[today] = { dishes: dishes.map(d => d.name), green: greenScore };
        localStorage.setItem('app_week_history', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('app_week_history') || '{}');
        const tracker = document.getElementById('week-tracker');
        const advice = document.getElementById('home-advice');

        let daysCount = Object.keys(history).length;
        let totalGreen = 0;

        tracker.innerHTML = `<h4>Вы посетили ресторан ${daysCount} раз(а) за неделю.</h4>`;

        for (let date in history) {
            totalGreen += history[date].green;
            tracker.innerHTML += `<div class="day-record">📅 ${date}: ${history[date].green > 20 ? '🟢' : '🔴'} (Блюд: ${history[date].dishes.length})</div>`;
        }

        if (daysCount > 0) {
            const avgGreen = Math.round(totalGreen / daysCount);
            if (avgGreen < 20) {
                advice.innerHTML = `<b>💡 Совет:</b> В среднем за визит вы не добираете овощи. В следующий раз обязательно берите морковные палочки.`;
            } else {
                advice.innerHTML = `<b>💡 Совет:</b> Вы отлично балансируете фастфуд!`;
            }
        }
    }
});