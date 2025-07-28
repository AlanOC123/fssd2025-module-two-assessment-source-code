import viewPageScript from '../viewCar/script.js';
import pageRouter from '../../pageRouter.js';

const buttonEl = (car, background) => {
    const el = document.createElement('div');
    const button = document.createElement('button');

    el.classList.add('car-button-container');
    button.textContent = 'Explore';
    button.style.background = background;

    el.append(button);

    button.addEventListener('click', () => {
        const { viewManager } = viewPageScript;
        viewManager.setCurr(car);
        pageRouter.loadPage('view-car');
    })
    return el
}

const imgEl = (imgPath) => {
    const el = document.createElement('div');
    const img = document.createElement('img');

    el.classList.add('car-image-container');
    img.src = imgPath;

    el.append(img);
    return el
}

const nameEl = (name) => {
    const el = document.createElement('div');
    const p = document.createElement('p');

    el.classList.add('car-name-container');
    p.textContent = name;

    el.append(p);
    return el
}

const carCard = (car, name, coverPath, background) => {
    const el = document.createElement('div');
    const carName = nameEl(name);
    const carImg = imgEl(coverPath);
    const carButton = buttonEl(car, background);


    el.classList.add('car-card');
    el.append(carName, carImg, carButton);

    return el
}

export default carCard
