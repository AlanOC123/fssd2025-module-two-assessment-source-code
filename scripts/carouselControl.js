import carsList from "../data/carsList.js"

const max = carsList.length - 1;

const data = {
    lowerBound: max - 1,
    prev: max,
    curr: 0,
    next: 1,
    upperBound: 2,
}

const getData = () => Object.assign({}, data);

const getCurr = (curr, isLeft) => isLeft ? curr - 1 : curr + 1;

const getNext = (curr) => {
    const next = curr + 1 > max ? 0 : curr + 1;
    const upperBound = next + 1 > max ? 0 : next + 1;

    return { next, upperBound };
}

const getPrev = (curr) => {
    const prev = curr - 1 < 0 ? max : curr - 1;
    const lowerBound = prev - 1 < 0 ? max : prev - 1;

    return { prev, lowerBound };
}

const updateData = (curr, prev, next, upperBound, lowerBound) => {
    data.curr = curr;
    data.next = next;
    data.prev = prev;
    data.lowerBound = lowerBound;
    data.upperBound = upperBound;
}

const moveCarousel = (isLeft) => {
    let curr = getCurr(data.curr, isLeft);

    if (isLeft && curr < 0) curr = max;
    if (!isLeft && curr > max) curr = 0;

    const prevIndex = getPrev(curr);
    const nextIndex = getNext(curr);

    updateData(curr, prevIndex.prev, nextIndex.next, prevIndex.lowerBound, nextIndex.upperBound);
    return getData();
}

export default {
    getMax: () => max,
    getData,
    moveCarousel,
}
