import pageRouter from '../../../pageRouter.js';

const DOMCache = {
    root: null,
    navigation: null,

    navButtons: {
        closeNav: null,
        featuredCars: null,
        viewCars: null,
        about: null,
        siteMap: null,
        exitApp: null,
    }
}

const toggleNavigation = () => {
    const { root } = DOMCache;
    root.classList.toggle('visible');
}

const toFeaturedCars = () => {
    pageRouter.loadPage('showcase');
}

const toStart = () => {
    pageRouter.loadPage('start');
}

const toCarList = () => {
    pageRouter.loadPage('car-list');
}

const toAbout = () => {
    pageRouter.loadPage('about');
}

const toSiteMap = () => {
    pageRouter.loadPage('site-map');
}

export default {
    init:() => {
        DOMCache.root = document.querySelector('aside');
        DOMCache.navigation = document.querySelector('nav');

        DOMCache.navButtons.closeNav = document.getElementById('close-nav');
        DOMCache.navButtons.featuredCars = document.getElementById('featured-cars');
        DOMCache.navButtons.viewCars = document.getElementById('view-cars');
        DOMCache.navButtons.about = document.getElementById('about');
        DOMCache.navButtons.siteMap = document.getElementById('site-map');
        DOMCache.navButtons.exitApp = document.getElementById('exit-app');

        const { navButtons } = DOMCache;
        const { closeNav, featuredCars, viewCars, about, siteMap, exitApp } = navButtons;

        closeNav.addEventListener('click', toggleNavigation);
        featuredCars.addEventListener('click', toFeaturedCars);
        viewCars.addEventListener('click', toCarList);
        exitApp.addEventListener('click', toStart);
        about.addEventListener('click', toAbout);
        siteMap.addEventListener('click', toSiteMap);
    },
    teardown: () => {

    },
    toggleNavigation
}
