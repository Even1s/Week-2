 /*
async function readTextFile(fileUrl) {
    const response = await fetch(fileUrl);
    let jsonFile;
    if (response.ok) {
        jsonFile = await response.text();
        return jsonFile;
    }
}
 */
 // аналог если потребуется прочитать файл
function createInputs(form, inputData) {
    let input;
    switch (inputData.input.type) {
        case 'file':
            input = fileInput(form, inputData);
            break;
        case 'technology':
            input = technologyInput(form, inputData);
            break;
        case 'color':
            colorInputs(form, inputData);
            break;
        case 'checkbox':
            input = checkboxInput(form, inputData);
            break;
        case 'textarea':
            input = textareaInput(form, inputData);
            break;
        default:
            input = simpleInput(form, inputData);
            break;
    }
    if (inputData.input.required) input.setAttribute('required', inputData.input.required );
    if (inputData.input.placeholder) input.setAttribute('placeholder', inputData.input.placeholder);
    if (inputData.input.mask) input.setAttribute('placeholder', inputData.input.mask);
}
function createReference(form, references) {
    let textBlock = document.createElement('div');
    textBlock.classList.add('checkbox-block');
    let i = 0;
    references.forEach((elementData) => {
        let element;
        if (elementData.input) {
            let checkboxData = references[0].input;
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', checkboxData.type );
            checkbox.setAttribute('id', 'check');
            checkbox.setAttribute('name', 'check');
            checkbox.required = checkboxData.required;
            checkbox.checked = checkboxData.checked !== "false";
            element = checkbox;
            i++;
        } else if (elementData["text without ref"]) {
            let labelCheckbox = document.createElement('label');
            let labelLink = document.createElement('a');
            if (i!==0) labelCheckbox.setAttribute('for', 'check');
            labelLink.setAttribute('href', elementData.ref);
            labelLink.innerHTML = elementData.text;
            labelCheckbox.innerHTML = elementData["text without ref"] + " ";
            labelCheckbox.appendChild(labelLink);
            element = labelCheckbox;
        } else {
            let labelCheckbox = document.createElement('label');
            let labelLink = document.createElement('a');
            if (i!==0) labelCheckbox.setAttribute('for', 'check');
            labelLink.setAttribute('href', elementData.ref);
            labelLink.innerHTML = elementData.text;
            labelCheckbox.appendChild(labelLink);
            element = labelCheckbox;
        }
        textBlock.appendChild(element);
    });
    form.appendChild(textBlock);
}
function createButton(form, formText) {
    formText.buttons.forEach((buttonData) => {
        let button = document.createElement('input');
        button.setAttribute('type', 'submit')
        button.setAttribute('value', buttonData.text);
        form.appendChild(button);
    });
}
async function createForm(formText){
    let formBlock = document.querySelector('.form-block');
    const form = document.createElement('form');
    form.setAttribute('name', 'form');
    form.setAttribute('id', 'form');

    formText.fields.forEach((inputData) => {
        createInputs(form, inputData);
    });

    if (formText.references) { createReference(form, formText.references, formText); }

    if (formText.buttons) { createButton(form, formText); }

    formBlock.appendChild(form);
    return form;
}
async function forms(text) {
    // аналог если потребуется прочитать файл
    // const text = await readTextFile(fileUrl);
    let formText = JSON.parse(text);
    await createForm(formText);
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = Array.from(form.querySelectorAll('input')).reduce((acc, input) => ({
            ...acc,
            [input.id]: input.value
        }), {});
        /*
        const response = await fetch("storage/posts.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        console.log(response);
        */
        console.log(JSON.stringify(formData));
    })
}
function deleteForm() {
    if (document.querySelector("form")) {
        document.querySelector('.form-block').removeChild(document.querySelector("form"))
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#load').addEventListener('click', () => {
        let file = document.querySelector('#fileLoad').files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function () {
            deleteForm();
            await forms(reader.result);
        }
        reader.onerror = function() {
            console.log(reader.error);
        }
    });
    document.querySelector('#clear').addEventListener('click', deleteForm);
});
