import carsList from "../data/carsList.js";
import carouselControl from "./carouselControl.js";

const filterData = {
    brands: [],
    fuelType: [],
    priceRange: {
        floor: 250000,
        ceiling: 5000000,
        min: 250000,
        max: 5000000,
    }
}

const avgClrCache = new Map();

const cache = {
    filters: {
        showFiltersButton: () => document.getElementById('toggle-filters'),
        filterPane: () => document.getElementById('filter-container'),
        priceRangeTrack: () => document.getElementById('track-sel'),
        priceRangeThumbMin: () => document.getElementById('min-sel'),
        priceRangeThumbMax: () => document.getElementById('max-sel'),
        priceRangeInputMin: () => document.getElementById('min-in'),
        priceRangeInputMax: () => document.getElementById('max-in'),
        priceRangeInputContainer: () => document.getElementById('price-range'),
    },
    carousel: {
        imageContainer: () => document.getElementById('image-container'),
        images: () => Array.from(document.querySelectorAll('.image')),
        carMakePreview: () => document.getElementById('car-make'),
        carModelPreview: () => document.getElementById('car-model'),
        slider: () => document.getElementById('slider'),
        cards: () => document.getElementById('cards'),
        carThumnails: () => document.querySelectorAll('.card'),
        carExpandButtons: () => Array.from(document.querySelectorAll('.car-model-expand')),
        carHoverSound: () => document.getElementById('car-hover-sound'),
        carBrandDisplay: () => document.getElementById('car-brand-display'),
    }
}

const makeImageMap = {
    'Lamborghini': '../assets/lamborghini-logo.png',
    'Ferrari': '../assets/ferrari-logo.png',
    'McLaren': '../assets/mclaren-logo.png',
    'Alpine': '../assets/alpine-logo.png',
}

const renderImageContainer = () => {
    const cards = cache.carousel.cards();
    cards.innerHTML = '';
    carsList.forEach(car => cards.append(car.getThumbnail()))
}

const setBaseColor = (hexCode = '#00e6ac') => {
    const root = document.documentElement;
    root.style.setProperty('--base-clr', hexCode);
}

const setDefaultBackground = () => {
    const slider = cache.carousel.slider();
    const carBrandDisplay = cache.carousel.carBrandDisplay().querySelector('img');
    setBaseColor();
    slider.style.backgroundImage = '';
    carBrandDisplay.src = '../assets/logo-light.png';
    cache.carousel.carBrandDisplay().classList.remove('pulse');
}

const updateCarouselPosition = (e) => {
    // if (isFiltersShown()) return;

    const slider = cache.carousel.slider();
    const cards = cache.carousel.cards();

    const left = slider.getBoundingClientRect().left;
    const width = slider.getBoundingClientRect().width - 50;

    const localX = Math.min(Math.max(e.clientX - left, 0), width);
    const maxShift = cards.clientWidth - width;
    const percent = localX / width;
    const shift = percent * maxShift;

    cards.style.transform = `translateX(${-shift}px)`;
}

const blobToDataURL = async (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    })
}

const getAverageClrFromDataURL = (dataURL) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = dataURL;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;

            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

            const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
            let r = 0, g = 0, b = 0;
            let count = 0;

            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (!alpha) continue;

                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }

            resolve({
                r: Math.round(r / count),
                g: Math.round(g / count),
                b: Math.round(b / count),
            });
        }

        img.onerror = reject;
    })
}

