function createLabel(inputData) {
    let inputLabel = document.createElement('label');
    inputLabel.innerHTML = inputData.label;
    inputLabel.setAttribute('for', inputData.label );
    return inputLabel;
}
function simpleInput(form, inputData, needLabel = false) {
    let input = document.createElement('input');
    input.setAttribute('type', inputData.input.type );
    let inputLabel;
    if (inputData.label) {
        input.setAttribute('name', inputData.label );
        input.setAttribute('id', inputData.label );
        inputLabel = createLabel(inputData);
        form.appendChild(inputLabel);
    }
    form.appendChild(input);
    if (needLabel) { return [input, inputLabel]; }
    return input;
}
function textareaInput(form, inputData) {
    let inputTextarea = document.createElement('textarea');
    const input = simpleInput(form, inputData);
    form.replaceChild(inputTextarea, input);
    inputTextarea.setAttribute('name', inputData.label );
    inputTextarea.setAttribute('id', inputData.label );
    return inputTextarea;
}
function checkboxInput(form, inputData) {
    const checkboxArr = simpleInput(form, inputData, true);
    const CheckboxBlock = document.createElement('div');
    CheckboxBlock.classList.add('checkbox-block');
    checkboxArr.forEach((el) => {
        el.parentNode.insertBefore(CheckboxBlock, el);
        CheckboxBlock.appendChild(el);
    })
    return checkboxArr[0];
}
function colorInputs(form, inputData) {
    inputData.input.colors.forEach((color) =>{
        let element = document.createElement('input');
        let elementLabel = document.createElement('label');
        let elementBlock = document.createElement('div');
        element.setAttribute('type', 'checkbox');
        elementLabel.setAttribute('style', `background-color: ${color}`);
        element.setAttribute('id', color);
        element.setAttribute('name', color);
        elementLabel.setAttribute('for', color);
        elementBlock.classList.add(`color-block`);
        elementBlock.appendChild(element);
        elementBlock.appendChild(elementLabel);
        form.appendChild(elementBlock);
    });
}
function technologyInput(form, inputData) {
    let elementLabel = document.createElement('label');
    let elementBlock = document.createElement('select');
    elementLabel.innerHTML = inputData.label;
    let standardOption = document.createElement('option');
    elementBlock.setAttribute('multiple', 'true');
    elementBlock.setAttribute('size', '5');

    standardOption.innerHTML = "none";
    elementBlock.appendChild(standardOption);
    inputData.input.technologies.forEach((technology) => {
        let element = document.createElement('option');
        element.innerHTML = technology;
        element.setAttribute('value', technology);
        elementBlock.appendChild(element);
    });

    form.appendChild(elementLabel);
    form.appendChild(elementBlock);
    return elementBlock;
}
function fileInput(form, inputData) {
    const input = simpleInput(form, inputData);
    if (inputData.input.filetype) {
        let acceptFiles = ""; let i = 0;
        inputData.input.filetype.forEach((type) => { acceptFiles += (i === 0) ? "." + type : ",." + type; i++; });
        input.setAttribute('accept', acceptFiles);
    }
    if (inputData.input.multiple) input.setAttribute('multiple', 'true');
    input.classList.add('file-input');
    let button = createLabel(inputData);
    button.innerHTML = "Выбрать файл";
    button.classList.add('file-btn');
    let text = document.createElement('span');
    text.classList.add('file-text');
    let fileBlock = document.createElement('div');
    fileBlock.classList.add('input-file');
    form.appendChild(fileBlock);
    fileBlock.appendChild(text);
    fileBlock.appendChild(input);
    fileBlock.appendChild(button);

    return input;
}