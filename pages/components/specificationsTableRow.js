import capitaliseText from "../../helpers/capitaliseText.js";

const isCapitalLetter = char => char === char.toUpperCase() && char !== char.toLowerCase();

const tableMetricEl = (metric) => {
    const el = document.createElement('td');
    metric = capitaliseText(metric);

    const splitStr = metric.split('');
    const capLetters = [];

    for (let i = 0; i < splitStr.length; i++) {
        const char = splitStr[i];
        if (isCapitalLetter(char)) capLetters.push(i);
    }

    if (capLetters.length > 1) {
        const [strOneStart, strTwoStart] = capLetters;
        el.textContent = `${metric.slice(strOneStart, strTwoStart)} ${metric.slice(strTwoStart)}`;
        return el;
    }

    el.textContent = metric;
    return el;
}

const tableValueEl = (value, colspan = 1) => {
    const el = document.createElement('td');
    el.textContent = value;
    el.colSpan = colspan;
    return el;
}

const tableUnitEl = (unit) => {
    const el = document.createElement('td');
    el.textContent = unit;
    return el;
}

const specificationsTableRow = (metric, value, unit = null) => {
    const el = document.createElement('tr');
    const metricEl = tableMetricEl(metric);

    let valueEl = null;
    let unitEl = null;

    if (!unit) {
        valueEl = tableValueEl(value, 2);
    } else {
        valueEl = tableValueEl(value);
        unitEl = tableUnitEl(unit);
    }

    el.append(metricEl, valueEl);

    if (unitEl) el.append(unitEl);

    return el;
}

export default specificationsTableRow;
