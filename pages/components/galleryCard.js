const cardImg = (src) => {
    const el = document.createElement('div');
    const img = document.createElement('img');
    img.src = src;

    el.classList.add('gallery-card-img-container');

    el.append(img);
    return el;
}

const galleryCard = (src) => {
    const el = document.createElement('li');
    const imgEl = cardImg(src);

    el.classList.add('gallery-card');
    el.append(imgEl);

    return el;
}

export default galleryCard;
