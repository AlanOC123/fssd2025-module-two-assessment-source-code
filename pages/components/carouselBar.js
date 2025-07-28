const track = () => {
    const el = document.createElement('div');
    el.classList.add('track');

    return el;
}

const renderCarouselBar = () => {
    const el = document.createElement('div');

    const trackEl = track();

    el.classList.add('progress-bar');
    el.append(trackEl);
    return el;
}

export { renderCarouselBar }
