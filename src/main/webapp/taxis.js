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

    const eventNameTdEl = document.createElement('td');
    eventNameTdEl.classList.add('default-cell');
    eventNameTdEl.textContent = taxi.name;

    const userNameTdEl = document.createElement('td');
    userNameTdEl.classList.add('default-cell');
    userNameTdEl.textContent = taxi.licensePlate;

    const tableNameTdEl = document.createElement('td');
    tableNameTdEl.classList.add('default-cell');
    tableNameTdEl.textContent = taxi.capacity;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "edit button placeholder";
    buttonEditEl.setAttribute('id', 'id-edit-taxi-button-' + taxi.id);

    buttonEditEl.dataset.taxiEditId = taxi.id;
    buttonEditEl.addEventListener('click', onTaxiEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'taxi-edit-button-' + taxi.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-taxi-id-' + taxi.id);
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createTaxisTableHeader() {
     const eventNameThEl = document.createElement('th');
     eventNameThEl.classList.add('default-th');``
     eventNameThEl.textContent = 'Event';

     const tableNameThEl = document.createElement('th');
     tableNameThEl.classList.add('default-th');
     tableNameThEl.textContent = 'Table';

     const userNameThEl = document.createElement('th');
     userNameThEl.classList.add('default-th');
     userNameThEl.textContent = 'User';

     const buttonOneTdEl = document.createElement('th');
     buttonOneTdEl.textContent = 'Edit';

     const trEl = document.createElement('tr');

     trEl.appendChild(eventNameThEl);
     trEl.appendChild(tableNameThEl);
     trEl.appendChild(userNameThEl);
     trEl.appendChild(buttonOneTdEl);

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

    const inputTiEl = document.createElement("input");
    inputTiEl.setAttribute("type","text");
    inputTiEl.classList.add("text-input");
    inputTiEl.placeholder = "Name";
    inputTiEl.setAttribute("name","taxi-name");

    const inputLiPlEl = document.createElement("input");
    inputLiPlEl.setAttribute("type","text");
    inputLiPlEl.classList.add("text-input");
    inputLiPlEl.placeholder = "License Plate";
    inputLiPlEl.setAttribute("name","taxi-license-plate");

    const inputCoEl = document.createElement("input");
    inputCoEl.setAttribute("type","text");
    inputCoEl.classList.add("text-input");
    inputCoEl.placeholder = "Capacity";
    inputCoEl.setAttribute("name","taxi-capacity");

    const brEl = document.createElement("br");

    const sEl = createNewSubmitButton();
    sEl.addEventListener('click', onSubmitNewTaxi);

    formEl.appendChild(inputTiEl);
    formEl.appendChild(inputLiPlEl);
    formEl.appendChild(inputCoEl);
    formEl.appendChild(brEl);
    formEl.appendChild(sEl);

    myTaxisDivEl.appendChild(formEl);
}

function createNewSubmitButton() {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'new-taxi-button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new taxi';

    return buttonEl;
}

function onSubmitNewTaxi() {
    const loginFormEl = document.forms['new-taxi-form'];

    const titleInputEl = loginFormEl.querySelector('input[name="taxi-name"]');
    const licensePlateInputEl = loginFormEl.querySelector('input[name="taxi-license-plate"]');
    const contentInputEl = loginFormEl.querySelector('input[name="taxi-capacity"]');

    removeAllChildren(myTaxisDivEl);
    const title = titleInputEl.value;
    const licensePlate = licensePlateInputEl.value;
    const content = contentInputEl.value;

    const params = new URLSearchParams();
    params.append('taxi-name', title);
    params.append('taxi-license-plate', licensePlate);
    params.append('taxi-capacity', content);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSubmissionResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/taxis');
    xhr.send(params);
}

function onSubmissionResponse() {
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

    for (let i = 0; i < cells.length - 1; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-taxi-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('edit button placeholder');
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


