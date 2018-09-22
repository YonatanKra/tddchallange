import {Overlay} from './index';

describe('app integration tests', () => {
    let element;
    beforeEach(() => {
        element = document.createElement('ce-overlay');
    });

    // check that the exposed API works
    describe('init', () => {
        it('should add a div with the overlay and overlay-hidden classes under the shadow root', () => {
            expect(element.shadowRoot.querySelector('.overlay.overlay-hidden')).toBeTruthy();
        });
    });

    describe('open', () => {
        it('should remove the overlay-hidden class', () => {
            const overlay = element.shadowRoot.querySelector('.overlay.overlay-hidden');
            const isHidden = overlay.classList.contains('overlay-hidden');
            element.open();
            const isHiddenAfterOpen = overlay.classList.contains('overlay-hidden');
            expect(isHidden).toBeTruthy();
            expect(isHiddenAfterOpen).toBeFalsy();
        });

        it('should add the content set in the content property', () => {
            const randomId = new Date().getTime().toString();
            const config = {
                content: `<div id="${randomId}">Test content</div>`
            };
            element.open(config);
            expect(element.shadowRoot.getElementById(randomId)).toBeTruthy();
        });
    });

    describe('close', () => {
        it('should reinstate the overlay-hidden class on the overlay element', () => {
            element.open();
            const overlay = element.shadowRoot.querySelector('.overlay');
            const isHidden = overlay.classList.contains('overlay-hidden');
            element.close();
            const isHiddenAfter = overlay.classList.contains('overlay-hidden');
            expect(isHidden).toBeFalsy();
            expect(isHiddenAfter).toBeTruthy();
        });
    });
});