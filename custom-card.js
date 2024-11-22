class CustomCard extends HTMLElement {
    static get observedAttributes() {
        return ['height'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'height' && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const heightMultiplier = Math.max(1, Math.min(4, parseInt(this.getAttribute('height') || '1')));
        const cardHeight = `${heightMultiplier * 30}px`;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: calc(100% - 20px); /* Ajuste de largura */
                    margin: 10px auto;
                    height: ${cardHeight};
                    background-color: #f4f4f4;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.2s;
                }

                :host(:hover) {
                    background-color: #e0f7fa;
                    transform: scale(1.02);
                }

                .content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    font-size: 16px;
                    color: #333;
                }
            </style>
            <div class="content">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('custom-card', CustomCard);
