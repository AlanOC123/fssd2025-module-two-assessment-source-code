const buttonEl = () => {
    const el = document.createElement('div');
    const buttonEl = document.createElement('button');

    buttonEl.textContent = 'Open Filters';
    el.classList.add('empty-card-button-container');
    buttonEl.classList.add('empty-card-button');

    buttonEl.addEventListener('click', () => {
        const filters = document.getElementById('filters-section');
        const brands = document.getElementById('brands-section');
        filters.classList.add('expand');
        brands.classList.remove('expand');
    })

    el.append(buttonEl);
    return el;
}

const msgEl = () => {
    const el = document.createElement('div');
    const h2El = document.createElement('h2');
    const h3El = document.createElement('h3');

    h2El.textContent = 'No Cars';
    h3El.textContent = 'Click Button to Open Filters';

    el.classList.add('empty-card-message-container');

    el.append(h2El, h3El);
    return el;
}

const emptyCarCard = () => {
    const el = document.createElement('div');
    const msg = msgEl();
    const button = buttonEl();

    el.classList.add('empty-card');
    el.append(msg, button);

    return el;
}

export default emptyCarCard;
