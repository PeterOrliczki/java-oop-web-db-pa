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
    if (getCurrentUser().role === 'ADMIN') {
      const flightButtonEl = createNewFlightButton();
      flightButtonEl.addEventListener('click', addNewFlight);
      if (flights.length === 0) {
        removeAllChildren(myFlightsDivEl);
        const pEl = document.createElement('p');
        pEl.setAttribute('id', 'flight-info');
        pEl.textContent = 'The flight log is empty';
        myFlightsDivEl.appendChild(pEl);
        myFlightsDivEl.appendChild(flightButtonEl);
      } else {
        removeAllChildren(myFlightsDivEl);
        const tableEl = document.createElement('table');
        tableEl.setAttribute('id', 'edit-flight-table');
        const theadEl = createFlightsTableHeaderAdmin();
        const tbodyEl = createFlightsTableBodyAdmin(flights);
        tableEl.appendChild(theadEl);
        tableEl.appendChild(tbodyEl);
        myFlightsDivEl.appendChild(tableEl);
        myFlightsDivEl.appendChild(flightButtonEl);
      }
    } else {
      if (flights.length === 0) {
        removeAllChildren(myFlightsDivEl);
        const pEl = document.createElement('p');
        pEl.setAttribute('id', 'flight-info');
        pEl.textContent = 'The flight log is empty';
        myFlightsDivEl.appendChild(pEl);
      } else {
        removeAllChildren(myFlightsDivEl);
        const tableEl = document.createElement('table');
        tableEl.setAttribute('id', 'edit-flight-table');
        const theadEl = createFlightsTableHeaderNotAdmin();
        const tbodyEl = createFlightsTableBodyNotAdmin(flights);
        tableEl.appendChild(theadEl);
        tableEl.appendChild(tbodyEl);
        myFlightsDivEl.appendChild(tableEl);
    }
  }
}