const convertRGBToHex = (r, g, b) => `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;

const getDominantClr = (r, g, b) => Math.max(r, Math.max(g, b));

const brightenColor = (r, g, b, dominant) => {
    const [ bR, bG, bB ] = [r, g, b].map(v => {
        if (v === dominant) return Math.min(255, v + 150);
        return Math.min(255, v + 50);
    });

    return { r: bR, g: bG, b: bB };
}

const getAverageClr = async (target) => {
    const src = target.querySelector('img').src;
    if (avgClrCache.has(src)) {
        const { r, g, b } = avgClrCache.get(src);
        const dominant = getDominantClr(r, g, b);
        const brightenedClr = brightenColor(r, g, b, dominant);
        return convertRGBToHex(brightenedClr.r, brightenedClr.g, brightenedClr.b);
    }

    try {
        const res = await fetch(src);
        const blob = await res.blob();
        const dataURL = await blobToDataURL(blob);
        const { r, g, b } = await getAverageClrFromDataURL(dataURL);
        const dominant = getDominantClr(r, g, b);
        const brightenedClr = brightenColor(r, g, b, dominant);
        avgClrCache.set(src, { r, g, b });
        return convertRGBToHex(brightenedClr.r, brightenedClr.g, brightenedClr.b);
    } catch (err) {
        throw new Error(err);
    }
}

const addCarHoverEvent = () => {
    carsList.forEach(car => {
        const slider = cache.carousel.slider();
        const carBrandDisplay = cache.carousel.carBrandDisplay().querySelector('img');
        const hoverSound = cache.carousel.carHoverSound();
        const thumbnail = car.getThumbnail();

        const expandButton = thumbnail.querySelector('.car-model-expand');

        thumbnail.addEventListener('mouseenter', async () => {
            let avgClr = await getAverageClr(thumbnail);
            setBaseColor(avgClr);
            hoverSound.currentTime = 0;
            hoverSound.play();
            carBrandDisplay.src = makeImageMap[car.getMake()];
            cache.carousel.carBrandDisplay().classList.add('pulse');
            slider.style.backgroundImage = `url(${car.getImageSrc()})`;
        })

        expandButton.addEventListener('mouseenter', () => expandButton.textContent = 'Expand');
        expandButton.addEventListener('mouseleave', () => expandButton.textContent = '+');

        thumbnail.addEventListener('mouseleave', setDefaultBackground)
    })
}

const updateUIFromValue = (targetPx) => {
    const thumb = cache.filters.priceRangeThumbMin();

    const thumbRect = thumb.getBoundingClientRect();
    const thumbWidth = +thumbRect.width;
    const track = cache.filters.priceRangeTrack();

    if (targetPx <= 0) {
        thumb.style.transform = `translateX(${targetPx}px)`;
        track.style.width = `${targetPx}px`;
        return;
    }

    thumb.style.transform = `translateX(${targetPx}px)`;
    track.style.width = `${targetPx + (thumbWidth / 1.5) + 1}px`;
}

const fillTrack = () => {
    const track = cache.filters.priceRangeTrack();
    const thumbMin = cache.filters.priceRangeThumbMin();
    const thumbMax = cache.filters.priceRangeThumbMax();

    const { width: thumbW } = thumbMin.getBoundingClientRect();
    const leftPos = thumbMin.offsetLeft;
    const width = (thumbMax.offsetLeft + thumbW) - leftPos;

    track.style.left = `${leftPos}px`;
    track.style.width = `${width}px`;
}

const updatePriceRangeFromDrag = (e) => {
    const container = cache.filters.priceRangeInputContainer();
    const { left: leftBound, width: totalWidth } = container.getBoundingClientRect();
    const target = e.target;
    const tooltip = target.querySelector('.tooltip');
    const isMin = target.id === 'min-sel';
    const { width: thumbWidth } = target.getBoundingClientRect();

    target.setPointerCapture(e.pointerId);

    const onMouseMove = (ev) => {
        const thumbMin = cache.filters.priceRangeThumbMin();
        const thumbMax = cache.filters.priceRangeThumbMax()
        tooltip.classList.add('visible');
        const dragX = ev.clientX - leftBound;
        let x = dragX - (thumbWidth / 2);
        x = Math.max(0, Math.min(totalWidth - thumbWidth, x));

        if (isMin) {
            const offset = thumbMax.offsetLeft;
            const maxAllowed = offset - thumbWidth;
            x = Math.min(maxAllowed, x);
        } else {
            const offset = thumbMin.offsetLeft;
            const maxAllowed = offset + thumbWidth;
            x = Math.max(maxAllowed, x);
        }

        target.style.left = `${x}px`;
        const { floor, ceiling } = filterData.priceRange;
        const total = ceiling - floor;

        const leftPos = thumbMin.offsetLeft;
        const rightPos = thumbMax.offsetLeft + thumbWidth;

        if (isMin) {
            const pct = Number((leftPos / totalWidth).toFixed(2));
            const newMin = Math.floor(floor + (total * pct));
            filterData.priceRange.min = newMin;
            tooltip.textContent = `€ ${newMin}`;
        } else {
            const pct = Number((rightPos / totalWidth).toFixed(2));
            const newMax = Math.floor(ceiling * pct);
            filterData.priceRange.max = newMax;
            tooltip.textContent = `€ ${newMax}`;
        }

        fillTrack();
    }

    const onMouseUp = () => {
        tooltip.classList.remove('visible');
        target.releasePointerCapture(e.pointerId);
        target.removeEventListener('mousemove', onMouseMove);
        target.removeEventListener('pointerup', onMouseUp);
    }

    target.addEventListener('mousemove', onMouseMove);
    target.addEventListener('pointerup', onMouseUp)
}

const updatePriceRangeFromClick = (e) => {
    const container = cache.filters.priceRangeInputContainer();
    const thumbMin = cache.filters.priceRangeThumbMin();
    const thumbMax = cache.filters.priceRangeThumbMax();

    const { left: boxLeft, width: boxWidth } = container.getBoundingClientRect();
    const { width: thumbW } = thumbMin.getBoundingClientRect();

    const clickX = e.clientX - boxLeft;

    const minCentre = thumbMin.offsetLeft + thumbW / 2;
    const maxCentre = thumbMax.offsetLeft + thumbW / 2;
    const isMin = Math.abs(clickX - minCentre) < Math.abs(clickX - maxCentre);

    let x = clickX - thumbW / 2;
    x = Math.max(0, Math.min(boxWidth - thumbW, x));

    if (isMin) {
        const maxAllowed = thumbMax.offsetLeft - thumbW;
        x = Math.min(x, maxAllowed);
    } else {
        const maxAllowed = thumbMin.offsetLeft + thumbW;
        x = Math.max(x, maxAllowed);
    }

    const targetThumb = isMin ? thumbMin : thumbMax;
    targetThumb.style.left = `${x}px`;
    fillTrack();
}

const mouseMoveListeners = [
    [ cache.carousel.slider(), updateCarouselPosition ],
]

const mouseDownListeners = [
    [ cache.filters.priceRangeThumbMin(), updatePriceRangeFromDrag ],
    [ cache.filters.priceRangeThumbMax(), updatePriceRangeFromDrag ],
]

const buttonClickListeners = [
    [ cache.filters.priceRangeInputContainer(), updatePriceRangeFromClick ],
]

addCarHoverEvent();
renderImageContainer();
updateUIFromValue();
fillTrack();

buttonClickListeners.forEach(listener => listener[0].addEventListener('click', listener[1]));
mouseMoveListeners.forEach(listener => listener[0].addEventListener('mousemove', listener[1]));
mouseDownListeners.forEach(listener => listener[0].addEventListener('pointerdown', listener[1]));
