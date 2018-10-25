import './index';

const CUSTOM_ELEMENT = 'my-modal-window';
describe(`custom element registration`, () => {
    it(`should be registered`, () => {
        const elementClass = window.customElements.get(CUSTOM_ELEMENT);
        expect(elementClass).toBeTruthy();
    });
});
