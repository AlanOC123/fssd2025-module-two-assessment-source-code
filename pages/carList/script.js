import brandCard from "../components/brandCard.js";
import carList from '../../data/carsList.js';
import carCard from "../components/carCard.js";
import selectOption from "../components/selectOption.js";
import emptyBrandCard from "../components/emptyBrandCard.js";

let DOMCache = {
    root: null,
    contentRoot: null,
    sideBars: {
        roots: null,
        controlButtons: {
            carList: null,
            filters: null,
        },
    },
    brandSideBar: {
        cardList: null,
    },
    filtersSideBar: {
        brandSelect: {
            root: null,
            options: null,
        },
        driveSystemSelect: {
            root: null,
            options: null,
        },
        controlButtons: {
            apply: null,
            close: null,
        },
        price: {
            min: null,
            max: null,
            slider: null,
            thumbMin: null,
            thumbMax: null,
        }
    },
    carCards: {
        root: null,
        cardList: null,
    }
}

let pageData = {
    activeBrand: null,
    baseValues: {
        cars: new Set(),
        brands: new Map(),
        driveSystems: new Set(),
        priceRange: {
            high: -Infinity,
            low: Infinity,
            range: null,
        }
    },
    filters: {
        selectedBrands: new Set(),
        selectedDriveSystems: new Set(),
        priceRange: {
            min: null,
            max: null
        },
        activeBrands: new Set(),
        activeCars: new Set(),
    },
    activeFilters: [],
    allBrands: new Map(),
}

const expandSideBar = (e) => {
    const { roots } = DOMCache.sideBars;
    const sections = Array.from(roots);
    const target = e.target.closest('.sidebar-section');

    const isShown = target.classList.contains('expand');

    sections.forEach(el => el.classList.remove('expand'));

    const buttonPressed = e.target.closest('.sidebar-control');
    if (isShown) return;
    target.classList.add('expand');
    if (buttonPressed.id === 'filters') fillTrack();
}

const filterBrands = (filtersArr) => {
    return []
}

const clearBrandList = () => {
    const { cardList } = DOMCache.brandSideBar;
    cardList.innerHTML = "";
    return cardList;
}

const clearCarList = () => {
    const { cardList } = DOMCache.carCards;
    cardList.innerHTML = "";
    return cardList;
}

const fillCarsCards = () => {
    const { activeBrand, filters } = pageData;
    const { activeCars } = filters;

    const { brandsClrs, background } = activeBrand;
    const cleanCarList = clearCarList();

    const cars = activeCars.filter(([ name, car ]) => car.getBrand().name === activeBrand.name);

    cars.forEach(([ name, car ]) => {
        const { cover } = car.getImages();
        const card = carCard(car, name, cover, background);
        cleanCarList.append(card);
    })
}

const applyFilters = () => {
    const { activeFilters } = pageData;
    const { brands, cars } = pageData.baseValues;
    const { selectedBrands, selectedDriveSystems } = pageData.filters;
    const { min, max } = pageData.filters.priceRange;

    const map = {
        'selectedBrands': {
            baseValues: Array.from(brands.values()),
            filteredValues: Array.from(selectedBrands.values()),
            mapFn: (brand, filteredVals) => {
                const { name } = brand;
                return filteredVals.includes(name);
            },
            res: [],
        },
        'selectedDriveSystems': {
            baseValues: Array.from(cars.values()),
            filteredValues: Array.from(selectedDriveSystems.values()),
            mapFn: (car, filteredVals) => {
                const { driveSystem } = car.getTableData();
                return filteredVals.includes(driveSystem);
            },
            res: [],
        },
        'priceRange': {
            baseValues: Array.from(cars.values()),
            filteredValues: [ { min, max } ],
            mapFn: (car, filteredVals) => {
                const [{ min, max }] = filteredVals;
                const { price } = car.getTableData();
                return price >= min && price <= max;
            },
            res: [],
        }
    };

    const allFilters = Object.keys(map);

    for (let i = 0; i < allFilters.length; i++) {
        const currKey = allFilters[i];
        if (activeFilters.includes(currKey)) {
            const { baseValues, filteredValues, mapFn } = map[currKey];
            map[currKey].res = baseValues.filter(val => mapFn(val, filteredValues))
        } else {
            map[currKey].res = Array.from(map[currKey]['baseValues'].values());
        }
    }

    const allBrands = [...map['selectedBrands']['res']];
    const brandNames = allBrands.map(brand => brand.name);
    const { res: driveSystemRes } = map.selectedDriveSystems;
    const { res: priceRes } = map.priceRange;
    const fullRes = [ ...driveSystemRes, ...priceRes ];
    const allCars = new Map();

    for (let i = 0; i < fullRes.length; i++) {
        const car = fullRes[i];

        const carModel = car.getName();
        const { name: brandName } = car.getBrand();

        const inBothResponses = driveSystemRes.includes(car) && priceRes.includes(car);
        const hasSelectedBrand = brandNames.includes(brandName);
        const isInMap = allCars.has(carModel);

        if ((inBothResponses && hasSelectedBrand) && !isInMap) allCars.set(carModel, car);
    }

    pageData.filters.activeBrands = allBrands;
    pageData.filters.activeCars = Array.from(allCars);

    const [ _, filters ] = DOMCache.sideBars.roots;
    filters.classList.remove('expand');
}

