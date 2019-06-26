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

    const trEl = document.createElement('tr');
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);

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

     const trEl = document.createElement('tr');

     trEl.appendChild(eventNameThEl);
     trEl.appendChild(tableNameThEl);

     const theadEl = document.createElement('thead');
     theadEl.appendChild(trEl);
     return theadEl;
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


