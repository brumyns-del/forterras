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

        // Сектора подноса
        const vegContainer = document.getElementById('tray-veg');
        const proteinContainer = document.getElementById('tray-protein');
        const carbsContainer = document.getElementById('tray-carbs');
        const drinksContainer = document.getElementById('tray-drinks');

        if (vegContainer && proteinContainer && carbsContainer) {
            vegContainer.innerHTML = '';
            proteinContainer.innerHTML = '';
            carbsContainer.innerHTML = '';
            if (drinksContainer) drinksContainer.innerHTML = '';

            // Собираем уникальные цвета по секторам
            let colorsInVeg = new Set();
            let colorsInProtein = new Set();
            let colorsInCarbs = new Set();
            let colorsInDrinks = new Set();

            selectedDishes.forEach(dish => {
                dish.colors.forEach(c => {
                    // Делаем красивые всплывающие подсказки
                    const colorName = App.BRIGHT_COLORS[c] ? App.BRIGHT_COLORS[c].label : c;
                    const tooltip = `title="${colorName}"`;
                    const emojiSpan = `<span ${tooltip}>${App.COLOR_EMOJI[c]}</span>`;

                    if (c === 'green' || c === 'red' || c === 'orange') colorsInVeg.add(emojiSpan);
                    else if (c === 'brown') colorsInProtein.add(emojiSpan);
                    else if (c === 'yellow') colorsInCarbs.add(emojiSpan);
                    else if (c === 'white') colorsInDrinks.add(emojiSpan); // Белый кружок теперь в напитках
                });
            });

            // Вставляем кружочки
            colorsInVeg.forEach(html => vegContainer.innerHTML += html);
            colorsInProtein.forEach(html => proteinContainer.innerHTML += html);
            colorsInCarbs.forEach(html => carbsContainer.innerHTML += html);
            if (drinksContainer) colorsInDrinks.forEach(html => drinksContainer.innerHTML += html);
        }

        // Текстовые подсказки
        if (selectedDishes.length === 0) {
            trayTip.innerHTML = 'Выберите блюда, чтобы получить совет по балансу.';
            trayTip.className = 'smart-tip';
            return;
        }

        if (totalGreen < 20) {
            trayTip.innerHTML = `😮 <strong>Ой, у нас перекос в желтый и коричневый!</strong><br>В заказе мало овощей. Возьмите <em>Морковные палочки</em>.<br><small>💡 <b>Совет на дом:</b> Вечером съешьте яблоко или огурец из раздела «Живой стол».</small>`;
            trayTip.className = 'smart-tip bad';
        } else if (totalGreen >= 40) {
            trayTip.innerHTML = `👍 <strong>Неплохой апгрейд!</strong><br>Такой поднос даст сытость и не вызовет скачка сахара.`;
            trayTip.className = 'smart-tip good';
        } else {
            trayTip.innerHTML = `👍 <strong>Хороший выбор!</strong><br>Салат или яблочные дольки сделают этот заказ еще полезнее.`;
            trayTip.className = 'smart-tip';
        }

        if (isPro) saveToHistory(selectedDishes, totalGreen);
    }

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