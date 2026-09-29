/* ============================================================================
   РОУТЕР ШАГОВ
   ----------------------------------------------------------------------------
   Каждый шаг регистрируется сам через App.registerStep(id, module).
   Навигация — App.goToStep(n). Роутер ничего не знает о внутренностях шагов.
   ========================================================================== */
window.App = window.App || {};

App.Steps = {};

App.registerStep = function (id, module) {
  if (App.Steps[id]) {
    console.warn(`[Router] Шаг ${id} уже зарегистрирован — перезаписываю.`);
  }
  App.Steps[id] = { id, ...module };
};

App.goToStep = function (n) {
  App.State.currentStep = n;
  const container = document.getElementById('app');
  const step = App.Steps[n];

  if (!step) {
    container.innerHTML = `
      <div class="card">
        <h1>Шаг ${n} <span class="badge">в разработке</span></h1>
        <p class="lead">Этот модуль ещё не подключён. Добавь файл
          <code>steps/step${n}.js</code> и строку
          <code>&lt;script src="steps/step${n}.js"&gt;&lt;/script&gt;</code>
          в index.html.</p>
        <button onclick="App.goToStep(${n - 1})">← Назад</button>
      </div>`;
    console.warn(`[Router] Шаг ${n} не найден.`);
    return;
  }

  if (!App.State.completedSteps.includes(n)) {
    App.State.completedSteps.push(n);
  }
  step.render(container);
  console.log(`[Router] → Шаг ${n}`, App.State);
};