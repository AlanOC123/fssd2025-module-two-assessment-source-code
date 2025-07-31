import pageRouter from '../../../pageRouter.js';

let DOMCache = {
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
        DOMCache.navButtons.featuredCars = document.getElementById('to-featured-cars');
        DOMCache.navButtons.viewCars = document.getElementById('to-view-cars');
        DOMCache.navButtons.about = document.getElementById('to-about-page');
        DOMCache.navButtons.siteMap = document.getElementById('to-site-map');
        DOMCache.navButtons.exitApp = document.getElementById('to-exit-app');

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
        DOMCache = {
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
    },
    toggleNavigation
}
