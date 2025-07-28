import { getLightnessFromHex } from '../../helpers/getLightnessFromHex.js';
import galleryCard from '../components/galleryCard.js';
import performanceCard from '../components/performanceCard.js';
import specificationsTableRow from '../components/specificationsTableRow.js';

const carData = {
    model: null,
    brand: null,
    overview: null,
    performance: {
        overview: null,
    },
    images: null,
    table: null,
}

const DOMCache = {
    root: null,
    contentRoot: null,
    header: null,
    controlPane: {
        root: null,
        navItems: null,
    },
    hero: {
        root: null,
        heroImg: null,
        model: null,
        make: null,
    },
    overview: {
        root: null,
        description: null,
    },
    gallery: {
        root: null,
        buttons: {
            interiorView: null,
            exteriorView: null,
        },
        galleryRoot: null,
        cardGroups: null,
        galleryCards: null,
    },
    performance: {
        root: null,
        cardList: null,
        overview: null,
        counterWindows: null,
    },
    specifications: {
        root: null,
        table: null,
        tableRows: null,
    }
}

const scrollData = {
    lastScrollY: 0,
    isIntersecting: true,
    isTicking: false,
}

const viewManager = (() => {
    let currCar = null;

    const updateData = () => {
        carData.model = currCar.getName();
        carData.brand = { ...currCar.getBrand() };
        carData.overview = currCar.getGeneralOverview();
        carData.performance = { ...currCar.getPerformance() };
        carData.images = { ...currCar.getImages() };
        carData.table = { ...currCar.getTableData() };
    }

    const setCar = (car = null) => {
        currCar = car;
        updateData();
    }

    const resetData = () => {
        currCar = null;
    }

    const getCurrCar = () => currCar;

    return {
        setCurr: setCar,
        reset: resetData,
        getCurr: getCurrCar,
    }
})();

const scrollToContainer = (e) => {
    const map = {
        'to-hero': DOMCache.hero.root,
        'to-overview': DOMCache.overview.root,
        'to-gallery':DOMCache.gallery.root,
        'to-performance': DOMCache.performance.root,
        'to-specifications': DOMCache.specifications.root,
    }

    const target = e.target.closest('li');
    const id = target.id;

    const el = map[id];

    el.scrollIntoView({
        block: 'center',
        behaviour: 'auto',
    })
}

const updateRootStyling = () => {
    const { root } = DOMCache;
    const { pri, sec } = carData.brand.brandClrs;
    root.style.setProperty('--pg-base-clr', pri);
    root.style.setProperty('--pg-accent-clr', sec);
}

const renderHeroSection = () => {
    const { heroImg, model, make } = DOMCache.hero;
    const { images, brand, model: carModel } = carData;
    const { name } = brand;
    const { cover } = images;
    heroImg.src = cover;
    model.textContent = carModel;
    make.textContent = name;
}

const renderOverviewSection = () => {
    const { overview } = carData;
    const { description } = DOMCache.overview;

    description.textContent = overview;
}

const renderGallerySection = () => {
    const { secondary } = carData.images;
    const [ exteriorRoot, interiorRoot ] = Array.from(DOMCache.gallery.cardGroups);

    const rootMap = {
        'exterior': exteriorRoot,
        'interior': interiorRoot
    }

    for (const key of Object.keys(secondary)) {
        if (key === 'root') continue;

        const container = rootMap[key];

        for (const [k, imgPaths] of Object.entries(secondary[key])) {
            if (k === 'root') continue;

            for (const path of imgPaths) {
                const card = galleryCard(path);
                container.append(card);
            }
        }
    }
}

const switchGalleryView = (e) => {
    const { id } = e.target;
    const { cardGroups, buttons } = DOMCache.gallery;
    const { interiorView, exteriorView } = buttons;

    [ interiorView, exteriorView ].forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === id) btn.classList.add('active');
    });

    const map = {
        'exterior-view': {
            add: 'exterior-shown',
            remove: 'interior-shown',
        },
        'interior-view': {
            add: 'interior-shown',
            remove: 'exterior-shown',
        }
    }
    Array.from(cardGroups).forEach(el => {
        if (el.classList.contains(map[id].remove)) {
            el.classList.remove(map[id].remove);
        }

        el.classList.add(map[id].add);
    })
}

