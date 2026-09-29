/* ============================================================================
   ХЕЛПЕРЫ
   ========================================================================== */
window.App = window.App || {};

App.utils = {
  escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[s]));
  },

  // Рендер группы радиокнопок
  renderRadioGroup(name, options) {
    return `
      <div class="options">
        ${options.map(opt => `
          <label>
            <input type="radio" name="${name}" value="${opt.value}" />
            <span>${App.utils.escapeHtml(opt.label)}</span>
          </label>
        `).join('')}
      </div>
    `;
  },

  // Человекочитаемый ярлык по значению
  labelOf(options, value) {
    const found = options.find(o => o.value === value);
    return found ? found.label : '—';
  }
};