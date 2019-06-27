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
  }
}

function createTaxisTableBody(taxis) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < taxis.length; i++) {
    const taxi = taxis[i];

    const eventNameTdEl = document.createElement('td');
    eventNameTdEl.classList.add('default-cell');
    eventNameTdEl.textContent = taxi.name;

    const tableNameTdEl = document.createElement('td');
    tableNameTdEl.classList.add('default-cell');
    tableNameTdEl.textContent = taxi.capacity;

    const userNameTdEl = document.createElement('td');
    userNameTdEl.classList.add('default-cell');
    userNameTdEl.textContent = taxi.licensePlate;

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
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
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
    data.capacity = inputs[1].value;
    data.licensePlate = inputs[2].value;
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


