async function readTextFile(fileUrl) {
    const response = await fetch(fileUrl);
    let jsonFile;
    if (response.ok) {
        jsonFile = await response.text();
        return jsonFile;
    }
}
async function createFormAddPost(){
    const text = await readTextFile("./schemas/addpost.json");
    let AddPost = JSON.parse(text);
    let addPostBlock = document.querySelector('.addpost');
    const form = document.createElement('form');
    form.setAttribute('name', 'addpost');
    form.setAttribute('id', 'addpost');

    AddPost.fields.forEach((inputData) => {
        let input;
        if (inputData.input.type === 'textarea') {
            input = document.createElement(inputData.input.type);
            input.setAttribute('rows', '2' );
        } else { input = document.createElement('input'); }
        input.setAttribute('type', inputData.input.type );
        input.setAttribute('name', inputData.label );
        input.setAttribute('id', inputData.label );
        if (inputData.input.required) { input.setAttribute('required', inputData.input.required ) }
        let inputLabel = document.createElement('label');
        inputLabel.innerHTML = inputData.label;
        inputLabel.setAttribute('for', inputData.label );
        form.appendChild(inputLabel);
        form.appendChild(input);
    });

    let checkboxData = AddPost.references[0];
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', checkboxData.input.type );
    checkbox.setAttribute('id', 'viewauthor');
    checkbox.setAttribute('name', 'viewauthor');
    checkbox.required = checkboxData.input.required;
    checkbox.checked = checkboxData.input.checked !== "false";
    let labelCheckboxData = AddPost.references[1];
    let labelCheckbox = document.createElement('label');
    labelCheckbox.setAttribute('for', checkbox.getAttribute('id'));
    let labelLink = document.createElement('a');
    labelLink.setAttribute('href', labelCheckboxData.ref);
    labelLink.innerHTML = labelCheckboxData.text;
    labelCheckbox.innerHTML = labelCheckboxData["text without ref"];
    labelCheckbox.appendChild(labelLink);

    let buttonData = AddPost.buttons[0];
    let button = document.createElement('input');
    button.setAttribute('type', 'submit')
    button.setAttribute('value', buttonData.text);

    form.appendChild(checkbox);
    form.appendChild(labelCheckbox);
    form.appendChild(button);
    addPostBlock.appendChild(form);
    return form;
}
async function allForms() {
    await createFormAddPost();
    const postForm = document.querySelector("form#addpost");
    postForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let postFormData = Array.from(postForm.querySelectorAll('input')).reduce((acc, input) => ({
            ...acc,
            [input.id]: input.value
        }), {});
        const response = await fetch("storage/posts.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormData)
        })
        console.log(response);
        console.log(JSON.stringify(postFormData));
    })
}
allForms();