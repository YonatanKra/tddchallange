import './my-modal-window';

document.body.appendChild(document.createElement('my-app'));
export class MyApp extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        // add the template
        this.button = document.createElement('button');
        this.button.addEventListener('click', () => {
            this.openModal();
        });
        this.button.innerText = 'Open Modal';
        this.appendChild(this.button);

        // add the modal window
        this.modalWindow = document.createElement('my-modal-window');
        this.modalWindow.addEventListener('click', () => {
            this.modalWindow.close();
        });
        document.body.appendChild(this.modalWindow);
    }

    openModal() {
        this.modalWindow.open({
            content: '<h1>Hello Modal Component</h1>'
        });
    }
}
window.customElements.define('my-app', MyApp);