const fillBrandCards = () => {
    const cleanBrandCardList = clearBrandList();
    applyFilters();

    const { activeBrands, activeCars } = pageData.filters;
    const { activeBrand } = pageData;

    if (!activeBrands.includes(activeBrand)) pageData.activeBrand = null;

    activeBrands.forEach(brand => {
        const { activeBrand } = pageData;
        if (!activeBrand) pageData.activeBrand = brand;

        const activeBrandInSelection = activeBrands.includes(activeBrand);

        if (!activeBrand || !activeBrandInSelection) pageData.activeBrand = brand;

        const { name, logoPath, brandClrs } = brand;

        const brandCars = activeCars.filter(([name, car]) => {
            const { name: brandName } = car.getBrand();
            return brandName === brand.name;
        });

        if (!brandCars.length) return;

        const { card, background } = brandCard(name, logoPath, brandClrs);

        brand['background'] = background;

        card.addEventListener('click', () => {
            const { brandName } = card.dataset;
            const { activeBrands } = pageData.filters;
            pageData.activeBrand = activeBrands.find(brand => brand.name === brandName);
            fillCarsCards();
        })

        cleanBrandCardList.append(card);
    })

    if (cleanBrandCardList.children.length === 0) cleanBrandCardList.append(emptyBrandCard());

    fillCarsCards();
}

const initCars = () => carList.forEach(car => pageData.baseValues.cars.add(car));

const initBrands = () => {
    const { cars } = pageData.baseValues;
    Array.from(cars.values()).forEach(car => {
        const { name } = car.getBrand();
        pageData.baseValues.brands.set(name, car.getBrand())
    });
}

const initPriceRange = () => {
    const { min, max } = DOMCache.filtersSideBar.price;

    carList.forEach(car => {
        const { price } = car.getTableData();
        const { high, low } = pageData.baseValues.priceRange;

        if (price > high) {
            pageData.baseValues.priceRange.high = price;
            pageData.filters.priceRange.max = price;
            min.max = price;
            max.max = price;
            max.value = price;
        }
        if (price < low) {
            pageData.baseValues.priceRange.low = price;
            pageData.filters.priceRange.min = price;
            min.min = price;
            max.min = price;
            min.value = price;
        }
    })

    const { high, low } = pageData.baseValues.priceRange;
    pageData.baseValues.priceRange.range = high - low;
}

const initDriveSystem = () => {
    const { cars } = pageData.baseValues;
    Array.from(cars.values()).forEach(car => {
        const { driveSystem } = car.getTableData();
        pageData.baseValues.driveSystems.add(driveSystem);
    });
}

const fillTrack = () => {
    const { sliderTrack, thumbMin, thumbMax } = DOMCache.filtersSideBar.price;

    const { width: thumbW } = thumbMin.getBoundingClientRect();
    const leftPos = thumbMin.offsetLeft;
    const width = (thumbMax.offsetLeft + thumbW) - leftPos;

    sliderTrack.style.left = `${leftPos}px`;
    sliderTrack.style.width = `${width}px`;
}

