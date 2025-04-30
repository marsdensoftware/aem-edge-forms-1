var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
function decorate() {
    return __awaiter(this, void 0, void 0, function* () {
        // load nav as fragment
        // Get the path to the AEM page fragment
        // that defines the header content from the <meta name="nav"> tag.
        // This is set via the site's Metadata file.
        const navMeta = getMetadata('nav');
        // If the navMeta is not defined, use the default path `/nav`.
        const navPath = navMeta
            ? new URL(navMeta, window.location.hostname).pathname
            : '/nav';
        // Make an XHR (AJAX) call to request the AEM page fragment and serialize it to a HTML DOM tree.
        yield loadFragment(navPath);
    });
}
export default decorate;
