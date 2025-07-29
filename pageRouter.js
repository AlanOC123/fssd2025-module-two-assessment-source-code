const app = document.getElementById('main-content');

let activeModules = [];

const router = {
    'start': {
        type: 'ref',
        components: [
            { key: 'startContent', order: 1 },
            { key: 'script', order: 2 },
        ]
    },
    'showcase': {
        type: 'ref',
        components: [
            { key: 'root', order: 1 },
            { key: 'nav', order: 2 },
            { key: 'header', order: 3 },
            { key: 'showcaseContent', order: 4 },
            { key: 'footer', order: 5 },
            { key: 'script', order: 6 }
        ]
    },
    'view-car': {
        type: 'ref',
        components: [
            { key: 'root', order: 1 },
            { key: 'nav', order: 2 },
            { key: 'header', order: 3 },
            { key: 'view-car-content', order: 4 },
            { key: 'footer', order: 5 },
            { key: 'script', order: 6 },
        ]
    },
    'car-list': {
        type: 'ref',
        components: [
            { key: 'root', order: 1 },
            { key: 'nav', order: 2 },
            { key: 'header', order: 3 },
            { key: 'car-list-content', order: 4 },
            { key: 'footer', order: 5 },
            { key: 'script', order: 6 },
        ]
    },
    'about': {
        type: 'ref',
        components: [
            { key: 'root', order: 1 },
            { key: 'nav', order: 2 },
            { key: 'header', order: 3 },
            { key: 'about-content', order: 4 },
            { key: 'footer', order: 5 },
            { key: 'script', order: 6 },
        ]
    },
    'site-map': {
        type: 'ref',
        components: [
            { key: 'root', order: 1 },
            { key: 'nav', order: 2 },
            { key: 'header', order: 3 },
            { key: 'site-map-content', order: 4 },
            { key: 'footer', order: 5 },
            { key: 'script', order: 6 },
        ]
    },
    'startContent': {
        type: 'end',
        path: './pages/start/',
    },
    'showcaseContent': {
        type: 'end',
        path: './pages/showcase/',
    },
    'view-car-content': {
        type: 'end',
        path: './pages/viewCar/',
    },
    'car-list-content': {
        type: 'end',
        path: './pages/carList/',
    },
    'about-content': {
        type: 'end',
        path: './pages/about/',
    },
    'site-map-content': {
        type: 'end',
        path: './pages/siteMap/',
    },
    'header': {
        type: 'end',
        path: './pages/components/header/'
    },
    'footer': {
        type: 'end',
        path: './pages/components/footer/'
    },
    'nav': {
        type: 'end',
        path: './pages/components/nav/'
    },
    'root': {
        type: 'root',
        path: './pages/root/'
    },
    'script': {
        type: 'run'
    }
}

const htmlCache = new Map();
const moduleCache = new Map();

const clearRoot = () => app.innerHTML = '';

const getTemplateHTML = async (path) => {
    if (!path) return null;

    if (htmlCache.has(path)) return htmlCache.get(path);

    const res = await fetch(path);
    const html = await res.text();

    try {
        htmlCache.set(path, html);
        return html;
    } catch (err) {
        console.error(err);
    };
}

const getTemplateModule = async (path) => {
    if (!path) return;

    if (moduleCache.has(path)) return moduleCache.get(path);

    const module = await import(path);

    return module;
}

const createTemplateNode = async (html) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.cloneNode(true);
}

const executeScripts = (node) => {
    const scripts = node.querySelectorAll('script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');

        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.textContent = oldScript.textContent;
        }

        if (oldScript.type === 'module') {
            newScript.type = 'module'
        } else {
            newScript.type = 'text/javascript';
        }

        document.body.append(newScript);
        oldScript.remove();
    });
}

const clearActiveModules = () => {
    for (const module of activeModules) {
        const { teardown } = module.default;
        if (teardown && typeof teardown === 'function') {
            teardown();
        }
    }

    return [];
}

const getComponent = async (key) => {
    let element = null;
    let module = null;
    const { type, path } = router[key];
    if (type === 'root') return { element, module }

    const htmlPath = `${path}page.html`;
    const modulePath = `${path}script.js`;

    const html = await getTemplateHTML(htmlPath);
    module = await getTemplateModule(modulePath);

    const node = await createTemplateNode(html);
    element = node.firstElementChild;
    executeScripts(element);

    return { element, module };
}

const getPageStructure = async (components, caller) => {
    const nodes = [];
    const modules = [];
    let root = null;

    for (const component of components) {
        const { key } = component;
        if (key === 'script') continue;

        if (key === 'root') {
            const { path } = router[key];
            const htmlPath = `${path}page.html`;
            const html = await getTemplateHTML(htmlPath);
            const node = await createTemplateNode(html);
            root = node.firstElementChild;
            root.id = caller;
            continue
        }

        const { element, module } = await getComponent(key);
        nodes.push(element);
        modules.push(module);
    }

    return { nodes, modules, root }
}

const appendNodesToRoot = async (root, nodes) => {
    for (const node of nodes) {
        root.append(node);
    }

    return true;
}

const loadPage = async (key) => {
    activeModules = clearActiveModules();
    clearRoot();

    let startPoint = router[key];
    let rootNode = app;

    const { components } = startPoint;

    const { root, modules, nodes } = await getPageStructure(components, key);

    if (root) {
        rootNode.append(root)
        rootNode = root;
    }

    const res = await appendNodesToRoot(rootNode, nodes);

    if (res) {
        for (const module of modules) {
            const { init } = module.default;
            if (typeof init === 'function') init();
        }
    }

    activeModules = [...modules];
}

export default {
    loadPage
}
