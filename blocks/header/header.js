import { getMetadata } from '../../scripts/aem.js'
import { loadFragment } from '../fragment/fragment.js'

export default async function decorate(block) {
    // load nav as fragment
    const navMeta = getMetadata('nav')
    const navPath = navMeta
        ? new URL(navMeta, window.location).pathname
        : '/nav'
    const fragment = await loadFragment(navPath)

    block.textContent = ''
    const nav = document.createElement('nav')
    nav.id = 'nav'
    while (fragment.firstElementChild) nav.append(fragment.firstElementChild)
    block.append(nav)
}
