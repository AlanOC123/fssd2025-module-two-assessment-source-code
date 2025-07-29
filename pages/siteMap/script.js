import pageRouter from '../../pageRouter.js';
import carList from '../../data/carsList.js';
import viewCarPageScript from '../viewCar/script.js';

const DOMCache = {
    controlButtons: null,
}

const navigateAway = (e) => {
    const map = {
        'to-start': () => pageRouter.loadPage('start'),
        'to-featured-cars': () => pageRouter.loadPage('showcase'),
        'to-view-car': () => {
            const [ car ] = carList[Math.floor(Math.random() * carList.length)];
            viewCarPageScript.viewManager.setCurr(car);
            pageRouter.loadPage('view-car')
        },
        'to-car-list': () => pageRouter.loadPage('car-list'),
        'to-about': () => pageRouter.loadPage('about'),
    }

    const { id } = e.target;
    const navHandler = map[id];
    console.log(navHandler);
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
