const selectOption = (val, className) =>{
    const el = document.createElement('option');
    el.value = val;
    el.textContent = val;
    el.classList.add(className);
    return el;
}

export default selectOption;
