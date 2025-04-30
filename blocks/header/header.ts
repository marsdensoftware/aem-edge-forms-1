import { getMetadata } from '../../scripts/aem.js'
import { loadFragment } from '../fragment/fragment.js'

async function decorate() {
    // load nav as fragment

    // Get the path to the AEM page fragment
    // that defines the header content from the <meta name="nav"> tag.
    // This is set via the site's Metadata file.
    const navMeta = getMetadata('nav')

    // If the navMeta is not defined, use the default path `/nav`.
    const navPath = navMeta
        ? new URL(navMeta, window.location.hostname).pathname
        : '/nav'

    // Make an XHR (AJAX) call to request the AEM page fragment and serialize it to a HTML DOM tree.
    await loadFragment(navPath)
}

export default decorate
