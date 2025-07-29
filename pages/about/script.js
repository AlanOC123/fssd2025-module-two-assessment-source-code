const DOMCache = {

}

const log = (e) => console.log(e.target)

export default {
    init: () => {

    },
    teardown: () => {
        window.removeEventListener('click', log);
    }
}
