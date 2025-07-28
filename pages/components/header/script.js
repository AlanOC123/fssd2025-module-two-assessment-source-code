import pageRouter from '../../../pageRouter.js';
import navigationScript from '../nav/script.js'

const DOMCache = {
    root: null,
    controlButton: null,
}

const setSectionIndicator = () => {
    const map = {
        'showcase': 'Featured Cars',
        'car-list': 'Explore Cars',
        'about': 'About',
        'view-car': 'View Car',
        'site-map': 'Site Map'
    }

    const { root, currentSectionIndicator } = DOMCache;
    const { id } = root;
    currentSectionIndicator.textContent = map[id];
}

export default {
    init: () => {
        DOMCache.root = document.querySelector('.app');
        DOMCache.controlButton = document.getElementById('nav-control');
        DOMCache.currentSectionIndicator = document.getElementById('current-section');

        const { controlButton, root } = DOMCache;
        controlButton.addEventListener('click', navigationScript.toggleNavigation);
        setSectionIndicator();
    },
    teardown: () => {
        DOMCache.controlButton = null;
    }
}
