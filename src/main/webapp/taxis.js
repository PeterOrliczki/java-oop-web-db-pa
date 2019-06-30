function onTaxisClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onTaxisLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/taxis');
    xhr.send();
}

function onTaxisLoad() {
  if(this.status === OK) {
  const taxis = JSON.parse(this.responseText);
  createTaxisDisplay(taxis);
  showContents(['taxi-content']);
  } else {
    onOtherResponse(myTaxisDivEl, this);
  }
}

function createTaxisDisplay(taxis) {
  const buttonEl = createNewTaxiButton();
  buttonEl.addEventListener('click', addNewTaxi);
  if (taxis.length === 0) {
    removeAllChildren(myTaxisDivEl);
    const pEl = document.createElement('p');
    pEl.setAttribute('id', 'taxi-info');
    pEl.textContent = 'The taxi log is empty';
    myTaxisDivEl.appendChild(pEl);
    myTaxisDivEl.appendChild(buttonEl);
  } else {
    removeAllChildren(myTaxisDivEl);
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'edit-taxi-table');
    const theadEl = createTaxisTableHeader();
    const tbodyEl = createTaxisTableBody(taxis);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myTaxisDivEl.appendChild(tableEl);
    myTaxisDivEl.appendChild(buttonEl);
  }
}

