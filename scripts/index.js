async function readTextFile(fileUrl) {
    const response = await fetch(fileUrl);
    let jsonFile;
    if (response.ok) {
        jsonFile = await response.text();
        return jsonFile;
    }
}
function createInputs(form, inputData) {
    let input;
    switch (inputData.input.type) {
        case 'file':
            input = fileInput(form, inputData);
            break;
        case 'technology':
            input = technologyInputs(form, inputData);
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
    if (inputData.input.required) { input.setAttribute('required', inputData.input.required ) }


    //===========================================
    let divCheckbox;
    if (inputData.input.type === 'textarea') {
        input = document.createElement(inputData.input.type);
        input.setAttribute('rows', '2' );
    } else if(inputData.input.type === 'checkbox') {
        input = document.createElement('input');
        divCheckbox = document.createElement('div');
    } else if(inputData.input.type === 'color') {
        let type = "colors";
        inputData.input[type].forEach((color) =>{
            let checkBoxColor = document.createElement('input');
            let labelBlockColor = document.createElement('label');
            let divColors = document.createElement('div');
            checkBoxColor.setAttribute('type', 'checkbox');
            checkBoxColor.setAttribute('id', color);
            checkBoxColor.setAttribute('name', color);
            labelBlockColor.setAttribute('for', color);
            labelBlockColor.setAttribute('style', `background-color: ${color}`)
            divColors.classList.add('color-block');
            divColors.appendChild(checkBoxColor);
            divColors.appendChild(labelBlockColor);
            form.appendChild(divColors);
        });
    } else {
        input = document.createElement('input');
    }
    if(inputData.input.type !== 'color' && inputData.input.type !== 'technology') {
        input.setAttribute('type', inputData.input.type );
        input.setAttribute('name', inputData.label );
        input.setAttribute('id', inputData.label );
    }
    let inputLabel = document.createElement('label');
    inputLabel.innerHTML = inputData.label;
    inputLabel.setAttribute('for', inputData.label );
    if (inputData.input.type === 'checkbox') {
        divCheckbox.classList.add('checkbox-block')
        divCheckbox.appendChild(input);
        divCheckbox.appendChild(inputLabel);
        form.appendChild(divCheckbox);
    } else if(inputData.input.type === 'color') {
    } else {
        form.appendChild(inputLabel);
        form.appendChild(input);
    }
}
function createReference(form, formText) {
    let checkboxData = formText.references[0];
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', checkboxData.input.type );
    checkbox.setAttribute('id', 'viewauthor');
    checkbox.setAttribute('name', 'viewauthor');
    checkbox.required = checkboxData.input.required;
    checkbox.checked = checkboxData.input.checked !== "false";
    let labelCheckboxData = formText.references[1];
    let labelCheckbox = document.createElement('label');
    labelCheckbox.setAttribute('for', checkbox.getAttribute('id'));
    let labelLink = document.createElement('a');
    labelLink.setAttribute('href', labelCheckboxData.ref);
    labelLink.innerHTML = labelCheckboxData.text;
    labelCheckbox.innerHTML = labelCheckboxData["text without ref"] + " ";
    labelCheckbox.appendChild(labelLink);
    let divCheckbox = document.createElement('div');
    divCheckbox.classList.add('checkbox-block')
    divCheckbox.appendChild(checkbox);
    divCheckbox.appendChild(labelCheckbox);
    form.appendChild(divCheckbox);
}
function createButton(form, formText) {
    let buttonData = formText.buttons[0];
    let button = document.createElement('input');
    button.setAttribute('type', 'submit')
    button.setAttribute('value', buttonData.text);
    form.appendChild(button);
}
async function createForm(formText){
    let formBlock = document.querySelector('.form-block');
    const form = document.createElement('form');
    form.setAttribute('name', 'form');
    form.setAttribute('id', 'form');

    formText.fields.forEach((inputData) => {
        createInputs(form, inputData);
    });

    if (formText.references) { createReference(form, formText); }

    if (formText.buttons) { createButton(form, formText); }

    formBlock.appendChild(form);
    return form;
}
async function forms(fileUrl) {
    const text = await readTextFile(fileUrl);
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
forms("./schemas/interview.json");