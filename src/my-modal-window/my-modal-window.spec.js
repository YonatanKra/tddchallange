import {MyModalWindow} from './my-modal-window';

window.customElements.define('test-my-modal-window', MyModalWindow);

function getCSSBackgroundColor(colorString) {
    const image = document.createElement("img");
    image.style.backgroundColor = colorString;
    document.body.appendChild(image);
    const imageColor = getComputedStyle(image).backgroundColor;
    document.body.removeChild(image);
    return imageColor;
}

describe('MyModalWindow', () => {
    let element, root;
    beforeEach(() => {
        element = document.createElement('test-my-modal-window');
        root = element.shadowRoot;
        document.body.appendChild(element);
    });

    describe(`initialization`, () => {
        it(`should have overlay and content divs`, () => {
            const overlay = root.querySelectorAll('.overlay');
            const content = root.querySelectorAll('.content');
            expect(overlay.length).toEqual(1);
            expect(content.length).toEqual(1);
        });

        it(`should have white background for the content`, () => {
            const content = root.querySelector('.content');
            const imageColor = getCSSBackgroundColor("white");
            expect(getComputedStyle(content).backgroundColor).toEqual(imageColor);
        });

        it(`should set the modal in the center of its parent`, () => {
            const config = {
                dimensions: {
                    height: Math.floor(Math.random() * 100 + 50),
                    width: Math.floor(Math.random() * 100 + 50)
                }
            };
            const content = root.querySelector('.content');
            const contentDims = content.getBoundingClientRect();
            const parentDims = content.parentNode.getBoundingClientRect();

            const y1 = contentDims.y - parentDims.y;
            const y2 = -y1 + parentDims.height - contentDims.height;

            const x1 = contentDims.x - parentDims.x;
            const x2 = -x1 + parentDims.width - contentDims.width;

            expect(y1).toEqual(y2);
            expect(x1).toEqual(x2);
            expect(x1 + x2 + contentDims.width).toEqual(parentDims.width);
            expect(y1 + y2 + contentDims.height).toEqual(parentDims.height);
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

        it(`should set the content backgorund according to the background color property`, () => {
            const content = root.querySelector('.content');
            const config = {
                content: 'test',
                backgroundColor: 'blue'
            };
            element.open(config);
            expect(getComputedStyle(content).backgroundColor).toEqual(getCSSBackgroundColor("blue"));
        });

        it(`should set the height and width according to config dimensions`, () => {
            const content = root.querySelector('.content');
            const config = {
                content: 'test',
                dimensions: {
                    height: 250,
                    width: 300
                }
            };
            element.open(config);
            const boundingRect = content.getBoundingClientRect();
            expect(boundingRect.width).toEqual(config.dimensions.width);
            expect(boundingRect.height).toEqual(config.dimensions.height);

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

    afterEach(() => {
        document.body.removeChild(element);
    });
});