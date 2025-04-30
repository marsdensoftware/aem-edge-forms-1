/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { decorateMain } from '../../scripts/scripts.js';
import { loadSections } from '../../scripts/aem.js';
/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export function loadFragment(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (path && path.startsWith('/')) {
            // eslint-disable-next-line no-param-reassign
            path = path.replace(/(\.plain)?\.html/, '');
            const resp = yield fetch(`${path}.plain.html`);
            if (resp.ok) {
                const main = document.createElement('main');
                main.innerHTML = yield resp.text();
                // reset base path for media to fragment base
                const resetAttributeBase = (tag, attr) => {
                    main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
                        elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location.href)).href;
                    });
                };
                resetAttributeBase('img', 'src');
                resetAttributeBase('source', 'srcset');
                decorateMain(main);
                yield loadSections(main);
                return main;
            }
        }
        return null;
    });
}
export default function decorate(block) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const link = block.querySelector('a');
        const path = link ? link.getAttribute('href') : (_a = block.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        if (!path)
            return;
        const fragment = yield loadFragment(path);
        if (fragment) {
            const fragmentSection = fragment.querySelector(':scope .section');
            if (fragmentSection) {
                block.classList.add(...fragmentSection.classList);
                block.classList.remove('section');
                block.replaceChildren(...fragmentSection.childNodes);
            }
        }
    });
}