const renderPerformanceSection = () => {
    const { performance } = carData;
    const { cardList, overview } = DOMCache.performance;

    for (const metric of Object.keys(performance)) {
        if (['weight', 'overview'].includes(metric)) continue;

        const { unit, value } = performance[metric];
        const el = performanceCard(metric, unit, value);
        cardList.append(el);
    }

    overview.textContent = performance.overview;
}

const renderSpecificationsSection = () => {
    const { table } = carData;
    const { table: tableContent } = DOMCache.specifications;

    for (const key of Object.keys(table)) {
        if (key === 'overview') continue;

        const { unit, value } = table[key];

        let el = null;

        if (!unit || !value) {
            el = specificationsTableRow(key, table[key])
        } else {
            el = specificationsTableRow(key, value, unit);
        }

        tableContent.append(el);
    }
}

const toggleQuickNav = (addClass) => {
    const { innerWidth } = window;
    if (innerWidth < 768) return;

    const { root } = DOMCache.controlPane;
    const hasClass = root.classList.contains('top');

    if (addClass) {
        root.classList.add('top');
    } else if (hasClass) {
        root.classList.remove('top');
    }
}

const handleHeroIntersect = (currY) => {
    const { header } = DOMCache;
    const { isIntersecting } = scrollData;
    const isHidden = header.classList.contains('hide');

    if (isIntersecting && !isHidden) {
        return;
    } else if (isIntersecting) {
        header.classList.remove('hide');
        toggleQuickNav(false);
        return;
    }

    if (currY < scrollData.lastScrollY) {
        header.classList.remove('hide');
        toggleQuickNav(false);
        scrollData.lastScrollY = currY;
        return;
    }

    if (!isHidden) {
        header.classList.add('hide');
        toggleQuickNav(true);
    }

    scrollData.lastScrollY = currY;
}

const handleGalleryIntersect = (isIntersecting) => {
    let { galleryCards } = DOMCache.gallery;
    galleryCards = Array.from(galleryCards);

    if (isIntersecting) {
        galleryCards.forEach(el => {
            el.classList.remove('animate-out');
            el.classList.add('animate-in');
        });
        return;
    }

    galleryCards.forEach(el => {
        el.classList.remove('animate-in');
        el.classList.add('animate-out');
    })
}

const handlePerformanceIntersect = (isIntersecting) => {
    let { counterWindows } = DOMCache.performance;
    counterWindows = Array.from(counterWindows);

    if (isIntersecting) {
        counterWindows.forEach(el => el.style.transform = `translateY(${el.dataset.distance})`);
        return;
    }

    counterWindows.forEach(el => el.style.transform = `translateY(0)`)
}

const handleSpecificationsIntersect = (isIntersecting) => {
    let { tableRows } = DOMCache.specifications;

    tableRows = Array.from(tableRows);

    if (isIntersecting) {
        tableRows.forEach((el, ind) => {
            console.log(el)
            el.style.animationDelay = `calc(var(--delay-md) * ${ind})`;
            el.classList.add('animate');
        })

        return;
    }

    tableRows.forEach(el => el.classList.remove('animate'));
}

const getScrollTop = () => DOMCache.contentRoot.scrollTop;
const isPastIntersectionThreshold = (currY) => currY < 100 ? false : true;
const getIsIntersecting = ([ entry ]) => entry.isIntersecting;

const observerManager = (() => {
    let observers = {};
    let targets = {};

    const thresholds = {
        hero: 0.1,
        gallery: 0.2,
        performance: 0.5,
        specifications: 0.5
    }

    const triggers = {
        hero: (entries) => {
            if (!isPastIntersectionThreshold()) return;
            const currY = getScrollTop();

            scrollData.isIntersecting = getIsIntersecting(entries);
            handleHeroIntersect(currY);
        },
        gallery: (entries) => {
            if (!isPastIntersectionThreshold(getScrollTop())) return;
            const isIntersecting = getIsIntersecting(entries);
            handleGalleryIntersect(isIntersecting);
        },
        performance: (entries) => {
            if (!isPastIntersectionThreshold(getScrollTop())) return;
            const isIntersecting = getIsIntersecting(entries);
            handlePerformanceIntersect(isIntersecting);
        },
        specifications: (entries) => {
            if (!isPastIntersectionThreshold(getScrollTop())) return;
            const isIntersecting = getIsIntersecting(entries);
            handleSpecificationsIntersect(isIntersecting);
        }
    }

    const getObserverOptions = (key) => ({
        root: DOMCache.root,
        rootMargin: "0px",
        threshold: thresholds[key],
    });

    const getTargets = () => ({
        hero: DOMCache.hero.root,
        gallery: DOMCache.gallery.galleryRoot,
        performance: DOMCache.performance.cardList,
        specifications: DOMCache.specifications.table,
    })

    const connect = () => {
        targets = getTargets();
        observers = {};

        for (const key of Object.keys(targets)) {
            const observer = new IntersectionObserver(triggers[key], getObserverOptions(key));
            observers[key] = observer;
            observer.observe(targets[key]);
        }
    }

    const disconnect = () => {
        for (const key in observers) {
            if (observers[key]) {
                observers[key].disconnect();
            }
        }
        observers = {};
    };

    return {
        connect,
        disconnect,
    }
})()

