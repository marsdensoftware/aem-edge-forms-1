function decorate(block: Element) {
    const firstChildEl = document.createElement('div')
    firstChildEl.classList.add('seno-form__inner')
    block.append(firstChildEl)
}

export default decorate
