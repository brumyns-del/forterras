/* ============================================================================
   ШАГ 3 — TODO: сборка меню на день
   ========================================================================== */
(function () {
  App.registerStep(3, {
    render(container) {
      container.innerHTML = `
        <div class="card">
          <h1>🍳 Шаг 3 <span class="badge">в разработке</span></h1>
          <p class="lead">Здесь появится меню на день из подобранных продуктов.</p>
          <button onclick="App.goToStep(2)">← К тарелке</button>
        </div>`;
    }
  });
})();