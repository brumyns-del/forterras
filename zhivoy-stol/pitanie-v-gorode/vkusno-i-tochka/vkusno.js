document.addEventListener('DOMContentLoaded', () => {
    let isPro = localStorage.getItem('app_isPro') === 'true';
    updateProUI(isPro);

    // Проверка, загрузилась ли база данных
    if (!window.App || !App.DB || !App.DB.Places || !App.DB.Places.vkusno) {
        console.error("Ошибка: База данных App.DB не загружена. Проверьте путь к products-db.js");
        return;
    }

    const vkusnoMenu = App.DB.Places.vkusno.menu;
    let selectedDishes = [];

    // Отрисовка меню
    vkusnoMenu.forEach(dish => {
        const btn = document.createElement('button');
        btn.className = 'menu-btn';
        const colorEmojis = dish.colors.map(c => App.COLOR_EMOJI[c] || '⚪').join('');
        btn.innerHTML = `<span>${colorEmojis}</span> ${dish.name}`;
        btn.addEventListener('click', () => toggleDish(dish, btn));

        const catContainer = document.getElementById(`cat-${dish.category}`);
        if (catContainer) catContainer.appendChild(btn);
    });

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

    function updateTray() {
        const totalGreen = selectedDishes.reduce((sum, dish) => sum + dish.green, 0);
        const trayTip = document.getElementById('smart-tip');

        // Считаем БЖУ, порции и красители
        let totalKcal = 0, totalP = 0, totalF = 0, totalC = 0;
        let totalProteinServings = 0;
        let junkCount = 0;
        let dyeCount = 0;

        selectedDishes.forEach(dish => {
            if (dish.macros) {
                totalKcal += dish.macros.kcal;
                totalP += dish.macros.p;
                totalF += dish.macros.f;
                totalC += dish.macros.c;
            }
            if (dish.servings && dish.servings.protein) totalProteinServings += dish.servings.protein;
            if (dish.junk) junkCount++;
            if (dish.dye) dyeCount++;
        });

        // Считаем реальное соотношение БЖУ
        let ratioText = "0 : 0 : 0";
        if (totalP > 0) {
            ratioText = `1 : ${(totalF / totalP).toFixed(1)} : ${(totalC / totalP).toFixed(1)}`;
        } else if (totalF > 0) {
            ratioText = `0 : 1 : ${(totalC / totalF).toFixed(1)}`;
        } else if (totalC > 0) {
            ratioText = `0 : 0 : 1`;
        }

        // Отображение БЖУ (если включена галочка)
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
                    <div style="margin-top: 10px; font-size: 0.75rem; color: #666; text-align: center;">
                        В пересчете на калорийность: белки 10–35%, жиры 20–35%, углеводы 45–65%.
                        <a href="#" target="_blank" style="color: #4a7c59; text-decoration: underline;">Читать подробную статью о нормах БЖУ</a>
                        <br><a href="#" class="btn-buy" style="text-decoration: none; display: inline-block; padding: 6px 12px; font-size: 0.75rem; margin-top: 5px;">Рассчитать индивидуальные нормы (PRO)</a>
                    </div>
                </div>
            `;
        } else if (macrosDisplay) {
            macrosDisplay.style.display = 'none';
        }
        // Отображение предупреждения о красителях
        const dyeWarning = document.getElementById('dye-warning');
        if (dyeWarning) {
            dyeWarning.style.display = (dyeCount > 0) ? 'block' : 'none';
        }

        // Честная оценка
        if (selectedDishes.length === 0) {
            trayTip.innerHTML = 'Выберите блюда, чтобы получить совет по балансу.';
            trayTip.className = 'smart-tip';
            return;
        }

        const plateLink = `<br><small>💡 <b>Совет на дом:</b> Вечером соберите <a href="../../../raznotsvetnaya-tarelka/index.html" style="color: #d84315; font-weight: bold;">«Разноцветную тарелку»</a>, чтобы добрать клетчатку.</small>`;

        if (junkCount >= 2) {
            trayTip.innerHTML = `⚠️ <strong>Внимание: избыток сахара.</strong><br>В заказе ${junkCount} десерта/сладких напитка. Это даст быстрый скачок энергии, но через час вы снова захотите есть.<br><small>💡 <b>Совет:</b> Оставьте один десерт, а остальное замените на воду.</small>${plateLink}`;
            trayTip.className = 'smart-tip bad';
        } else if (totalProteinServings < 1) {
            trayTip.innerHTML = `⚠️ <strong>В заказе мало белка.</strong><br>Без белка (мяса, рыбы, яиц) вы быстро проголодаетесь. Добавьте бургер или наггетсы.${plateLink}`;
            trayTip.className = 'smart-tip bad';
        } else if (totalGreen === 0) {
            trayTip.innerHTML = `<strong>В заказе нет овощей.</strong><br>Это фастфуд, но можно сделать его сбалансированнее. Добавьте <em>Морковные палочки</em> или <em>Салат Цезарь</em>.${plateLink}`;
            trayTip.className = 'smart-tip';
        } else if (totalGreen > 0 && totalGreen < 20) {
            trayTip.innerHTML = `<strong>В заказе очень мало овощей.</strong><br>Зеленый кружок есть, но клетчатки недостаточно. Добавьте <em>Салат овощной</em> или <em>Морковные палочки</em>.${plateLink}`;
            trayTip.className = 'smart-tip';
        } else {
            trayTip.innerHTML = `<strong>Неплохой выбор для фастфуда.</strong><br>Вы набрали белок и достаточно клетчатки. Но помните, что это все равно высококалорийная еда.${plateLink}`;
            trayTip.className = 'smart-tip';
        }

        // Отрисовка кружочков (без drinksContainer)
        const vegContainer = document.getElementById('tray-veg');
        const proteinContainer = document.getElementById('tray-protein');
        const carbsContainer = document.getElementById('tray-carbs');

        if (vegContainer && proteinContainer && carbsContainer) {
            vegContainer.innerHTML = '';
            proteinContainer.innerHTML = '';
            carbsContainer.innerHTML = '';

            let colorsInVeg = new Set();
            let colorsInProtein = new Set();
            let colorsInCarbs = new Set();

            selectedDishes.forEach(dish => {
                dish.colors.forEach(c => {
                    const colorName = App.BRIGHT_COLORS[c] ? App.BRIGHT_COLORS[c].label : c;
                    const tooltip = `title="${colorName}"`;
                    const emojiSpan = `<span ${tooltip}>${App.COLOR_EMOJI[c]}</span>`;

                    if (c === 'green' || c === 'red' || c === 'orange') colorsInVeg.add(emojiSpan);
                    else if (c === 'brown') colorsInProtein.add(emojiSpan);
                    else if (c === 'yellow') colorsInCarbs.add(emojiSpan);
                });
            });

            colorsInVeg.forEach(html => vegContainer.innerHTML += html);
            colorsInProtein.forEach(html => proteinContainer.innerHTML += html);
            colorsInCarbs.forEach(html => carbsContainer.innerHTML += html);
        }

        if (isPro) saveToHistory(selectedDishes, totalGreen);
    }

    // --- ЛОГИКА PRO ---
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