import pageRouter from '../../pageRouter.js';
import viewCarPageScript from '../viewCar/script.js';
import carList from '../../data/carsList.js';

const DOMCache = {
    controlButtons: null,
}

const navigateAway = (e) => {
    const map = {
        'site-map-to-start': () => pageRouter.loadPage('start'),
        'site-map-to-featured-cars': () => pageRouter.loadPage('showcase'),
        'site-map-to-view-car': () => {
            const car = carList[Math.floor(Math.random() * carList.length)];
            viewCarPageScript.viewManager.setCurr(car);
            pageRouter.loadPage('view-car')
        },
        'site-map-to-car-list': () => pageRouter.loadPage('car-list'),
        'site-map-to-about': () => pageRouter.loadPage('about'),
    }

    const { id } = e.target;
    const navHandler = map[id];
    navHandler();
}

export default {
    init: () => {
        DOMCache.controlButtons = document.querySelectorAll('.site-map-nav-button');

        const { controlButtons } = DOMCache;

        Array.from(controlButtons).forEach(el => el.addEventListener('click', navigateAway));
    },
    teardown: () => {
        DOMCache.controlButtons = null;
    }
}
