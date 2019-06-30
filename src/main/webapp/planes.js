function onPlanesClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPlanesLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/planes');
    xhr.send();
}

function onPlanesLoad() {
  if(this.status === OK) {
  const planes = JSON.parse(this.responseText);
  createPlanesDisplay(planes);
  showContents(['plane-content']);
  } else {
    onOtherResponse(myPlanesDivEl, this);
  }
}

function createPlanesDisplay(planes) {
  const buttonEl = createNewPlaneButton();
  buttonEl.addEventListener('click', addNewPlane);
  if (planes.length === 0) {
    removeAllChildren(myPlanesDivEl);
    const pEl = document.createElement('p');
    pEl.setAttribute('id', 'plane-info');
    pEl.textContent = 'The plane log is empty';
    myPlanesDivEl.appendChild(pEl);
    myPlanesDivEl.appendChild(buttonEl);
  } else {
    removeAllChildren(myPlanesDivEl);
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'edit-plane-table');
    const theadEl = createPlanesTableHeader();
    const tbodyEl = createPlanesTableBody(planes);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myPlanesDivEl.appendChild(tableEl);
    myPlanesDivEl.appendChild(buttonEl);
  }
}

function createPlanesTableBody(planes) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < planes.length; i++) {
    const plane = planes[i];

    const idTdEl = document.createElement('td');
    idTdEl.classList.add('default-cell');
    idTdEl.textContent = plane.id;

    const nameTdEl = document.createElement('td');
    nameTdEl.classList.add('default-cell');
    nameTdEl.textContent = plane.name;

    const capacityTdEl = document.createElement('td');
    capacityTdEl.classList.add('default-cell');
    capacityTdEl.textContent = plane.capacity;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "Edit";
    buttonEditEl.setAttribute('id', 'id-edit-plane-button-' + plane.id);

    buttonEditEl.dataset.planeEditId = plane.id;
    buttonEditEl.addEventListener('click', onPlaneEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'plane-edit-button-' + plane.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-plane-id-' + plane.id);
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(capacityTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }
  return tbodyEl;
}

function createPlanesTableHeader() {
     const idThEl = document.createElement('th');
     idThEl.classList.add('default-th');``
     idThEl.textContent = 'ID';

     const nameThEl = document.createElement('th');
     nameThEl.classList.add('default-th');``
     nameThEl.textContent = 'Name';

     const capacityThEl = document.createElement('th');
     capacityThEl.classList.add('default-th');
     capacityThEl.textContent = 'Capacity';

     const trEl = document.createElement('tr');

    trEl.appendChild(idThEl);
     trEl.appendChild(nameThEl);
     trEl.appendChild(capacityThEl);

     const theadEl = document.createElement('thead');
     theadEl.appendChild(trEl);
     return theadEl;
}

function createNewPlaneButton() {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new plane';
    return buttonEl;
}

function addNewPlane() {
    removeAllChildren(myPlanesDivEl);
    createNewPlaneForm();
}

function createNewPlaneForm() {
    const formEl = document.createElement('form');
    formEl.setAttribute('id','new-plane-form');
    formEl.classList.add('menu-form');
    formEl.onSubmit = 'return false;';

    const inputNaEl = document.createElement("input");
    inputNaEl.setAttribute("type","text");
    inputNaEl.classList.add("text-input");
    inputNaEl.placeholder = "Name";
    inputNaEl.setAttribute("name","plane-name");

    const inputCaEl = document.createElement("input");
    inputCaEl.setAttribute("type","text");
    inputCaEl.classList.add("text-input");
    inputCaEl.placeholder = "Capacity";
    inputCaEl.setAttribute("name","plane-capacity");

    const brEl = document.createElement("br");

    const sEl = createNewSubmitPlaneButton();
    sEl.addEventListener('click', onSubmitNewPlane);

    formEl.appendChild(inputNaEl);
    formEl.appendChild(inputCaEl);
    formEl.appendChild(brEl);
    formEl.appendChild(sEl);

    myPlanesDivEl.appendChild(formEl);
}

function createNewSubmitPlaneButton() {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'new-plane-button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new plane';

    return buttonEl;
}

function onSubmitNewPlane() {
    const loginFormEl = document.forms['new-plane-form'];

    const nameInputEl = loginFormEl.querySelector('input[name="plane-name"]');
    const capacityInputEl = loginFormEl.querySelector('input[name="plane-capacity"]');

    removeAllChildren(myPlanesDivEl);
    const name = nameInputEl.value;
    const capacity = capacityInputEl.value;

    const params = new URLSearchParams();
    params.append('plane-name', name);
    params.append('plane-capacity', capacity);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPlaneSubmissionResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/planes');
    xhr.send(params);
}

function onPlaneSubmissionResponse() {
    if (this.status === OK) {
        const plane = JSON.parse(this.responseText);
        alert(plane.message);
        onPlanesClicked();
    } else {
        onOtherResponse(myPlanesDivEl, this);
    }
}

function onPlaneEditButtonClicked() {
    const id = this.dataset.planeEditId;
    const tableEl = document.getElementById('edit-plane-table');
    const cells = tableEl.rows.namedItem('row-plane-id-' + id).cells;

    for (let i = 1; i < cells.length - 1; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-plane-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('Edit');
    saveButtonEl.appendChild(saveButtonTextNodeEl);
    saveButtonEl.dataset.planeId = id;
    saveButtonEl.addEventListener('click', onPlaneSaveButtonClicked);
    document.getElementById('plane-edit-button-' + id).appendChild(saveButtonEl);
}

function createPopUpInput(id, textContent) {
    const inputEl = document.createElement('input');
    inputEl.classList.add('pop-up-box');
    inputEl.name = 'input-plane-id-' + id;
    inputEl.setAttribute('id', 'plane-input-' + id);
    inputEl.value = textContent;
    return inputEl;
}

function onPlaneSaveButtonClicked() {
    const id = this.dataset.planeId;
    const user = getCurrentUser();

    const inputs = document.getElementsByClassName('pop-up-box');

    const data = {};
    data.id = id;
    data.name = inputs[0].value;
    data.capacity = inputs[1].value;
    const json = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPlaneEditSubmitResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('PUT', 'protected/planes');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.send(json);
}

function onPlaneEditSubmitResponse() {
    if (this.status === OK) {
        const message = JSON.parse(this.responseText);
        alert(message.message);
        onPlanesClicked();
    } else {
        onOtherResponse(myPlanesDivEl, this);
    }
}

function onPlaneResponse() {
    if (this.status === OK) {
        const plane = JSON.parse(this.responseText);
        onPlaneLoad(plane);
    } else {
        onOtherResponse(myPlanesDivEl, this);
    }
}

function onPlaneLoad(plane) {
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'planes-table');
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    removeAllChildren(myPlanesDivEl);
    myPlanesDivEl.appendChild(tableEl);
}
