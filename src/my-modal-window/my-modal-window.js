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
            display: flex;
            align-items: center; 
            justify-content: center;
        }
    
        :host .overlay-hidden {
            opacity: 0;
            visibility: hidden;
            -webkit-transition: opacity 0.5s, visibility 0s 0.5s;
            transition: opacity 0.5s, visibility 0s 0.5s;
        }
        
        .content {
            background-color: white;
        }
    </style>
    <div class="overlay overlay-hidden">
        <div class="content"></div>
    </div>
    
`;
export class MyModalWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
        this._overlay = this.shadowRoot.querySelector('.overlay');
        this._content = this.shadowRoot.querySelector('.content');
    }

    open(config) {
        this._overlay.classList.remove('overlay-hidden');
        if (!config) {
            return;
        }
        this._content.innerHTML = config.content;
    }

    close() {
        this._overlay.classList.add('overlay-hidden');
    }
}