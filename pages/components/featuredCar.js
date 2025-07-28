import { getLightnessFromHex } from '../../helpers/getLightnessFromHex.js';

const exploreButton = (brandColors, callback) => {
    const { pri, sec } = brandColors;
    const el = document.createElement('div');
    const button = document.createElement('button');
    const avgLightness = (getLightnessFromHex(pri) + getLightnessFromHex(sec)) / 2;

    if (avgLightness < 60) {
        button.style.background = `
            radial-gradient(ellipse at top right, var(--bg-contrast-40), transparent),
            radial-gradient(ellipse at top left, oklab(from ${pri} l a b / 0.5), transparent),
            radial-gradient(ellipse at bottom right, oklab(from ${sec} l a b / 0.5), transparent),
            radial-gradient(ellipse at center, var(--bg-contrast-20), transparent)
        `;
        button.style.color = `var(--text-light)`;
    } else {
        button.style.background = `
            radial-gradient(ellipse at top right, var(--bg-40), transparent),
            radial-gradient(ellipse at top left, oklab(from ${pri} l a b / 0.5), transparent),
            radial-gradient(ellipse at bottom right, oklab(from ${sec} l a b / 0.5), transparent),
            radial-gradient(ellipse at center, var(--bg-20), transparent)
        `;
        button.style.color = `var(--text)`;
    }

    button.classList.add('explore-button');
    button.addEventListener('click', callback);

    button.textContent = 'Explore';

    el.classList.add('explore-button-container');
    el.append(button);

    return el;
}

const maskLayer = () => {
    const el = document.createElement('div');

    el.classList.add('mask-layer');
    return el;
}

const carName = (name) => {
    const el = document.createElement('h1');

    el.textContent = name;
    return el;
}

const carLogo = (logoPath) => {
    const el = document.createElement('div');

    const imgEl = document.createElement('img');
    imgEl.src = logoPath;

    el.classList.add('logo-container');
    el.append(imgEl);

    return el;
}

const carData = (logoPath, name, brandClrs, buttonCallbackFn) => {
    const el = document.createElement('div');

    const logo = carLogo(logoPath);
    const model = carName(name);
    const button = exploreButton(brandClrs, buttonCallbackFn);

    const primaryContainer = document.createElement('div');
    const secondaryContainer = document.createElement('div');

    primaryContainer.classList.add('primary-container');
    secondaryContainer.classList.add('secondary-container');

    primaryContainer.append(model);
    secondaryContainer.append(logo, button);

    el.classList.add('car-data-container');
    el.append(primaryContainer, secondaryContainer);

    return el;
}

const coverImage = (coverPath) => {
    const el = document.createElement('div');

    const imgEl = document.createElement('img');
    imgEl.src = coverPath;

    el.classList.add('image-container');
    el.append(imgEl);

    return el;
}

const renderFeaturedCar = (coverPath, logoPath, name, brandColors, buttonCallbackFn) => {
    const el = document.createElement('li');
    const mask = maskLayer();
    const cover = coverImage(coverPath);
    const details = carData(logoPath, name, brandColors, buttonCallbackFn);

    el.classList.add('car-container');
    el.append(cover, details);

    return el;
}

export { renderFeaturedCar }
