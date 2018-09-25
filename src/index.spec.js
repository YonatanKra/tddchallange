import {Overlay} from './index';


describe('app integration tests', () => {
    function commonOpenModal(config) {
        const randomId = new Date().getTime().toString();
        let commonConfig = {
            content: `<div id="${randomId}">Test content</div>`
        };
        if (config) {
            Object.assign(commonConfig, config);
        }
        element.open(commonConfig);
        return element.shadowRoot.getElementById(randomId);
    }
    let element;
    beforeEach(() => {
        element = document.createElement('ce-overlay');
        document.body.append(element);
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
            const content = commonOpenModal();
            expect(content).toBeTruthy();
        });

        it('should set background according to the config', () => {
            function getRandomColor() {
                const letters = '123456789abcdef';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 15)];
                }
                return color;
            }
            let content = commonOpenModal();
            let rgb = content.parentNode.style.backgroundColor;
            const defaultBackgroundColor = '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');

            const config = {backgroundColor: getRandomColor()};
            content = commonOpenModal(config);
            rgb = content.parentNode.style.backgroundColor;
            const backgroundColor = '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');

            expect(backgroundColor).toEqual(config.backgroundColor);
            expect(defaultBackgroundColor).toEqual('#ffffff');
        });

        it('should set height and width according to config', () => {
            const randomId = new Date().getTime().toString();
            const config = {
                content: `<div id="${randomId}">Test content</div>`,
                height: Math.floor(Math.random() * 100 + 50),
                width: Math.floor(Math.random() * 100 + 50)
            };
            const content = commonOpenModal(config);
            const parentDims = content.parentNode.getBoundingClientRect();

            expect(parentDims.width).toEqual(config.width);
            expect(parentDims.height).toEqual(config.height);
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

    afterEach(() => {
        document.body.removeChild(element);
    });
});