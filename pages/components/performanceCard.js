import capitaliseText from '../../helpers/capitaliseText.js';

const metricEl = (val) => {
    const el = document.createElement('h3');

    el.classList.add('performance-card-metric');
    el.textContent =capitaliseText(val);

    return el;
}

const unitEl = (val) => {
    const el = document.createElement('h3');

    el.classList.add('performance-card-unit');
    el.textContent = val;

    return el;
}

const labelContainer = (metric, unit) => {
    const el = document.createElement('div');
    const metricVal = metricEl(metric);
    const unitVal = unitEl(unit);

    el.classList.add('performance-card-label');
    el.append(metricVal, unitVal);

    return el;
}

const counterEl = (num) => {
    const digits = num.toString().split('');
    const container = document.createElement('span');

    container.classList.add('count-up');
    container.dataset.target = num;

    const increment = 100;

    const map = {
        '.': 10,
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
    }

    digits.forEach(d => {
        const outerWindow = document.createElement('div');
        outerWindow.classList.add('counter-window');

        for (const key of Object.keys(map)) {
            const pEl = document.createElement('h1');
            pEl.textContent = key;
            pEl.classList = 'counter-val';
            outerWindow.append(pEl)
        }

        outerWindow.dataset.distance = `-${Math.floor(increment * map[d])}%`;
        container.appendChild(outerWindow);
    });

    return container;
}

const valueEl = (val) => {
    const el = document.createElement('h1');

    el.classList.add('performance-card-val');
    const countEl = counterEl(val);

    el.append(countEl);
    return el;
}

const performanceCard = (metric, unit, val) => {
    const el = document.createElement('div');
    const label = labelContainer(metric, unit);
    const value = valueEl(val);

    el.classList.add('performance-card');
    el.append(label, value);

    return el;
}

export default performanceCard;
