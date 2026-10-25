console.log("--- 1. Скрипт запустился! ---");

async function fetchData() {
    console.log("--- 2. Начинаем отправлять запрос в базу данных... ---");

    const url = "https://world.openfoodfacts.org/api/v2/search?categories_tags=en:sprouts&page_size=5";

    try {
        // Добавляем таймер: если сервер не ответит за 10 секунд, мы прервем попытку
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        console.log("--- 3. Сервер ответил! Код ответа: " + response.status + " ---");

        const data = await response.json();
        console.log("--- 4. Данные расшифрованы! Количество продуктов: " + data.products.length + " ---");

        data.products.forEach((p, index) => {
            console.log(`${index + 1}. ${p.product_name_ru || p.product_name}`);
        });

    } catch (error) {
        console.log("--- ОШИБКА! ---");
        if (error.name === 'AbortError') {
            console.log("Превышено время ожидания (10 сек). База данных не отвечает (возможно, проблемы с интернетом или блокировка).");
        } else {
            console.log("Текст ошибки:", error.message);
        }
    }
}

fetchData();