const fs = require('fs');
const pdf = require('pdf-parse');

// Функция автоматического определения категории, красителей, жиров и влияния на тарелку
function enrichDishData(dish) {
  const nameLower = dish.name.toLowerCase();
  
  // 1. Определяем категорию
  let category = "burgers_rolls";
  if (nameLower.includes("картофель") || nameLower.includes("стрипсы") || nameLower.includes("наггетс") || nameLower.includes("крылышки") || nameLower.includes("креветки")) {
    category = nameLower.includes("картофель") ? "snacks_fries" : "chicken_seafood";
  } else if (nameLower.includes("салат") || nameLower.includes("морковн") || nameLower.includes("яблочн")) {
    category = "salads_veggies";
  } else if (nameLower.includes("соус") || nameLower.includes("кетчуп")) {
    category = "sauces";
  } else if (nameLower.includes("айс") || nameLower.includes("пирожок") || nameLower.includes("маффин") || nameLower.includes("чизкейк") || nameLower.includes("мороженое")) {
    category = "desserts";
  } else if (nameLower.includes("добрый") || nameLower.includes("лимонад") || nameLower.includes("сок") || nameLower.includes("вода") || nameLower.includes("коктейль")) {
    category = "cold_drinks";
  } else if (nameLower.includes("кофе") || nameLower.includes("капучино") || nameLower.includes("латте") || nameLower.includes("американо") || nameLower.includes("чай") || nameLower.includes("пунш")) {
    category = "hot_drinks";
  } else if (nameLower.includes("омлет") || nameLower.includes("каша") || nameLower.includes("блин") || nameLower.includes("маффин") && nameLower.includes("яйц")) {
    category = "breakfast";
  }

  // 2. Автоматические правила для ЖИРОВ (fatProfiles)
  const fatProfiles = [];
  if (dish.nutrition.satFat >= 7 || nameLower.includes("сыр") || nameLower.includes("чиз") || nameLower.includes("айс") || nameLower.includes("коктейль")) {
    fatProfiles.push("saturated_high");
  }
  if (category === "snacks_fries" || category === "chicken_seafood" || nameLower.includes("фиш") || nameLower.includes("пирожок")) {
    fatProfiles.push("deep_fried_omega6");
  }
  if (category === "sauces" && !nameLower.includes("кетчуп") && !nameLower.includes("кисло-сладкий") && !nameLower.includes("оливков")) {
    fatProfiles.push("mayo_sauce_omega6");
  }
  if (nameLower.includes("оливков")) {
    fatProfiles.push("healthy_fats");
  }
  if (fatProfiles.length === 0 && dish.nutrition.f < 4) {
    fatProfiles.push("low_fat");
  }

  // 3. Автоматические правила для КРАСИТЕЛЕЙ (colorants)
  const colorants = [];
  if (nameLower.includes("кола") || nameLower.includes("барбекю") || nameLower.includes("терияки") || nameLower.includes("карамел")) {
    colorants.push("E150d"); // Сахарный колер IV
  }
  if (nameLower.includes("чиз") || nameLower.includes("сыр") || nameLower.includes("биг") || nameLower.includes("гранд")) {
    colorants.push("E160b"); // Экстракт аннато (сыр Чеддер)
  }
  if (category === "chicken_seafood" || nameLower.includes("соус") || nameLower.includes("гриль")) {
    colorants.push("E160c"); // Экстракт паприки
  }
  if (nameLower.includes("ягод") || nameLower.includes("вишн") || nameLower.includes("клубнич") || nameLower.includes("пунш")) {
    colorants.push("E120"); // Кармин / антоцианы
  }
  if (colorants.length === 0) {
    colorants.push("none");
  }

  // 4. Расчет влияния на домашнюю тарелку (plate)
  let plate = { veggie: 0.0, protein: 0.0, carbs: 0.0, colors: [] };
  if (category === "salads_veggies") {
    plate.veggie = 0.45;
    if (nameLower.includes("морков")) plate.colors.push("orange");
    if (nameLower.includes("яблоч")) plate.colors.push("green");
    if (nameLower.includes("салат")) plate.colors.push("green", "red");
  } else {
    // Примерный расчет закрытия секторов на основе БЖУ (норма условного приема пищи: ~35г белка, ~50г углеводов)
    plate.protein = Math.min(1.0, Number((dish.nutrition.p / 45).toFixed(2)));
    plate.carbs = Math.min(1.0, Number((dish.nutrition.c / 65).toFixed(2)));
    if (category === "burgers_rolls") plate.veggie = 0.1;
  }

  // 5. Генерация базового лайфхака для киоска
  let kioskHack = "Хороший выбор в рамках дневного баланса.";
  if (colorants.includes("E150d") && category === "cold_drinks") {
    kioskHack = "Замените на версию «Без сахара» или питьевую воду, чтобы избежать красителя E150d и лишнего сахара.";
  } else if (fatProfiles.includes("saturated_high") && category === "burgers_rolls") {
    kioskHack = "В киоске можно убрать ломтик сыра или половину соуса — это снизит насыщенные жиры.";
  } else if (fatProfiles.includes("deep_fried_omega6")) {
    kioskHack = "Блюдо приготовлено во фритюре. Дома добавьте на ужин Омега-3 (рыбу, льняное масло или грецкие орехи).";
  }

  return {
    ...dish,
    category,
    fatProfiles,
    colorants,
    kioskHack,
    plate
  };
}