function createTaxisTableBody(taxis) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < taxis.length; i++) {
    const taxi = taxis[i];

    const idTdEl = document.createElement('td');
    idTdEl.classList.add('default-cell');
    idTdEl.textContent = taxi.id;

    const nameTdEl = document.createElement('td');
    nameTdEl.classList.add('default-cell');
    nameTdEl.textContent = taxi.name;

    const licensePlateTdEl = document.createElement('td');
    licensePlateTdEl.classList.add('default-cell');
    licensePlateTdEl.textContent = taxi.licensePlate;

    const capacityTdEl = document.createElement('td');
    capacityTdEl.classList.add('default-cell');
    capacityTdEl.textContent = taxi.capacity;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "Edit";
    buttonEditEl.setAttribute('id', 'id-edit-taxi-button-' + taxi.id);

    buttonEditEl.dataset.taxiEditId = taxi.id;
    buttonEditEl.addEventListener('click', onTaxiEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'taxi-edit-button-' + taxi.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-taxi-id-' + taxi.id);
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(licensePlateTdEl);
    trEl.appendChild(capacityTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }
  return tbodyEl;
}

function createTaxisTableHeader() {
     const idThEl = document.createElement('th');
     idThEl.classList.add('default-th');``
     idThEl.textContent = 'Taxi ID';

     const nameThEl = document.createElement('th');
     nameThEl.classList.add('default-th');``
     nameThEl.textContent = 'Name';

     const licensePlateThEl = document.createElement('th');
     licensePlateThEl.classList.add('default-th');
     licensePlateThEl.textContent = 'License Plate';

     const capacityThEl = document.createElement('th');
     capacityThEl.classList.add('default-th');
     capacityThEl.textContent = 'Capacity';

     const trEl = document.createElement('tr');

     trEl.appendChild(idThEl);
     trEl.appendChild(nameThEl);
     trEl.appendChild(licensePlateThEl);
     trEl.appendChild(capacityThEl);

     const theadEl = document.createElement('thead');
     theadEl.appendChild(trEl);
     return theadEl;
}

function createNewTaxiButton() {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new taxi';
    return buttonEl;
}

function addNewTaxi() {
    removeAllChildren(myTaxisDivEl);
    createNewTaxiForm();
}

function createNewTaxiForm() {
    const formEl = document.createElement('form');
    formEl.setAttribute('id','new-taxi-form');
    formEl.classList.add('menu-form');
    formEl.onSubmit = 'return false;';

    const inputNaEl = document.createElement("input");
    inputNaEl.setAttribute("type","text");
    inputNaEl.classList.add("text-input");
    inputNaEl.placeholder = "Name";
    inputNaEl.setAttribute("name","taxi-name");

    const inputLiPlEl = document.createElement("input");
    inputLiPlEl.setAttribute("type","text");
    inputLiPlEl.classList.add("text-input");
    inputLiPlEl.placeholder = "License Plate";
    inputLiPlEl.setAttribute("name","taxi-license-plate");

    const inputCaEl = document.createElement("input");
    inputCaEl.setAttribute("type","text");
    inputCaEl.classList.add("text-input");
    inputCaEl.placeholder = "Capacity";
    inputCaEl.setAttribute("name","taxi-capacity");

    const brEl = document.createElement("br");

    const sEl = createNewSubmitTaxiButton();
    sEl.addEventListener('click', onSubmitNewTaxi);

    formEl.appendChild(inputNaEl);
    formEl.appendChild(inputLiPlEl);
    formEl.appendChild(inputCaEl);
    formEl.appendChild(brEl);
    formEl.appendChild(sEl);

    myTaxisDivEl.appendChild(formEl);
}

function createNewSubmitTaxiButton() {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'new-taxi-button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new taxi';

    return buttonEl;
}

function onSubmitNewTaxi() {
    const loginFormEl = document.forms['new-taxi-form'];

    const nameInputEl = loginFormEl.querySelector('input[name="taxi-name"]');
    const licensePlateInputEl = loginFormEl.querySelector('input[name="taxi-license-plate"]');
    const capacityInputEl = loginFormEl.querySelector('input[name="taxi-capacity"]');

    removeAllChildren(myTaxisDivEl);
    const name = nameInputEl.value;
    const licensePlate = licensePlateInputEl.value;
    const capacity = capacityInputEl.value;

    const params = new URLSearchParams();
    params.append('taxi-name', name);
    params.append('taxi-license-plate', licensePlate);
    params.append('taxi-capacity', capacity);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onTaxiSubmissionResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/taxis');
    xhr.send(params);
}

function onTaxiSubmissionResponse() {
    if (this.status === OK) {
        const taxi = JSON.parse(this.responseText);
        alert(taxi.message);
        onTaxisClicked();
    } else {
        onOtherResponse(myTaxisDivEl, this);
    }
}

function onTaxiEditButtonClicked() {
    const id = this.dataset.taxiEditId;
    const tableEl = document.getElementById('edit-taxi-table');
    const cells = tableEl.rows.namedItem('row-taxi-id-' + id).cells;

    for (let i = 1; i < cells.length - 1; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-taxi-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('Edit');
    saveButtonEl.appendChild(saveButtonTextNodeEl);
    saveButtonEl.dataset.taxiId = id;
    saveButtonEl.addEventListener('click', onTaxiSaveButtonClicked);
    document.getElementById('taxi-edit-button-' + id).appendChild(saveButtonEl);
}

function createPopUpInput(id, textContent) {
    const inputEl = document.createElement('input');
    inputEl.classList.add('pop-up-box');
    inputEl.name = 'input-taxi-id-' + id;
    inputEl.setAttribute('id', 'taxi-input-' + id);
    inputEl.value = textContent;
    return inputEl;
}

function onTaxiSaveButtonClicked() {
    const id = this.dataset.taxiId;
    const user = getCurrentUser();

    const inputs = document.getElementsByClassName('pop-up-box');

    const data = {};
    data.id = id;
    data.name = inputs[0].value;
    data.licensePlate = inputs[1].value;
    data.capacity = inputs[2].value;
    const json = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onTaxiEditSubmitResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('PUT', 'protected/taxis');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.send(json);
}

function onTaxiEditSubmitResponse() {
    if (this.status === OK) {
        const message = JSON.parse(this.responseText);
        alert(message.message);
        onTaxisClicked();
    } else {
        onOtherResponse(myTaxisDivEl, this);
    }
}


function onTaxiResponse() {
    if (this.status === OK) {
        const taxi = JSON.parse(this.responseText);
        onTaxiLoad(taxi);
    } else {
        onOtherResponse(myTaxisDivEl, this);
    }
}

function onTaxiLoad(taxi) {
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'taxis-table');
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    removeAllChildren(myTaxisDivEl);
    myTaxisDivEl.appendChild(tableEl);
}


