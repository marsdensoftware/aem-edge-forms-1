const getLocalTheme = () => {
    const theme = window.localStorage.getItem('theme');
    if (!theme)
        return null;
    return theme;
};
function decorate(block) {
    const innerContainer = document.createElement('div');
    innerContainer.classList.add('seno-form__inner');
    const title = document.createElement('h2');
    title.className = 'seno-form__title';
    title.innerText = 'Local storage';
    const pickedColour = document.createElement('p');
    const colour = window.localStorage.getItem('theme')
        ? `Your selected theme is ${window.localStorage.getItem('theme')}`
        : 'Please select a colour';
    pickedColour.innerText = colour;
    const button1 = document.createElement('button');
    button1.className = 'seno-form__button-one';
    button1.innerText = 'Red';
    const button2 = document.createElement('button');
    button2.className = 'seno-form__button-two';
    button2.innerText = 'Blue';
    button1.addEventListener('click', () => {
        window.localStorage.setItem('theme', 'red');
        window.location.reload();
    });
    button2.addEventListener('click', () => {
        window.localStorage.setItem('theme', 'blue');
        window.location.reload();
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => {
        if (!getLocalTheme())
            return;
        window.localStorage.removeItem('theme');
        window.location.reload();
    });
    /*
        Persist search filter
    */
    const title2 = document.createElement('h2');
    title2.className = 'seno-form__title2';
    title2.innerText = 'Persist search filter';
    // FORM
    const radioOpt1 = document.createElement('input');
    const radioOpt1Label = document.createElement('label');
    const radioOpt2 = document.createElement('input');
    const radioOpt2Label = document.createElement('label');
    radioOpt1Label.innerText = 'Red';
    radioOpt2Label.innerText = 'Blue';
    radioOpt1Label.setAttribute('for', 'red');
    radioOpt2Label.setAttribute('for', 'blue');
    radioOpt1.setAttribute('id', 'red');
    radioOpt1.setAttribute('name', 'theme');
    radioOpt1.setAttribute('type', 'radio');
    radioOpt1.setAttribute('value', 'red');
    radioOpt2.setAttribute('id', 'blue');
    radioOpt2.setAttribute('name', 'theme');
    radioOpt2.setAttribute('type', 'radio');
    radioOpt2.setAttribute('value', 'blue');
    radioOpt1.className = 'seno-form__radio1';
    radioOpt2.className = 'seno-form__radio2';
    radioOpt1Label.className = 'seno-form__label1';
    radioOpt2Label.className = 'seno-form__label2';
    const form = document.createElement('form');
    form.append(radioOpt1Label, radioOpt1, radioOpt2Label, radioOpt2);
    // Get URL
    const url = new URL(window.location.href);
    form.addEventListener('change', () => {
        // Get value from form
        const radio = form.elements;
        const { value } = radio.namedItem('theme');
        // Set search param
        url.searchParams.set('theme', `${value}`);
        // Added in history
        window.history.pushState({}, '', url.href);
        // Set in localstorage
        window.localStorage.setItem('theme', value);
    });
    innerContainer.append(title, pickedColour, button1, button2, deleteBtn, title2, form);
    block.append(innerContainer);
}
export default decorate;