async function parseVkusnoPDF() {
  try {
    const dataBuffer = fs.readFileSync('sostav.pdf');
    const data = await pdf(dataBuffer);
    
    // Разбиваем весь извлеченный текст на строки
    const lines = data.text.split('\n').map(line => line.trim()).filter(Boolean);
    
    const parsedMenu = [];
    let idCounter = 1;

    // Регулярное выражение для поиска строк с цифрами БЖУ
    // В таблицах сети обычно идут подряд: Вес(г) | кДж | ккал | Белки | Жиры | НЖК | Углеводы | Сахара | Соль
    // Ищем строки, где есть минимум 6 чисел (через пробел, с точкой или запятой)
    const numbersRegex = /(\d+(?:[.,]\d+)?)\s+(\d+(?:[.,]\d+)?)\s+(\d+(?:[.,]\d+)?)\s+(\d+(?:[.,]\d+)?)\s+(\d+(?:[.,]\d+)?)\s+(\d+(?:[.,]\d+)?)/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(numbersRegex);

      if (match) {
        // Пытаемся достать название блюда (обычно оно в начале этой же строки до цифр или на 1-2 строки выше)
        let dishName = line.substring(0, match.index).trim();
        if (dishName.length < 3 && i > 0) {
          dishName = lines[i - 1];
        }

        // Очищаем название от лишних символов
        dishName = dishName.replace(/^[•\-\d.)\s]+/, '').trim();

        // Пропускаем заголовки таблиц и мусорные строки
        if (dishName.length < 3 || dishName.toLowerCase().includes("пищевая ценность") || dishName.toLowerCase().includes("на порцию")) {
          continue;
        }

        // Извлекаем все числа из найденного блока (заменяя запятые на точки)
        const nums = line.substring(match.index)
          .match(/\d+(?:[.,]\d+)?/g)
          .map(n => parseFloat(n.replace(',', '.')));

        // Стандартный порядок столбцов в таблице «Вкусно — и точка» (на порцию):
        // [0] Вес (г), [1] кДж, [2] ккал, [3] Белки, [4] Жиры, [5] Насыщ. жиры, [6] Углеводы, [7] Сахара, [8] Соль
        if (nums.length >= 8) {
          const rawDish = {
            id: `item_${idCounter++}`,
            name: dishName,
            weight: nums[0] || 0,
            nutrition: {
              kcal: nums[2] || 0,
              p: nums[3] || 0,
              f: nums[4] || 0,
              satFat: nums[5] || 0,
              c: nums[6] || 0,
              sugar: nums[7] || 0,
              salt: nums[8] || 0
            },
            allergens: [] // При желании можно допарсить из соседних колонок
          };

          // Обогащаем блюдо правилами жиров, красителей и тарелки
          const enrichedDish = enrichDishData(rawDish);
          parsedMenu.push(enrichedDish);
        }
      }
    }

    // Сохраняем итоговый JSON
    fs.writeFileSync('vkusnoMenu.json', JSON.stringify(parsedMenu, null, 2), 'utf-8');
    console.log(`✅ Успешно обработано блюд: ${parsedMenu.length}`);
    console.log(`📁 Результат сохранен в файл vkusnoMenu.json`);

  } catch (error) {
    console.error("❌ Ошибка при чтении PDF:", error.message);
  }
}

parseVkusnoPDF();