function createFlightsTableBodyAdmin(flights) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < flights.length; i++) {
    const flight = flights[i];

    const planeIdTdEl = document.createElement('td');
    planeIdTdEl.classList.add('default-cell');
    planeIdTdEl.textContent = flight.planeId;

    const originTdEl = document.createElement('td');
    originTdEl.classList.add('default-cell');
    originTdEl.textContent = flight.origin;

    const destinationTdEl = document.createElement('td');
    destinationTdEl.classList.add('default-cell');
    destinationTdEl.textContent = flight.destination;

    const dateTdEl = document.createElement('td');
    dateTdEl.classList.add('default-cell');
    dateTdEl.textContent = flight.date;

    const startTdEl = document.createElement('td');
    startTdEl.classList.add('default-cell');
    startTdEl.textContent = flight.start;

    const endTdEl = document.createElement('td');
    endTdEl.classList.add('default-cell');
    endTdEl.textContent = flight.end;

    const classTdEl = document.createElement('td');
    classTdEl.classList.add('default-cell');
    classTdEl.textContent = flight.flightClass;

    const priceTdEl = document.createElement('td');
    priceTdEl.classList.add('default-cell');
    priceTdEl.textContent = flight.price;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "Edit";
    buttonEditEl.setAttribute('id', 'id-edit-flight-button-' + flight.id);

    buttonEditEl.dataset.flightEditId = flight.id;
    buttonEditEl.addEventListener('click', onFlightEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'flight-edit-button-' + flight.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-flight-id-' + flight.id);
    trEl.appendChild(planeIdTdEl);
    trEl.appendChild(originTdEl);
    trEl.appendChild(destinationTdEl);
    trEl.appendChild(dateTdEl);
    trEl.appendChild(startTdEl);
    trEl.appendChild(endTdEl);
    trEl.appendChild(classTdEl);
    trEl.appendChild(priceTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createFlightsTableBodyNotAdmin(flights) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < flights.length; i++) {
    const flight = flights[i];

    const originTdEl = document.createElement('td');
    originTdEl.classList.add('default-cell');
    originTdEl.textContent = flight.origin;

    const destinationTdEl = document.createElement('td');
    destinationTdEl.classList.add('default-cell');
    destinationTdEl.textContent = flight.destination;

    const dateTdEl = document.createElement('td');
    dateTdEl.classList.add('default-cell');
    dateTdEl.textContent = flight.date;

    const startTdEl = document.createElement('td');
    startTdEl.classList.add('default-cell');
    startTdEl.textContent = flight.start;

    const endTdEl = document.createElement('td');
    endTdEl.classList.add('default-cell');
    endTdEl.textContent = flight.end;

    const classTdEl = document.createElement('td');
    classTdEl.classList.add('default-cell');
    classTdEl.textContent = flight.flightClass;

    const priceTdEl = document.createElement('td');
    priceTdEl.classList.add('default-cell');
    priceTdEl.textContent = flight.price;

    const buttonOrderEl = document.createElement('p');
    buttonOrderEl.textContent = "Order";
    buttonOrderEl.setAttribute('id', 'id-order-flight-button-' + flight.id);

    buttonOrderEl.dataset.flightOrderId = flight.id;
    buttonOrderEl.addEventListener('click', onFlightOrderButtonClicked);

    buttonOrderEl.dataset.flightPrice = flight.price;

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonOrderEl);
    buttonOneTdEl.setAttribute('id', 'flight-order-button-' + flight.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-flight-id-' + flight.id);
    trEl.appendChild(originTdEl);
    trEl.appendChild(destinationTdEl);
    trEl.appendChild(dateTdEl);
    trEl.appendChild(startTdEl);
    trEl.appendChild(endTdEl);
    trEl.appendChild(classTdEl);
    trEl.appendChild(priceTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createFlightsTableHeaderAdmin() {
    const planeIdThEl = document.createElement('th');
    planeIdThEl.classList.add('default-th');``
    planeIdThEl.textContent = 'Plane ID';

    const originThEl = document.createElement('th');
    originThEl.classList.add('default-th');``
    originThEl.textContent = 'Origin';

    const destinationThEl = document.createElement('th');
    destinationThEl.classList.add('default-th');
    destinationThEl.textContent = 'Destination';

    const dateThEl = document.createElement('th');
    dateThEl.classList.add('default-th');
    dateThEl.textContent = 'Date';

    const startThEl = document.createElement('th');
    startThEl.classList.add('default-th');
    startThEl.textContent = 'Start';

    const endThEl = document.createElement('th');
    endThEl.classList.add('default-th');
    endThEl.textContent = 'End';

    const classThEl = document.createElement('th');
    classThEl.classList.add('default-th');
    classThEl.textContent = 'Class';

    const priceThEl = document.createElement('th');
    priceThEl.classList.add('default-th');
    priceThEl.textContent = 'Price';

    const trEl = document.createElement('tr');

    trEl.appendChild(planeIdThEl);
    trEl.appendChild(originThEl);
    trEl.appendChild(destinationThEl);
    trEl.appendChild(dateThEl);
    trEl.appendChild(startThEl);
    trEl.appendChild(endThEl);
    trEl.appendChild(classThEl);
    trEl.appendChild(priceThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createFlightsTableHeaderNotAdmin() {
    const originThEl = document.createElement('th');
    originThEl.classList.add('default-th');
    originThEl.textContent = 'Origin';

    const destinationThEl = document.createElement('th');
    destinationThEl.classList.add('default-th');
    destinationThEl.textContent = 'Destination';

    const dateThEl = document.createElement('th');
    dateThEl.classList.add('default-th');
    dateThEl.textContent = 'Date';

    const startThEl = document.createElement('th');
    startThEl.classList.add('default-th');
    startThEl.textContent = 'Start';

    const endThEl = document.createElement('th');
    endThEl.classList.add('default-th');
    endThEl.textContent = 'End';

    const classThEl = document.createElement('th');
    classThEl.classList.add('default-th');
    classThEl.textContent = 'Class';

    const priceThEl = document.createElement('th');
    priceThEl.classList.add('default-th');
    priceThEl.textContent = 'Price';

    const trEl = document.createElement('tr');

    trEl.appendChild(originThEl);
    trEl.appendChild(destinationThEl);
    trEl.appendChild(dateThEl);
    trEl.appendChild(startThEl);
    trEl.appendChild(endThEl);
    trEl.appendChild(classThEl);
    trEl.appendChild(priceThEl);

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
    inputIdEl.placeholder = "Plane ID";
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

    const sEl = createNewSubmitFlightButton();
    sEl.addEventListener('click', onSubmitNewFlight);

    formEl.appendChild(inputIdEl);
    formEl.appendChild(inputOrEl);
    formEl.appendChild(inputDeEl);
    formEl.appendChild(inputDaEl);
    formEl.appendChild(inputStEl);
    formEl.appendChild(inputEnEl);
    formEl.appendChild(inputClEl);
    formEl.appendChild(inputPrEl);
    formEl.appendChild(brEl);
    formEl.appendChild(sEl);

    myFlightsDivEl.appendChild(formEl);
}

function createNewSubmitFlightButton() {
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
    const flightClass = classInputEl.value;
    const price = priceInputEl.value;

    const params = new URLSearchParams();
    params.append('plane-id', planeId);
    params.append('flight-origin', origin);
    params.append('flight-destination', destination);
    params.append('flight-date', date);
    params.append('flight-start', start);
    params.append('flight-end', end);
    params.append('flight-class', flightClass);
    params.append('flight-price', price);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onFlightSubmissionResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/flights');
    xhr.send(params);
}

function onFlightSubmissionResponse() {
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
    const saveButtonTextNodeEl = document.createTextNode('Edit');
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
    data.planeId = inputs[0].value;
    data.origin = inputs[1].value;
    data.destination = inputs[2].value;
    data.date = inputs[3].value;
    data.start = inputs[4].value;
    data.end = inputs[5].value;
    data.flightClass = inputs[6].value;
    data.price = inputs[7].value;
    const json = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onFlightEditSubmitResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('PUT', 'protected/flights');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.send(json);
}

function onFlightOrderButtonClicked() {
    const flightId = this.dataset.flightOrderId;
    const flightPrice = this.dataset.flightPrice;

    const params = new URLSearchParams();
    params.append('flight-id', flightId);
    params.append('flight-price', flightPrice);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onFlightOrderResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/orders');

    xhr.send(params);
}

function onFlightOrderResponse() {
    if (this.status === OK) {
        const message = JSON.parse(this.responseText);
        alert(message.message);
        onFlightsClicked();
    } else {
        onOtherResponse(myFlightsDivEl, this);
    }
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
