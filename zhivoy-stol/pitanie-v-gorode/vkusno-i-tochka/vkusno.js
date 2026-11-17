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

        // Считаем БЖУ и порции
        let totalKcal = 0, totalP = 0, totalF = 0, totalC = 0;
        let totalProteinServings = 0;
        let totalCarbServings = 0;
        let totalVeggieServings = 0;
        let junkCount = 0;

        selectedDishes.forEach(dish => {
            if (dish.macros) {
                totalKcal += dish.macros.kcal;
                totalP += dish.macros.p;
                totalF += dish.macros.f;
                totalC += dish.macros.c;
            }
            if (dish.servings) {
                if (dish.servings.protein) totalProteinServings += dish.servings.protein;
                if (dish.servings.carbs) totalCarbServings += dish.servings.carbs;
                if (dish.servings.veggies) totalVeggieServings += dish.servings.veggies;
            }
            if (dish.junk) junkCount++;
        });

        // Отображение БЖУ (если включена галочка)
        const macrosDisplay = document.getElementById('macros-display');
        const showMacrosCheckbox = document.getElementById('show-macros');
        if (showMacrosCheckbox && showMacrosCheckbox.checked && macrosDisplay) {
            macrosDisplay.style.display = 'block';
            macrosDisplay.innerHTML = `<b>Итого по чеку:</b><br>
                Калории: ${totalKcal} ккал<br>
                Белки: ${totalP}г | Жиры: ${totalF}г | Углеводы: ${totalC}г<br>
                <i>Порции: Белок (${totalProteinServings}), Углеводы (${totalCarbServings}), Овощи (${totalVeggieServings})</i>`;
        } else if (macrosDisplay) {
            macrosDisplay.style.display = 'none';
        }

        // Отрисовка кружочков на подносе
        const vegContainer = document.getElementById('tray-veg');
        const proteinContainer = document.getElementById('tray-protein');
        const carbsContainer = document.getElementById('tray-carbs');
        const drinksContainer = document.getElementById('tray-drinks');

        if (vegContainer && proteinContainer && carbsContainer) {
            vegContainer.innerHTML = '';
            proteinContainer.innerHTML = '';
            carbsContainer.innerHTML = '';
            if (drinksContainer) drinksContainer.innerHTML = '';

            let colorsInVeg = new Set();
            let colorsInProtein = new Set();
            let colorsInCarbs = new Set();
            let colorsInDrinks = new Set();

            selectedDishes.forEach(dish => {
                dish.colors.forEach(c => {
                    const colorName = App.BRIGHT_COLORS[c] ? App.BRIGHT_COLORS[c].label : c;
                    const tooltip = `title="${colorName}"`;
                    const emojiSpan = `<span ${tooltip}>${App.COLOR_EMOJI[c]}</span>`;

                    if (c === 'green' || c === 'red' || c === 'orange') colorsInVeg.add(emojiSpan);
                    else if (c === 'brown') colorsInProtein.add(emojiSpan);
                    else if (c === 'yellow') colorsInCarbs.add(emojiSpan);
                    else if (c === 'white') colorsInDrinks.add(emojiSpan);
                });
            });

            colorsInVeg.forEach(html => vegContainer.innerHTML += html);
            colorsInProtein.forEach(html => proteinContainer.innerHTML += html);
            colorsInCarbs.forEach(html => carbsContainer.innerHTML += html);
            if (drinksContainer) colorsInDrinks.forEach(html => drinksContainer.innerHTML += html);
        }

        // Честная оценка
        if (selectedDishes.length === 0) {
            trayTip.innerHTML = 'Выберите блюда, чтобы получить совет по балансу.';
            trayTip.className = 'smart-tip';
            return;
        }

        if (junkCount >= 2) {
            trayTip.innerHTML = `⚠️ <strong>Внимание: избыток сахара.</strong><br>В заказе ${junkCount} десерта/сладких напитка. Это даст быстрый скачок энергии, но через час вы снова захотите есть.<br><small>💡 <b>Совет:</b> Оставьте один десерт, а остальное замените на воду.</small>`;
            trayTip.className = 'smart-tip bad';
        } else if (totalProteinServings < 1) {
            trayTip.innerHTML = `⚠️ <strong>В заказе мало белка.</strong><br>Без белка (мяса, рыбы, яиц) вы быстро проголодаетесь. Добавьте бургер или наггетсы.`;
            trayTip.className = 'smart-tip bad';
        } else if (totalVeggieServings < 1) {
            trayTip.innerHTML = `🟡 <strong>Это фастфуд, но можно сделать его сбалансированнее.</strong><br>В заказе есть белок, но мало овощей. Добавьте <em>Морковные палочки</em> или <em>Салат Цезарь</em>.<br><small>💡 <b>Совет на дом:</b> Вечером соберите <a href="../../../raznotsvetnaya-tarelka/index.html" style="color: #d84315; font-weight: bold;">«Разноцветную тарелку»</a>, чтобы добрать клетчатку.</small>`;
            trayTip.className = 'smart-tip';
        } else {
            trayTip.innerHTML = `🟡 <strong>Неплохой выбор для фастфуда.</strong><br>Вы набрали белок и немного клетчатки. Но помните, что это все равно высококалорийная еда.`;
            trayTip.className = 'smart-tip';
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