import pageRouter from '../../pageRouter.js';

const DOMCache = {
    root: null,
    startButton: null,
    bg1: null,
    bg2: null,
}

const state = {
    currentBGInd: 0,
    isBg1Active: true,
}

const backgrounds = [
  '../assets/backgrounds/bg-1.jpg',
  '../assets/backgrounds/bg-2.jpg',
  '../assets/backgrounds/bg-3.jpg',
  '../assets/backgrounds/bg-4.jpg',
  '../assets/backgrounds/bg-5.jpg',
  '../assets/backgrounds/bg-6.jpg',
  '../assets/backgrounds/bg-7.jpg',
  '../assets/backgrounds/bg-8.jpg',
  '../assets/backgrounds/bg-9.jpg',
  '../assets/backgrounds/bg-10.jpg',
  '../assets/backgrounds/bg-11.jpg',
  '../assets/backgrounds/bg-12.jpg',
]

const setBackground = (el, src) => {
    el.style.backgroundImage = `url(${src})`;
}

const crossFade = () => {
    const { bg1, bg2 } = DOMCache;
    let { isBg1Active, currentBGInd: current } = state;

    const next = (current + 1) % backgrounds.length;
    const nextUrl = backgrounds[next];

    if (isBg1Active) {
        setBackground(bg2, nextUrl);
        bg2.classList.add('active');
        bg1.classList.remove('active');
    } else {
        setBackground(bg1, nextUrl);
        bg1.classList.add('active');
        bg2.classList.remove('active');
    }

    state.isBg1Active = !isBg1Active;
    state.currentBGInd = next;
};

const intervalManager = (() => {
    let interval = null;

    const stopInterval = () => {
        clearInterval(interval);
        interval = null;
    }

    const startInterval = (callback) => {
        if (interval) stopInterval();
        interval = setInterval(callback, 15000);
    }

    return {
        start: startInterval,
        stop: stopInterval,
    }
})()

export default {
    init: () => {
        DOMCache.root = document.getElementById('start');
        DOMCache.startButton = document.getElementById('start-button');
        DOMCache.bg1 = document.getElementById('bg1');
        DOMCache.bg2 = document.getElementById('bg2');

        const { bg1 } = DOMCache;

        setBackground(bg1, backgrounds[state.currentBGInd]);
        bg1.classList.add('active');
        intervalManager.start(crossFade);

        DOMCache.startButton.addEventListener('click', () => {
            pageRouter.loadPage('showcase');
        });
    },
    teardown: () => {
        intervalManager.stop();

        DOMCache.root = null;
        DOMCache.startButton = null;
        DOMCache.bg1 = null;
        DOMCache.bg2 = null;
        state.currentBGInd = 0;
        state.isBg1Active = true;
    }
}