const updatePriceRangeFromDrag = (e) => {
    const { slider } = DOMCache.filtersSideBar.price;
    const { left: leftBound, width: totalWidth } = slider.getBoundingClientRect();

    const target = e.target;
    const tooltip = target.querySelector('.tooltip');
    const isMin = target.id === 'min';
    const { width: thumbWidth } = target.getBoundingClientRect();

    target.setPointerCapture(e.pointerId);

    const onMouseMove = (ev) => {
        const{ thumbMin, thumbMax } = DOMCache.filtersSideBar.price;
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

        const { min, max } = DOMCache.filtersSideBar.price;
        const { high, low, range } = pageData.baseValues.priceRange;

        const leftPos = thumbMin.offsetLeft;
        const rightPos = thumbMax.offsetLeft + thumbWidth;

        if (isMin) {
            const pct = Number((leftPos / totalWidth).toFixed(2));
            const newMin = Math.floor(low + (range * pct));
            min.value = `${newMin}`;
            tooltip.textContent = `€ ${newMin}`;
        } else {
            const pct = Number((rightPos / totalWidth).toFixed(2));
            const newMax = Math.floor(high * pct);
            max.value = `${newMax}`;
            tooltip.textContent = `€ ${newMax}`;
        }

        fillTrack();
    }

    const onMouseUp = () => {
        tooltip.classList.remove('visible');
        document.removeEventListener('pointermove', onMouseMove);
        document.removeEventListener('pointerup', onMouseUp);
        document.removeEventListener('pointercancel', onMouseUp);
    }

    document.addEventListener('pointermove', onMouseMove);
    document.addEventListener('pointerup', onMouseUp);
    document.addEventListener('pointercancel', onMouseUp);
}

const updatePriceRangeFromClick = (e) => {
    const { slider, thumbMin, thumbMax } = DOMCache.filtersSideBar.price;

    const { left: boxLeft, width: boxWidth } = slider.getBoundingClientRect();
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
    const tooltip = targetThumb.querySelector('.tooltip');

    targetThumb.style.left = `${x}px`;

    const { min, max } = DOMCache.filtersSideBar.price;
    const { high, low, range } = pageData.baseValues.priceRange;

    const leftPos = thumbMin.offsetLeft;
    const rightPos = thumbMax.offsetLeft + thumbW;

    if (isMin) {
        const pct = Number((leftPos / boxWidth).toFixed(2));
        const newMin = Math.floor(low + (range * pct));
        min.value = `${newMin}`;
        tooltip.textContent = `€ ${newMin}`;
    } else {
        const pct = Number((rightPos / boxWidth).toFixed(2));
        const newMax = Math.floor(high * pct);
        tooltip.textContent = `€ ${newMax}`;
    }

    fillTrack();
}

const fillBrandSelect = () => {
    const { brands } = pageData.baseValues;
    const { root } = DOMCache.filtersSideBar.brandSelect;

    Array.from(brands).forEach(([ name ]) => {
        const opt = selectOption(name, 'brand-option');
        root.append(opt);
    })
}

const fillDriveSystemSelect = () => {
    const { driveSystems } = pageData.baseValues;
    const { root } = DOMCache.filtersSideBar.driveSystemSelect;

    Array.from(driveSystems.values()).forEach(type => {
        const opt = selectOption(type, 'drive-system-option');
        root.append(opt);
    })
}

const resetFilter = () => {
    const { high, low } = pageData.baseValues.priceRange;

    pageData.filters.activeCars = new Set();
    pageData.filters.selectedBrands = new Set();
    pageData.filters.selectedDriveSystems = new Set();

    pageData.filters.priceRange.max = high;
    pageData.filters.priceRange.min = low;

    pageData.activeFilters = [];
}

const processFilters = (e) => {
    e.preventDefault();
    const { root: brand } = DOMCache.filtersSideBar.brandSelect;
    const { root: driveSystem } = DOMCache.filtersSideBar.driveSystemSelect;
    const { min, max } = DOMCache.filtersSideBar.price;

    resetFilter();

    const selectedBrands = Array.from(brand.selectedOptions);
    const selectedDriveSystems = Array.from(driveSystem.selectedOptions);

    const [ minVal, maxVal ] = [min, max].map(el => el.value);

    for (let i = 0; i < selectedBrands.length; i++) {
        const { value } = selectedBrands[i];
        if (value === 'all') break;
        pageData.filters.selectedBrands.add(value);
    }

    for (let i = 0; i < selectedDriveSystems.length; i++) {
        const { value } = selectedDriveSystems[i];
        if (value === 'all') break;
        pageData.filters.selectedDriveSystems.add(value);
    }

    pageData.filters.priceRange.min = parseFloat(minVal);
    pageData.filters.priceRange.max = parseFloat(maxVal);

    const { activeFilters } = pageData;
    const { high, low } = pageData.baseValues.priceRange;

    if (pageData.filters.selectedBrands.size > 0) activeFilters.push('selectedBrands');
    if (pageData.filters.selectedDriveSystems.size > 0) activeFilters.push('selectedDriveSystems');
    if (
        pageData.filters.priceRange.min > low
        || pageData.filters.priceRange.max < high
    ) activeFilters.push('priceRange');

    fillBrandCards();
}

