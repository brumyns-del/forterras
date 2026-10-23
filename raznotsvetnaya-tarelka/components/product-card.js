/* ============================================================================
   Компонент <product-card>
   Универсальная карточка продукта для списков, тарелки и будущих страниц.
   ========================================================================== */
class ProductCard extends HTMLElement {
    // Этот метод вызывается, когда тег появляется на странице
    connectedCallback() {
        this.render();
    }

    // Этот метод вызывается, когда мы меняем атрибуты (например, active)
    static get observedAttributes() { return ['active']; }
    attributeChangedCallback() { this.render(); }

    render() {
        const name = this.getAttribute('name') || '';
        const color = this.getAttribute('color') || 'white';
        const pid = this.getAttribute('pid') || '';
        const isActive = this.hasAttribute('active');

        // Берем кружочек из нашей палитры (если вдруг палитры нет, ставим белый)
        const emoji = (window.App && App.COLOR_EMOJI && App.COLOR_EMOJI[color]) ? App.COLOR_EMOJI[color] : '⚪';

        this.innerHTML = `
      <button type="button" class="btn-food ${isActive ? 'active' : ''}" data-pid="${pid}">
        <span class="icon">${emoji}</span>
        <span>${name}</span>
      </button>
    `;
    }
}

// Регистрируем наш новый тег в браузере
customElements.define('product-card', ProductCard);