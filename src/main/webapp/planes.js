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
  }
}

function createPlanesTableBody(planes) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < planes.length; i++) {
    const plane = planes[i];

    const eventNameTdEl = document.createElement('td');
    eventNameTdEl.classList.add('default-cell');
    eventNameTdEl.textContent = plane.name;

    const tableNameTdEl = document.createElement('td');
    tableNameTdEl.classList.add('default-cell');
    tableNameTdEl.textContent = plane.capacity;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "edit button placeholder";
    buttonEditEl.setAttribute('id', 'id-edit-plane-button-' + plane.id);

    buttonEditEl.dataset.planeEditId = plane.id;
    buttonEditEl.addEventListener('click', onPlaneEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'plane-edit-button-' + plane.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-plane-id-' + plane.id);
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createPlanesTableHeader() {
     const eventNameThEl = document.createElement('th');
     eventNameThEl.classList.add('default-th');``
     eventNameThEl.textContent = 'Event';

     const tableNameThEl = document.createElement('th');
     tableNameThEl.classList.add('default-th');
     tableNameThEl.textContent = 'Table';

     const buttonOneTdEl = document.createElement('th');
     buttonOneTdEl.textContent = 'Edit';

     const trEl = document.createElement('tr');

     trEl.appendChild(eventNameThEl);
     trEl.appendChild(tableNameThEl);
     trEl.appendChild(buttonOneTdEl);

     const theadEl = document.createElement('thead');
     theadEl.appendChild(trEl);
     return theadEl;
}

function onPlaneEditButtonClicked() {
    const id = this.dataset.planeEditId;
    const tableEl = document.getElementById('edit-plane-table');
    const cells = tableEl.rows.namedItem('row-plane-id-' + id).cells;

    for (let i = 0; i < cells.length - 1; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-plane-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('edit button placeholder');
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
