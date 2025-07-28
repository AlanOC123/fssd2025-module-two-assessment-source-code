const getRGBFromHex = (hex) => {
    const r = parseInt(hex.substr(0, 2), 16);
    const b = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(0, 2), 16);

    return { r, g, b };
}

const getBrightness = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

const getLightnessFromHex = (hex) => {
    hex = hex.replace(/^#/, '');
    const { r, g, b } = getRGBFromHex(hex);
    const brightness = getBrightness(r, g, b);

    return Number((brightness * 100).toFixed(2));
}

export {
    getLightnessFromHex
}
