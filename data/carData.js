const brands = {
    ferrari: {
        name: 'Ferrari',
        logoPath: './assets/logos/ferrari-logo.png',
        brandClrs: {
            pri: '#E42528',
            sec: '#F8E823',
        }
    },
    alpine: {
        name: 'Alpine',
        logoPath: './assets/logos/alpine-logo.png',
        brandClrs: {
            pri: '#E42528',
            sec: '#F8E823',
        }
    },
    lamborghini: {
        name: 'Lamborghini',
        logoPath: './assets/logos/lamborghini-logo.png',
        brandClrs: {
            pri: '#E2DAC9',
            sec: '#B4A272',
        }
    },
    mclaren: {
        name: 'McLaren',
        logoPath: './assets/logos/mclaren-logo.png',
        brandClrs: {
            pri: '#FF8000',
            sec: '#000000',
        }
    },
    'aston-martin': {
        name: 'Aston Martin',
        logoPath: './assets/logos/astonmartin-logo.png',
        brandClrs: {
            pri: '#037A68',
            sec: '#FFFFFF',
        }
    },
    pininfarina: {
        name: 'Pininfarina',
        logoPath: './assets/logos/pininfarina-logo.png',
        brandClrs: {
            pri: '#00665e',
            sec: '#081427',
        }
    },
    lotus: {
        name: 'Lotus',
        logoPath: './assets/logos/lotus-logo.png',
        brandClrs: {
            pri: '#ffff00',
            sec: '#101724',
        }
    },
    bugatti: {
        name: 'Bugatti',
        logoPath: './assets/logos/bugatti-logo.png',
        brandClrs: {
            pri: '#004bfa',
            sec: '#999999',
        }
    },
    'redbull': {
        name: 'Red Bull',
        logoPath: './assets/logos/redbull-logo.png',
        brandClrs: {
            pri: '#db0a40',
            sec: '#0d2843',
        }
    },
    zenvo: {
        name: 'Zenvo',
        logoPath: './assets/logos/zenvo-logo.png',
        brandClrs: {
            pri: '#D0353B',
            sec: '#FFFFFF',
        }
    },
    porsche: {
        name: 'Porsche',
        logoPath: './assets/logos/porsche-logo.png',
        brandClrs: {
            pri: '#B12B28',
            sec: '#404044',
        }
    },
    bertone: {
        name: 'Bertone',
        logoPath: './assets/logos/bertone-logo.png',
        brandClrs: {
            pri: '#ff4409',
            sec: '#f3f0eb',
        }
    },
    pagani: {
        name: 'Pagani',
        logoPath: './assets/logos/pagani-logo.png',
        brandClrs: {
            pri: '#ED3833',
            sec: '#000000',
        }
    },
    rodin: {
        name: 'Rodin',
        logoPath: './assets/logos/rodin-logo.png',
        brandClrs: {
            pri: '#C2A76F',
            sec: '#FFFFFF',
        }
    },
}

const getBrand = (key) => ({...brands[key]});
const getImgDirPath = (make, model) => `./assets/carImages/${make}/${model}/`;

