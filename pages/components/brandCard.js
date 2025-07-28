const nameContainer = (name, color) => {
    const el = document.createElement('div');
    const p = document.createElement('p');

    el.classList.add('brand-name-container');
    p.textContent = name;
    p.style.color = color;

    el.append(p);
    return el;
}

const imgContainer = (logoPath) => {
    const el = document.createElement('div');
    const img = document.createElement('img');

    el.classList.add('brand-logo-container');
    img.src = logoPath;

    el.append(img);
    return el;
}

const getPallete = (base, accent) => {
    const clrOne = `oklab(from ${base} l a b)`;
    const clrTwo = `oklab(from ${accent} calc(l * 1.5) calc(a * 1.5) b)`;
    const bgOne = `oklab(from ${base} calc(l * 0.33) a b / 0.2)`;
    const bgTwo = `oklab(from ${accent} calc(l * 0.33) a b / 0.2)`;
    const text = `oklab(from var(--text) calc(l + 0.8) a b)`;

    return {
        clrOne,
        clrTwo,
        bgOne,
        bgTwo,
        text
    }
}

const brandCard = (name, logoPath, theme) => {
    const { clrOne, clrTwo, bgOne, bgTwo, text } = getPallete(theme.pri, theme.sec);

    const el = document.createElement('li');
    const imgEl = imgContainer(logoPath);
    const nameEl = nameContainer(name, text);

    el.classList.add('brand-card');
    el.dataset.brandName = name;

    const bgClr = `radial-gradient(ellipse at top right, ${clrOne}, ${bgOne}), radial-gradient(ellipse at bottom left, ${clrTwo}, ${bgOne}), radial-gradient(ellipse at bottom right, ${clrTwo}, ${bgTwo})`;

    el.style.background = bgClr;

    el.append(imgEl, nameEl);
    return { card: el, background: bgClr};
}

export default brandCard;
