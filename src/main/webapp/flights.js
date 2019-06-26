function onFlightsClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onFlightsLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/flights');
    xhr.send();
}

function onFlightsLoad() {
  if(this.status === OK) {
  const flights = JSON.parse(this.responseText);
  createFlightsDisplay(flights);
  showContents(['flight-content']);
  } else {
    onOtherResponse(myFlightsDivEl, this);
  }
}

function createFlightsDisplay(flights) {
  if (flights.length === 0) {
    removeAllChildren(myFlightsDivEl);
    const pEl = document.createElement('p');
    pEl.setAttribute('id', 'flight-info');
    pEl.textContent = 'The flight log is empty';
    myFlightsDivEl.appendChild(pEl);
    myFlightsDivEl.appendChild(buttonEl);
  } else {
    removeAllChildren(myFlightsDivEl);
    const tableEl = document.createElement('table');
    const theadEl = createFlightsTableHeader();
    const tbodyEl = createFlightsTableBody(flights);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myFlightsDivEl.appendChild(tableEl);
  }
}

function createFlightsTableBody(flights) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < flights.length; i++) {
    const flight = flights[i];

    const eventNameTdEl = document.createElement('td');
    eventNameTdEl.classList.add('default-cell');
    eventNameTdEl.textContent = flight.origin;

    const tableNameTdEl = document.createElement('td');
    tableNameTdEl.classList.add('default-cell');
    tableNameTdEl.textContent = flight.destination;

    const userNameTdEl = document.createElement('td');
    userNameTdEl.classList.add('default-cell');
    userNameTdEl.textContent = flight.start;

    const eventDateTdEl = document.createElement('td');
    eventDateTdEl.classList.add('default-cell');
    eventDateTdEl.textContent = flight.end;

    const trEl = document.createElement('tr');
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(eventDateTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createFlightsTableHeader() {
    const eventNameThEl = document.createElement('th');
    eventNameThEl.classList.add('default-th');``
    eventNameThEl.textContent = 'Event';

    const tableNameThEl = document.createElement('th');
    tableNameThEl.classList.add('default-th');
    tableNameThEl.textContent = 'Table';

    const userNameThEl = document.createElement('th');
    userNameThEl.classList.add('default-th');
    userNameThEl.textContent = 'User';

    const eventDateThEl = document.createElement('th');
    eventDateThEl.classList.add('default-th');
    eventDateThEl.textContent = 'Date';

    const trEl = document.createElement('tr');

    trEl.appendChild(eventNameThEl);
    trEl.appendChild(tableNameThEl);
    trEl.appendChild(userNameThEl);
    trEl.appendChild(eventDateThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function onFlightResponse() {
    if (this.status === OK) {
        const flight = JSON.parse(this.responseText);
        onFlightLoad(flight);
    } else {
        onOtherResponse(myFlightsDivEl, this);
    }
}

function onFlightLoad(flight) {
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'flights-table');
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    removeAllChildren(myFlightsDivEl);
    myFlightsDivEl.appendChild(tableEl);
}

