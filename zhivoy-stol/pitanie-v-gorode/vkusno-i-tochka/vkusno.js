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

        selectedDishes.forEach(dish => {
            if (dish.macros) {
                totalKcal += dish.macros.kcal;
                totalP += dish.macros.p;
                totalF += dish.macros.f;
                totalC += dish.macros.c;
            }
            if (dish.servings && dish.servings.protein) totalProteinServings += dish.servings.protein;
            if (dish.junk) junkCount++;
        });

        // Расчет реального соотношения БЖУ
        let ratioText = "0 : 0 : 0";
        if (totalP > 0) {
            ratioText = `1 : ${(totalF / totalP).toFixed(1)} : ${(totalC / totalP).toFixed(1)}`;
        } else if (totalF > 0) {
            ratioText = `0 : 1 : ${(totalC / totalF).toFixed(1)}`;
        } else if (totalC > 0) {
            ratioText = `0 : 0 : 1`;
        }

        // Блок с цифрами БЖУ
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

        // Честная оценка (текст под подносом)
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