const cars = [
    {
        brand: getBrand('ferrari'),
        name: 'SF90 Stradale',
        imgDirRoot: getImgDirPath('ferrari', 'sf90'),
        performance: {
            weight: 1570,
            power: 735,
            speed: 340,
            acceleration: 2.5,
        },
        info: {
            price: 500000,
            fuelType: 'Hybrid',
            engineSize: 3990,
            transmission: '8 Speed Dual-Clutch- Automatic',
            driveSystem: 'All Wheel Drive',
            len: 4710,
            width: 1972,
        },
        generalOverview: 'The Ferrari SF90 Stradale marks a bold leap into the hybrid era for the iconic Italian marque, blending traditional Ferrari styling with cutting-edge technology. As the brand’s first series-production plug-in hybrid, the SF90 is a masterclass in form and function, featuring aggressive aerodynamics, a low-slung silhouette, and a cockpit that merges luxury with motorsport influence. Its name pays tribute to Scuderia Ferrari’s 90th anniversary, reflecting a car that honors heritage while driving fearlessly into the future.',
        performanceOverview: 'At its heart, the SF90 Stradale boasts a formidable powertrain: a twin-turbocharged V8 engine paired with three electric motors, producing a combined 986 horsepower. This allows it to rocket from 0 to 100 km/h in just 2.5 seconds, making it the fastest Ferrari road car ever built. The advanced all-wheel-drive system, torque vectoring, and a suite of active dynamics controls work together to deliver unparalleled grip and responsiveness. Whether in silent eDrive mode or full-throttle Track mode, the SF90 is engineered to deliver both precision and raw exhilaration in equal measure.',
    },
    {
        brand: getBrand('lamborghini'),
        name: 'Revuelto',
        imgDirRoot: getImgDirPath('lamborghini', 'revuelto'),
        performance: {
            weight: 1941,
            power: 747,
            speed: 356,
            acceleration: 2.5,
        },
        info: {
            price: 600000,
            fuelType: 'Hybrid',
            engineSize: 6498,
            transmission: '8 Speed Dual-Clutch - Automatic',
            driveSystem: 'All Wheel Drive',
            len: 4947,
            width: 2266,
        },
        generalOverview: 'The Lamborghini Revuelto is a revolutionary step forward for the iconic Italian brand, ushering in a new era of electrified performance without abandoning its unmistakable DNA. As Lamborghini’s first plug-in hybrid V12 flagship, the Revuelto combines sharp, futuristic styling with classic raging bull aggression. Its angular design, Y-shaped lighting signatures, and aircraft-inspired interior embody a vision of the supercar reimagined — one that honors tradition while embracing innovation.',
        performanceOverview: 'Beneath its carbon-fiber skin, the Revuelto unleashes a staggering 1,001 horsepower through a combination of a naturally aspirated 6.5-liter V12 and three electric motors. This hybrid setup powers all four wheels, enabling explosive acceleration and improved agility through electric torque vectoring. With a lightning-fast 8-speed dual-clutch transmission and an electric-only driving mode for urban efficiency, the Revuelto seamlessly blends brutal power with modern versatility. It\'s not just the most powerful Lamborghini ever built — it\'s also the most advanced, signaling the future of the supercar experience.',
    },
    {
        brand: getBrand('lamborghini'),
        name: 'Temerario',
        imgDirRoot: getImgDirPath('lamborghini', 'temerario'),
        performance: {
            weight: 1690,
            power: 920,
            speed: 343,
            acceleration: 2.7,
        },
        info: {
            price: 260000,
            fuelType: 'Plug‑In Hybrid (V8 + 3× electric)',
            engineSize: 3995,
            transmission: '8‑Speed Dual‑Clutch Automatic',
            driveSystem: 'All Wheel Drive',
            len: 4706,
            width: 1996,
        },
        generalOverview: 'The Lamborghini Temerario marks the next chapter for Sant’Agata’s hybrid era—swapping the V10 for a new twin‑turbo 4.0‑liter V8 and three electrics. With angular, jet‑inspired styling and advanced torque‑vectoring, it aims to rival the Revuelto and redefine modern Lambo.',

        performanceOverview: 'Under its sculpted carbon‑fiber body, the Temerario uses a 10,000‑rpm V8 producing 789 hp, combined with three electric motors for a total of 920 hp. It rockets from 0–100 km/h in just 2.7 s and reaches up to 343 km/h. Featuring drift modes, seven driving modes including track and Città, and advanced aerodynamics (up to 118% more downforce than Huracán EVO, or 158% with lightweight Alleggerita pack), it blends blistering performance with hybrid efficiency.',
    },
    {
        brand: getBrand('mclaren'),
        name: 'W1',
        imgDirRoot: getImgDirPath('mclaren', 'w1'),
        performance: {
            weight: 1399,
            power: 939,
            speed: 350,
            acceleration: 2.7,
        },
        info: {
            price: 2200000,
            fuelType: 'Hybrid',
            engineSize: 3988,
            transmission: '8 Speed Dual-Clutch Automatic',
            driveSystem: 'Rear Wheel Drive',
            len: 4635,
            width: 2074,
        },
        generalOverview: 'The McLaren W1 is a cutting-edge concept supercar that blends McLaren’s iconic design language with next-generation innovation. Sculpted with precision and aerodynamic intent, the W1 showcases a futuristic aesthetic with aggressive lines, active aero features, and a cockpit centered on driver engagement. Designed as a showcase of McLaren’s vision for the future of high-performance motoring, the W1 balances track-bred heritage with street-legal refinement, offering a bold statement in carbon fiber and engineering artistry.',
        performanceOverview: 'Underneath the striking exterior, the McLaren W1 delivers blistering performance driven by a hybrid powertrain that combines an ultra-lightweight V8 engine with high-output electric motors. This setup allows for instantaneous torque delivery, razor-sharp throttle response, and a top speed exceeding 220 mph. With advanced torque vectoring, adaptive suspension, and an intelligent launch control system, the W1 doesn’t just accelerate—it attacks the road. Whether on a straight or carving through corners, the W1 remains firmly planted, making it a true showcase of McLaren’s engineering excellence and commitment to performance without compromise.',
    },
    {
        brand: getBrand('pininfarina'),
        name: 'B95',
        imgDirRoot: getImgDirPath('pininfarina', 'b95'),
        performance: {
            weight: 2050,
            power: 1900,
            speed: 300,
            acceleration: 1.9,
        },
        info: {
            price: 4200000,
            fuelType: 'Fully Electric',
            engineSize: 'Electic',
            transmission: 'Single-Speed Direct Drive',
            driveSystem: 'All Wheel Drive',
            len: 4815,
            width: 2000,
        },
        generalOverview: 'The Pininfarina B95 is the world’s first pure-electric open-top hypercar. Limited to just 10 units, it features Italian craftsmanship, Formula E technology, and jaw-dropping presence.',
        performanceOverview: 'Producing 1900 hp via quad motors, the B95 rockets to 100 km/h in under 2 seconds. With F1-style aeroscreens and a 120 kWh battery, it offers both speed and grand touring range.',
    },
    {
        brand: getBrand('lotus'),
        name: 'Evija X',
        imgDirRoot: getImgDirPath('lotus', 'evija-x'),
        performance: {
            weight: 1680,
            power: 2000,
            speed: 345,
            acceleration: 2.0,
        },
        info: {
            price: 2400000,
            fuelType: 'Fully Electric',
            engineSize: 0,
            transmission: 'Single-Speed Automatic',
            driveSystem: 'All Wheel Drive',
            len: 4459,
            width: 2000,
        },
        generalOverview: 'The Evija X is Lotus’s no-holds-barred electric hypercar, a track-focused evolution of the original Evija. With aero upgrades and chassis recalibration, it represents the pinnacle of Lotus performance.',
        performanceOverview: 'With 2000 hp on tap and motors at each wheel, the Evija X is a torque-vectoring monster. Lightweight carbon monocoque, regen braking, and record-chasing agility make it an electric benchmark.',
    },
    {
        brand: getBrand('bugatti'),
        name: 'Tourbillon',
        imgDirRoot: getImgDirPath('bugatti', 'tourbillon'),
        performance: {
            weight: 1995,
            power: 1800,
            speed: 445,
            acceleration: 2.0,
        },
        info: {
            price: 3700000,
            fuelType: 'Hybrid',
            engineSize: 8000,
            transmission: '8-Speed Dual-Clutch Automatic',
            driveSystem: 'All Wheel Drive',
            len: 4890,
            width: 2000,
        },
        generalOverview: 'The Bugatti Tourbillon replaces the Chiron with a stunning hybrid V16 platform. Named after a horological complication, it embodies mechanical beauty, raw power, and modern electrification.',
        performanceOverview: 'Packing a naturally aspirated 8.3L V16 and triple motors for 1800 hp, the Tourbillon exceeds 440 km/h. Expect Chiron-level brutality with instant torque and an electric-only city mode.',
    },
    {
        brand: getBrand('aston-martin'),
        name: 'Valhalla',
        imgDirRoot: getImgDirPath('aston-martin', 'valhalla'),
        performance: {
            weight: 1550,
            power: 1012,
            speed: 350,
            acceleration: 2.5,
        },
        info: {
            price: 800000,
            fuelType: 'Hybrid',
            engineSize: 4000,
            transmission: '8-Speed DCT',
            driveSystem: 'All Wheel Drive',
            len: 4490,
            width: 1990,
        },
        generalOverview: 'The Valhalla brings Aston Martin’s F1 expertise to the road. With a new carbon monocoque, advanced aero, and a Mercedes-AMG-sourced hybrid V8, it blends refinement with apex-hunting power.',
        performanceOverview: 'With 1012 hp, Valhalla delivers mid-engine balance and high-speed capability. Carbon brakes, variable aero, and a low center of gravity make it a true supercar built for circuits and canyon runs.',
    },
    {
        brand: getBrand('redbull'),
        name: 'RB17',
        imgDirRoot: getImgDirPath('redbull', 'rb17'),
        performance: {
            weight: 900,
            power: 1200,
            speed: 350,
            acceleration: 2.2,
        },
        info: {
            price: 5000000,
            fuelType: 'Hybrid',
            engineSize: 4500,
            transmission: '6‑speed sequential',
            driveSystem: 'Rear Wheel Drive',
            len: 5000,
            width: 2000,
        },
        generalOverview: 'The Red Bull RB17 is a limited-production, ultra-light hybrid hypercar built by Red Bull Advanced Technologies, designed by Adrian Newey for track‑only use. Scheduled for production in 2025, it blends F1‑inspired aerodynamics and engineering with a Cosworth 4.5 L V10 and electric support.',
        performanceOverview: 'With a naturally aspirated V10 revving to ~15,000 rpm and ~1,000 hp, supplemented by ~200 hp from an electric motor, total output reaches ~1,200 PS. At ~900 kg, it promises exhilarating track performance. Limited to ~50 units from 2025 production.',
    },
    {
        brand: getBrand('zenvo'),
        name: 'Aurora',
        imgDirRoot: getImgDirPath('zenvo', 'aurora'),
        performance: {
            weight: 1600,
            power: 1850,
            speed: 330,
            acceleration: 2.0
        },
        info: {
            price: 2400000,
            fuelType: 'Hybrid',
            engineSize: 6000,
            transmission: '7‑Speed Dual‑Clutch',
            driveSystem: 'All Wheel Drive',
            len: 4836,
            width: 2020
        },
        generalOverview: 'The Zenvo Aurora hypercar prototype is set to debut at Goodwood 2025. Danish-engineered, it delivers near-Formula 1 performance and bold aesthetics in a limited-run production.',
        performanceOverview: 'Expected to deliver ~1,850 hp from a hybrid V12 platform, with acceleration near 2.0 s and top speeds around ~330 km/h. Aurora represents extreme European craftsmanship and cutting-edge hybrid power.'
    },
    {
        brand: getBrand('porsche'),
        name: '499P‑Road',
        imgDirRoot: getImgDirPath('porsche', '499p-road'),
        performance: {
            weight: 1400,
            power: 900,
            speed: 340,
            acceleration: 2.6
        },
        info: {
            price: 2500000,          // estimated €2.5 M
            fuelType: 'Hybrid (derived from LMDh racecar)',
            engineSize: 4000,
            transmission: '7‑Speed Dual‑Clutch',
            driveSystem: 'All Wheel Drive',
            len: 5100,
            width: 2000
        },
        generalOverview: 'Based on Porsche’s 499P Le Mans Hypercar, the 499P‑Road is the road homologation variant launching in 2025—combining race-derived hybrid tech with road usability.',
        performanceOverview: 'Expected to feature ~900 hp hybrid drivetrain derived from WEC 499P, 0‑100 km/h in ~2.6 s, top speed around 340 km/h, plus active aero and track-level dynamics.'
    },
    {
        brand: getBrand('bertone'),
        name: 'GB110',
        imgDirRoot: getImgDirPath('bertone', 'gb110'),
        performance: {
            weight: 1600,
            power: 1124,
            speed: 350,
            acceleration: 3.5,
        },
        info: {
            price: 1800000,
            fuelType: 'Naturally Aspirated V10',
            engineSize: 5200,
            transmission: '7‑Speed Dual‑Clutch Automatic',
            driveSystem: 'All Wheel Drive',
            len: 4600,
            width: 2000,
        },
        generalOverview: 'The Bertone GB110 is a resurrection of the legendary Italian coachbuilder, limited to just 33 units and powered by a Huracán‑derived V10 tuned to 1,124 hp. Debuted in mid‑2024, it blends retro wedge styling with modern hypercar performance.',
        performanceOverview: 'Using a tuned 5.2 L Lamborghini V10, the GB110 accelerates rapidly and claims a top speed near 350 km/h. Its all‑wheel‑drive system and lightweight carbon/fibre construction deliver a visceral driving experience with Italian flair.'
    },
    {
        brand: getBrand('pagani'),
        name: 'Utopia',
        imgDirRoot: getImgDirPath('pagani', 'utopia'),
        performance: {
            weight: 1280,
            power: 864,
            speed: 350,
            acceleration: 2.7,
        },
        info: {
            price: 2200000,
            fuelType: 'Naturally Aspirated V12',
            engineSize: 6500,
            transmission: '7‑Speed Manual or Automated Manual',
            driveSystem: 'Rear Wheel Drive',
            len: 4597,
            width: 2037,
        },
        generalOverview: 'Pagani’s Utopia (2022‑present) and its Roadster variant (2024) represents the pinnacle of analogue craftsmanship—with a roaring AMG V12 and fully manual driving experience despite hypercar performance.',
        performanceOverview: 'With ~864 hp from a 6.5 L V12, all‑carbon monocoque and bespoke suspension, the Utopia rockets to 100 km/h in under 3 s and reaches ~350 km/h. It stands out in an increasingly hybrid/hybrid world by celebrating genuine mechanical purity.'
    },
    {
        brand: getBrand('rodin'),
        name: 'FZERO',
        imgDirRoot: getImgDirPath('rodin', 'fzero'),
        performance: {
            weight: 698,
            power: 1175,
            speed: 360,
            acceleration: 1.5,
        },
        info: {
            price: 1800000,
            fuelType: 'Hybrid (4.0 L twin‑turbo V10 + electric)',
            engineSize: 4000,
            transmission: 'Sequential',
            driveSystem: 'Rear Wheel Drive',
            len: 5500,
            width: 2200,
        },
        generalOverview: 'Rodin Cars (New Zealand/UK) FZERO is an ultra‑lightweight hybrid hypercar aimed at track supremacy—claiming to lap ~7 seconds quicker than an F1 car around Albert Park. Built in limited numbers using 3D‑printed titanium and composites.',
        performanceOverview: 'Featuring a ~4.0 L hybrid V10, about 1,175 hp and just ~698 kg, the FZERO delivers brutally efficient power and aerodynamic prowess—making it one of the most extreme performance machines of 2025.'
    },
]

export default {
    getCars: () => Array.from(cars),
}
