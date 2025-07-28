class Car {
    #brand = {};
    #name = '';
    #imgDirRoot = '';
    #performance = {};
    #info = {};
    #generalOverview = '';
    #performanceOverview = '';
    #units = {
        weight: 'KG',
        power: 'kWh',
        speed: 'km/h',
        acceleration: 's',
        engineSize: 'cm3',
        len: 'mm',
        width: 'mm',
    }

    constructor(core) {
        const {
            brand = {},
            name = '',
            imgDirRoot = '',
            performance = {},
            info = {},
            generalOverview = '',
            performanceOverview = '',
        } = core;

        this.#brand = { ...brand };
        this.#name = name;
        this.#imgDirRoot = imgDirRoot;
        this.#performance = { ...performance };

        this.#info = info;
        this.#generalOverview = generalOverview;
        this.#performanceOverview = performanceOverview;
    }

    getBrand = () => Object.assign({}, this.#brand);
    getName = () => this.#name;
    getImages = () => {
        const result = {
            cover: null,
            secondary: {
                root: null,
                interior: {
                    root: null,
                    imgPaths: [],
                },
                exterior: {
                    root: null,
                    imgPaths: [],
                },
            }
        }

        result.cover = `${this.#imgDirRoot}cover/img.png`;
        result.secondary.root = `${this.#imgDirRoot}secondary/`;

        result.secondary.interior.root = `${result.secondary.root}interior/`;
        result.secondary.exterior.root = `${result.secondary.root}exterior/`;

        ['interior', 'exterior'].forEach(path => {
            const { root, imgPaths } = result.secondary[path];
            for (let i = 0; i < 3; i++) {
                imgPaths.push(`${root}img-${i + 1}.png`)
            }
        });

        return result;
    }

    getPerformance = () => {
        return {
            weight: { unit: this.#units.weight, value: this.#performance.weight },
            power: { unit: this.#units.power, value: this.#performance.power },
            speed: { unit: this.#units.speed, value: this.#performance.speed },
            acceleration: { unit: this.#units.acceleration, value: this.#performance.acceleration },
            overview: this.#performanceOverview
        }
    }

    getTableData = () => {
        return {
            ...this.getPerformance(),
            price: this.#info.price,
            fuelType: this.#info.fuelType,
            engineSize: {
                unit: this.#units.engineSize,
                value: this.#info.engineSize,
            },
            transmission: this.#info.transmission,
            driveSystem: this.#info.driveSystem,
            len: {
                unit: this.#units.len,
                value: this.#info.len
            },
            width: {
                unit: this.#units.width,
                value: this.#info.width
            }
        }
    }

    getGeneralOverview = () => this.#generalOverview;
}

export { Car };
