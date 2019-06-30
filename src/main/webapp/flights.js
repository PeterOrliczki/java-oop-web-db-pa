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
  const buttonEl = createNewFlightButton();
  buttonEl.addEventListener('click', addNewFlight);
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
    tableEl.setAttribute('id', 'edit-flight-table');
    const theadEl = createFlightsTableHeader();
    const tbodyEl = createFlightsTableBody(flights);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myFlightsDivEl.appendChild(tableEl);
    myFlightsDivEl.appendChild(buttonEl);
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

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "edit button placeholder";
    buttonEditEl.setAttribute('id', 'id-edit-flight-button-' + flight.id);

    buttonEditEl.dataset.flightEditId = flight.id;
    buttonEditEl.addEventListener('click', onFlightEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'flight-edit-button-' + flight.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-flight-id-' + flight.id);
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(eventDateTdEl);
    trEl.appendChild(buttonOneTdEl);

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

    const buttonOneTdEl = document.createElement('th');
    buttonOneTdEl.textContent = 'Edit';

    const trEl = document.createElement('tr');

    trEl.appendChild(eventNameThEl);
    trEl.appendChild(tableNameThEl);
    trEl.appendChild(userNameThEl);
    trEl.appendChild(eventDateThEl);
    trEl.appendChild(buttonOneTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createNewFlightButton() {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new flight';
    return buttonEl;
}

function addNewFlight() {
    removeAllChildren(myFlightsDivEl);
    createNewFlightForm();
}

function createNewFlightForm() {
    const formEl = document.createElement('form');
    formEl.setAttribute('id','new-flight-form');
    formEl.classList.add('menu-form');
    formEl.onSubmit = 'return false;';

    const inputIdEl = document.createElement("input");
    inputIdEl.setAttribute("type","text");
    inputIdEl.classList.add("text-input");
    inputIdEl.placeholder = "Id";
    inputIdEl.setAttribute("name","plane-id");

    const inputOrEl = document.createElement("input");
    inputOrEl.setAttribute("type","text");
    inputOrEl.classList.add("text-input");
    inputOrEl.placeholder = "Origin";
    inputOrEl.setAttribute("name","flight-origin");

    const inputDeEl = document.createElement("input");
    inputDeEl.setAttribute("type","text");
    inputDeEl.classList.add("text-input");
    inputDeEl.placeholder = "Destination";
    inputDeEl.setAttribute("name","flight-destination");

    const inputDaEl = document.createElement("input");
    inputDaEl.setAttribute("type","text");
    inputDaEl.classList.add("text-input");
    inputDaEl.placeholder = "Date";
    inputDaEl.setAttribute("name","flight-date");

    const inputStEl = document.createElement("input");
    inputStEl.setAttribute("type","text");
    inputStEl.classList.add("text-input");
    inputStEl.placeholder = "Start";
    inputStEl.setAttribute("name","flight-start");

    const inputEnEl = document.createElement("input");
    inputEnEl.setAttribute("type","text");
    inputEnEl.classList.add("text-input");
    inputEnEl.placeholder = "End";
    inputEnEl.setAttribute("name","flight-end");

    const inputClEl = document.createElement("input");
    inputClEl.setAttribute("type","text");
    inputClEl.classList.add("text-input");
    inputClEl.placeholder = "Class";
    inputClEl.setAttribute("name","flight-class");

    const inputPrEl = document.createElement("input");
    inputPrEl.setAttribute("type","text");
    inputPrEl.classList.add("text-input");
    inputPrEl.placeholder = "Price";
    inputPrEl.setAttribute("name","flight-price");

    const brEl = document.createElement("br");

    const sEl = createNewSubmitButton();
    sEl.addEventListener('click', onSubmitNewFlight);

    formEl.appendChild(inputIdEl);
    formEl.appendChild(inputOrEl);
    formEl.appendChild(inputDeEl);
    formEl.appendChild(inputDaEl);
    formEl.appendChild(inputDeEl);
    formEl.appendChild(inputStEl);
    formEl.appendChild(inputEnEl);
    formEl.appendChild(inputClEl);
    formEl.appendChild(inputPrEl);
    formEl.appendChild(brEl);
    formEl.appendChild(sEl);

    myFlightsDivEl.appendChild(formEl);
}

function createNewSubmitButton() {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'new-flight-button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new flight';

    return buttonEl;
}

function onSubmitNewFlight() {
    const loginFormEl = document.forms['new-flight-form'];

    const planeIdInputEl = loginFormEl.querySelector('input[name="plane-id"]');
    const originInputEl = loginFormEl.querySelector('input[name="flight-origin"]');
    const destinationInputEl = loginFormEl.querySelector('input[name="flight-destination"]');
    const dateInputEl = loginFormEl.querySelector('input[name="flight-date"]');
    const startInputEl = loginFormEl.querySelector('input[name="flight-start"]');
    const endInputEl = loginFormEl.querySelector('input[name="flight-end"]');
    const classInputEl = loginFormEl.querySelector('input[name="flight-class"]');
    const priceInputEl = loginFormEl.querySelector('input[name="flight-price"]');

    removeAllChildren(myFlightsDivEl);
    const planeId = planeIdInputEl.value;
    const origin = originInputEl.value;
    const destination = destinationInputEl.value;
    const date = dateInputEl.value;
    const start = startInputEl.value;
    const end = endInputEl.value;
    const class = classInputEl.value;
    const price = priceInputEl.value;

    const params = new URLSearchParams();
    params.append('plane-id', id);
    params.append('flight-origin', origin);
    params.append('flight-destination', destination);
    params.append('flight-date', date);
    params.append('flight-start', start);
    params.append('flight-end', end);
    params.append('flight-class', class);
    params.append('flight-price', price);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSubmissionResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/flights');
    xhr.send(params);
}

function onSubmissionResponse() {
    if (this.status === OK) {
        const flight = JSON.parse(this.responseText);
        alert(flight.message);
        onFlightsClicked();
    } else {
        onOtherResponse(myFlightsDivEl, this);
    }
}

function onFlightEditButtonClicked() {
    const id = this.dataset.flightEditId;
    const tableEl = document.getElementById('edit-flight-table');
    const cells = tableEl.rows.namedItem('row-flight-id-' + id).cells;

    for (let i = 0; i < cells.length - 1; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-flight-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('edit button placeholder');
    saveButtonEl.appendChild(saveButtonTextNodeEl);
    saveButtonEl.dataset.flightId = id;
    saveButtonEl.addEventListener('click', onFlightSaveButtonClicked);
    document.getElementById('flight-edit-button-' + id).appendChild(saveButtonEl);
}

function createPopUpInput(id, textContent) {
    const inputEl = document.createElement('input');
    inputEl.classList.add('pop-up-box');
    inputEl.name = 'input-flight-id-' + id;
    inputEl.setAttribute('id', 'flight-input-' + id);
    inputEl.value = textContent;
    return inputEl;
}

function onFlightSaveButtonClicked() {
    const id = this.dataset.flightId;
    const user = getCurrentUser();

    const inputs = document.getElementsByClassName('pop-up-box');

    const data = {};
    data.id = id;
    data.origin = inputs[0].value;
    data.destination = inputs[1].value;
    data.start = inputs[2].value;
    data.end = inputs[3].value;
    const json = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onFlightEditSubmitResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('PUT', 'protected/flights');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.send(json);
}

function onFlightEditSubmitResponse() {
    if (this.status === OK) {
        const message = JSON.parse(this.responseText);
        alert(message.message);
        onFlightsClicked();
    } else {
        onOtherResponse(myFlightsDivEl, this);
    }
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