export default {
    init: () => {
        DOMCache.root = document.getElementById('view-car');
        DOMCache.contentRoot = document.getElementById('view-car-content');
        DOMCache.header = document.querySelector('header');

        DOMCache.controlPane.root = document.querySelector('.quick-nav');
        DOMCache.controlPane.navItems = document.querySelectorAll('.quick-nav-item');

        DOMCache.hero.root = document.getElementById('hero');
        DOMCache.overview.root = document.getElementById('overview');
        DOMCache.gallery.root = document.getElementById('gallery');
        DOMCache.performance.root = document.getElementById('performance');
        DOMCache.specifications.root = document.getElementById('specifications');

        DOMCache.hero.heroImg = document.getElementById('hero-img');
        DOMCache.hero.model = document.getElementById('model');
        DOMCache.hero.make = document.getElementById('make');

        DOMCache.overview.description = document.getElementById('overview-description');

        DOMCache.gallery.buttons.interiorView = document.getElementById('interior-view');
        DOMCache.gallery.buttons.exteriorView = document.getElementById('exterior-view');
        DOMCache.gallery.galleryRoot = document.getElementById('gallery-list');
        DOMCache.gallery.cardGroups = document.getElementsByClassName('gallery-group');

        DOMCache.performance.cardList = document.getElementById('performance-stats');
        DOMCache.performance.overview = document.getElementById('performance-overview');

        DOMCache.specifications.table = document.getElementById('specifications-table');

        const { contentRoot: rootContainer, controlPane, hero, gallery } = DOMCache;
        const { navItems } = controlPane;
        const { interiorView, exteriorView } = gallery.buttons;

        updateRootStyling();

        interiorView.addEventListener('click', switchGalleryView);
        exteriorView.addEventListener('click', switchGalleryView);

        rootContainer.addEventListener('scroll', (e) => {
            const { isTicking } = scrollData;

            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    const { target } = e;
                    const { scrollTop } = target;
                    handleHeroIntersect(scrollTop);
                    scrollData.isTicking = false;
                })
                scrollData.isTicking = true;
            }
        });

        renderHeroSection();
        renderOverviewSection();
        renderGallerySection();
        renderPerformanceSection();
        renderSpecificationsSection();

        Array.from(navItems).forEach(el => el.addEventListener('click', scrollToContainer));
        DOMCache.gallery.galleryCards = document.getElementsByClassName('gallery-card');
        DOMCache.performance.counterWindows = document.getElementsByClassName('counter-window');
        DOMCache.specifications.tableRows = document.querySelectorAll('tr');
        console.log(document.querySelectorAll('tr'))

        observerManager.connect();
    },
    teardown: () => {
        observerManager.disconnect();

        DOMCache.root = null;
        DOMCache.contentRoot = null;
        DOMCache.header = null;

        DOMCache.controlPane.root = null;
        DOMCache.controlPane.navItems = null;

        DOMCache.hero.root = null;
        DOMCache.overview.root = null;
        DOMCache.gallery.root = null;
        DOMCache.performance.root = null;
        DOMCache.specifications.root = null;

        DOMCache.hero.heroImg = null;
        DOMCache.hero.model = null;
        DOMCache.hero.make = null;

        DOMCache.overview.description = null;

        DOMCache.gallery.buttons.interiorView = null;
        DOMCache.gallery.buttons.exteriorView = null;
        DOMCache.gallery.galleryRoot = null;
        DOMCache.gallery.cardGroups = null;
        DOMCache.gallery.galleryCards = null;

        DOMCache.performance.cardList = null;
        DOMCache.performance.overview = null;

        DOMCache.specifications.table = null;
        DOMCache.specifications.tableRows = null;
    },
    viewManager,
}
