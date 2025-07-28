import carsList from "../../data/carsList.js";
import { renderFeaturedCar } from "../components/featuredCar.js";
import { renderCarouselBar } from "../components/carouselBar.js";
import viewPageScript from '../viewCar/script.js';
import pageRouter from "../../pageRouter.js";

const DOMCache = {
    progressBars: null,
    carContainers: null,
    featuredCarList: null,
    carouselContainer: null,
    controlButtons: {
        next: null,
        prev: null
    }
}

let max = 0;
let animationIndex = 0;
let prevIndex = -1;
let featuredCars = [];

const addAnimations = (isReverse = false, i = animationIndex, j = prevIndex) => {
    const { progressBars, carContainers } = DOMCache;

    const allBars = Array.from(progressBars);
    const allCars = Array.from(carContainers);

    allBars.forEach(el => el.classList.remove('play'));
    allCars.forEach(el => {
        el.classList.remove('reverse');
        el.classList.remove('play');
        el.classList.remove('unshift');
    });

    const currBar = allBars[i];
    const currCar = allCars[i];

    if (j < 0) {
        currBar.classList.add('play');
        currCar.classList.add('play');
        return;
    }

    const prevCar = allCars[j];

    currBar.classList.add('play');

    if (isReverse) {
        currCar.classList.add('reverse');
        prevCar.classList.add('reverse');
    }
    currCar.classList.add('play');
    prevCar.classList.add('unshift');
}

const interval = (() => {
    let interval = null;

    const stopInterval = () => {
        clearInterval(interval);
        interval = null;
    }

    const startInterval = (callback) => {
        if (interval) stopInterval();
        interval = setInterval(callback, 10500)
    }

    return {
        start: startInterval,
        stop: stopInterval
    }
})();

const animation = (() => {
    interval.stop();

    const progressCarousel = (isRight = true, stop = false) => {
        if (stop) {
            interval.start(() => progressCarousel());
        }

        let curr = animationIndex;
        let next = isRight ? (animationIndex + 1) % max : (animationIndex - 1) % max;

        if (!isRight && next < 0) next = max - 1;
        prevIndex = curr;
        animationIndex = next;

        isRight ? addAnimations() : addAnimations(true);
    }

    const startAnimation = () => {
        addAnimations(false, 0, -1);
        interval.start(() => progressCarousel());
    }

    const stopAnimation = () => {
        animationIndex = 0;
        interval.stop();
    }

    return {
        start: startAnimation,
        stop: stopAnimation,
        progress: progressCarousel
    }

})();

const getRandomNumber = (max) => Math.floor(Math.random() * max);

const getIndicesArray = (max) => {
    if (max === 0) return [];
    const a = getRandomNumber(max);

    if (max === 1) return [ a ];
    let b = getRandomNumber(max);
    while (a === b) {
        b = getRandomNumber(max);
    }

    if (max === 2) return [ a, b ]
    let c = getRandomNumber(max)
    while ((a === c) || (b === c)) {
        c = getRandomNumber(max);
    }

    return [ a, b, c ];
}

const openExplorePage = () => {
    const currCarr = featuredCars[animationIndex];
    const { viewManager } = viewPageScript;
    viewManager.setCurr(currCarr);
    pageRouter.loadPage('view-car');
}

const fillFeaturedCarList = () => {
    const { featuredCarList } = DOMCache;
    max = Math.min(carsList.length, 3);

    featuredCars = getIndicesArray(carsList.length).map(i => carsList[i]);

    console.log(featuredCars);

    const nodes = featuredCars.map(car => {
        const { cover: coverPath } = car.getImages();
        const { logoPath, brandClrs } = car.getBrand();
        const carName = car.getName();
        return renderFeaturedCar(coverPath, logoPath, carName, brandClrs, openExplorePage);
    });

    featuredCarList.append(...nodes);
    return max;
}

const fillCarousel = () => {
    if (max < 2) return;

    const { carouselContainer } = DOMCache;

    for (let i = 0; i < max; i++) {
        const progressBar = renderCarouselBar();
        progressBar.dataset.ind = i;
        carouselContainer.append(progressBar);
    }
}

export default {
    init: () => {
        DOMCache.progressBars = document.getElementsByClassName('progress-bar');
        DOMCache.carContainers = document.getElementsByClassName('car-container');
        DOMCache.featuredCarList = document.getElementById('featured-car');
        DOMCache.carouselContainer = document.getElementById('progress-container');
        DOMCache.controlButtons.next = document.getElementById('next');
        DOMCache.controlButtons.prev = document.getElementById('prev');

        fillFeaturedCarList();
        fillCarousel();

        const {next, prev} = DOMCache.controlButtons;

        next.addEventListener('click', () => animation.progress(true, true));
        prev.addEventListener('click', () => animation.progress(false, true));

        animation.start();
    },
    teardown: () => {
        DOMCache.progressBars = null;
        DOMCache.carContainers = null;
        DOMCache.featuredCarList = null;
        DOMCache.carouselContainer = null;
        animationIndex = 0;
        prevIndex = -1;
        featuredCars = [];
        animation.stop();
    }
}
