const template = `
    <style>
        :host .overlay {
            opacity: 1;
            visibility: visible;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.42);
            -webkit-transition: opacity 0.5s;
            transition: opacity 0.5s;
        }
    
        :host .overlay-hidden {
            opacity: 0;
            visibility: hidden;
            -webkit-transition: opacity 0.5s, visibility 0s 0.5s;
            transition: opacity 0.5s, visibility 0s 0.5s;
        }

    </style>
    <div class="overlay overlay-hidden">
        <div class="overlay-content"></div>
    </div>
`;

const tmpl = document.createElement('template');
tmpl.innerHTML = template;

function parseConfig(config, element) {
    if (!config || !element) {
        return;
    }
    if (config.content) {
        element.innerHTML = config.content;
    }
    if (config.backgroundColor) {
        element.style.backgroundColor = config.backgroundColor;
    } else {
        element.style.backgroundColor = '#ffffff';
    }
}
class Overlay extends HTMLElement{
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        this._overlay = shadowRoot.querySelector('.overlay');
        this._overlayContent = this._overlay.querySelector('.overlay-content');
    }

    open(config) {
        this._overlay.classList.remove('overlay-hidden');
        parseConfig(config, this._overlayContent);
    }

    close() {
        this._overlay.classList.add('overlay-hidden');
    }
}

window.customElements.define('ce-overlay', Overlay);