const closeSideBar = (e) => {
    e.preventDefault();
    const sidebar = e.target.closest('.sidebar-section');
    sidebar.classList.remove('expand');
}

export default {
    init: () => {
        DOMCache.root = document.getElementById('car-list');
        DOMCache.contentRoot = document.getElementById('car-list-content');

        DOMCache.sideBars.roots = document.getElementsByClassName('sidebar-section');
        DOMCache.sideBars.controlButtons.carList = document.getElementById('brands');
        DOMCache.sideBars.controlButtons.filters = document.getElementById('filters');

        DOMCache.brandSideBar.cardList = document.getElementById('brand-card-list');

        DOMCache.carCards.root = document.getElementById('cards-section');
        DOMCache.carCards.cardList = document.getElementById('car-cards');

        DOMCache.filtersSideBar.brandSelect.root = document.getElementById('brand-filter');
        DOMCache.filtersSideBar.brandSelect.options = document.getElementsByClassName('brand-option');
        DOMCache.filtersSideBar.driveSystemSelect.root = document.getElementById('drive-system-filter');
        DOMCache.filtersSideBar.driveSystemSelect.options = document.getElementsByClassName('drive-system-option');
        DOMCache.filtersSideBar.price.min = document.getElementById('price-min');
        DOMCache.filtersSideBar.price.max = document.getElementById('price-max');
        DOMCache.filtersSideBar.price.slider = document.getElementById('progress-slider');
        DOMCache.filtersSideBar.price.sliderTrack = document.getElementById('progress-track');
        DOMCache.filtersSideBar.price.thumbMin = document.getElementById('min');
        DOMCache.filtersSideBar.price.thumbMax = document.getElementById('max');
        DOMCache.filtersSideBar.controlButtons.apply = document.getElementById('apply-filters');
        DOMCache.filtersSideBar.controlButtons.close = document.getElementById('close-filters');

        const { carList, filters } = DOMCache.sideBars.controlButtons;
        const { controlButtons, price } = DOMCache.filtersSideBar;
        const { apply, close } = controlButtons;

        const { slider, thumbMin, thumbMax, min, max } = price;

        slider.addEventListener('click', updatePriceRangeFromClick);
        thumbMin.addEventListener('pointerdown', updatePriceRangeFromDrag);
        thumbMax.addEventListener('pointerdown', updatePriceRangeFromDrag);

       [ carList, filters ].forEach(el => el.addEventListener('click', expandSideBar));
       close.addEventListener('click', closeSideBar);
       apply.addEventListener('click', processFilters);


        initCars();
        initBrands();
        initPriceRange();
        initDriveSystem();

        fillBrandCards();
        // fillCarsCards();
        fillBrandSelect();
        fillDriveSystemSelect();
    },
    teardown: () => {
        DOMCache = {
            root: null,
            contentRoot: null,
            sideBars: {
                roots: null,
                controlButtons: {
                    carList: null,
                    filters: null,
                },
            },
            brandSideBar: {
                cardList: null,
            },
            filtersSideBar: {
                brandSelect: {
                    root: null,
                    options: null,
                },
                driveSystemSelect: {
                    root: null,
                    options: null,
                },
                controlButtons: {
                    apply: null,
                    close: null,
                },
                price: {
                    min: null,
                    max: null,
                    slider: null,
                    thumbMin: null,
                    thumbMax: null,
                }
            },
            carCards: {
                root: null,
                cardList: null,
            }
        }

        pageData = {
            ...pageData,
            filters: {
                selectedBrands: [],
                priceRange: {
                    min: null,
                    max: null
                },
                activeCars: [],
                ...pageData.filters,
            },
            activeFilters: [],
            allBrands: new Map(),
        }
    }
}
