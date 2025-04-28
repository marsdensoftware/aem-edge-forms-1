function decorate(block: Element) {
    const innerContainer = document.createElement('div')
    innerContainer.classList.add('seno-form__inner')

    const pickedColour = document.createElement('p')
    const colour =
        window.localStorage.getItem('theme') ?? 'no colour yet selected'
    pickedColour.innerText = colour

    const button1 = document.createElement('button')
    button1.className = 'seno-form__button-one'
    button1.innerText = 'Red'

    const button2 = document.createElement('button')
    button2.className = 'seno-form__button-two'
    button2.innerText = 'Blue'

    button1.addEventListener('click', () => {
        window.localStorage.setItem('theme', 'Red')
    })

    button2.addEventListener('click', () => {
        window.localStorage.setItem('theme', 'Blue')
    })

    innerContainer.append(pickedColour, button1, button2)
    block.append(innerContainer)
}

export default decorate
