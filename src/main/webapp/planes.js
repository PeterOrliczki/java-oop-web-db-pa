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

    const trEl = document.createElement('tr');
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);

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

     const trEl = document.createElement('tr');

     trEl.appendChild(eventNameThEl);
     trEl.appendChild(tableNameThEl);

     const theadEl = document.createElement('thead');
     theadEl.appendChild(trEl);
     return theadEl;
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
