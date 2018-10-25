import {MyModalWindow} from './my-modal-window';
window.customElements.define('test-my-modal-window', MyModalWindow);

describe('MyModalWindow', () => {
    let element, root;
    beforeEach(() => {
        element = document.createElement('test-my-modal-window');
        root = element.shadowRoot;
    });

    describe(`initialization`, () => {
        it(`should have overlay and content divs`, () => {
            const overlay = root.querySelectorAll('.overlay');
            const content = root.querySelectorAll('.content');
            expect(overlay.length).toEqual(1);
            expect(content.length).toEqual(1);
        });
    });

    describe(`open`, () => {
        it(`should remove the class overlay-hidden from the overlay`, () => {
            const overlay = root.querySelector('.overlay');
            const overlayHasClassHidden = overlay.classList.contains('overlay-hidden');

            element.open();
            expect(overlayHasClassHidden).toBeTruthy();
            expect(element.classList.contains('overlay-hidden')).toBeFalsy();
        });

        it(`should add the content to the content div`, () => {
            const content = root.querySelector('.content');
            const htmlBefore = content.innerHTML;
            const config = {
                content: '<h1>Hello web component</h1>'
            };
            element.open(config);
            expect(htmlBefore).toEqual('');
            expect(content.innerHTML).toEqual(config.content);
        });
    });

    describe(`close`, () => {
        it(`should add the overlay-hidden class to the overlay`, () => {
            const overlay = root.querySelector('.overlay');
            element.open();
            element.close();
            expect(overlay.classList.contains('overlay-hidden')).toBeTruthy();
        });
    });
});