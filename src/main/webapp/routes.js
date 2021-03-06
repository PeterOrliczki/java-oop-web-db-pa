function onRoutesClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onRoutesLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/routes');
    xhr.send();
}

function onRoutesLoad() {
  if(this.status === OK) {
  const routes = JSON.parse(this.responseText);
  createRoutesDisplay(routes);
  showContents(['route-content']);
  } else {
    onOtherResponse(myRoutesDivEl, this);
  }
}

function createRoutesDisplay(routes) {
  if (getCurrentUser().role === 'ADMIN') {
    const routeButtonEl = createNewRouteButton();
    routeButtonEl.addEventListener('click', addNewRoute);
    if (routes.length === 0) {
      removeAllChildren(myRoutesDivEl);
      const pEl = document.createElement('p');
      pEl.setAttribute('id', 'route-info');
      pEl.textContent = 'The route log is empty';
      myRoutesDivEl.appendChild(pEl);
      myRoutesDivEl.appendChild(routeButtonEl);
    } else {
      removeAllChildren(myRoutesDivEl);
      const tableEl = document.createElement('table');
      tableEl.setAttribute('id', 'edit-route-table');
      const theadEl = createRoutesTableHeaderAdmin();
      const tbodyEl = createRoutesTableBodyAdmin(routes);
      tableEl.appendChild(theadEl);
      tableEl.appendChild(tbodyEl);
      myRoutesDivEl.appendChild(tableEl);
      myRoutesDivEl.appendChild(routeButtonEl);
    }
  } else {
      const flightButtonEl = createNewDepositButtonRoute();
      flightButtonEl.addEventListener('click', addToWalletRoute);
    if (routes.length === 0) {
      removeAllChildren(myRoutesDivEl);
      const pEl = document.createElement('p');
      pEl.setAttribute('id', 'route-info');
      pEl.textContent = 'The route log is empty';
      myRoutesDivEl.appendChild(pEl);
      myRoutesDivEl.appendChild(flightButtonEl);
    } else {
      removeAllChildren(myRoutesDivEl);
      const tableEl = document.createElement('table');
      tableEl.setAttribute('id', 'edit-route-table');
      const theadEl = createRoutesTableHeaderNotAdmin();
      const tbodyEl = createRoutesTableBodyNotAdmin(routes);
      tableEl.appendChild(theadEl);
      tableEl.appendChild(tbodyEl);
      myRoutesDivEl.appendChild(tableEl);
      myRoutesDivEl.appendChild(flightButtonEl);
    }
  }
}

function createRoutesTableBodyAdmin(routes) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];

    const taxiIdTdEl = document.createElement('td');
    taxiIdTdEl.classList.add('default-cell');
    taxiIdTdEl.textContent = route.taxiId;

    const originTdEl = document.createElement('td');
    originTdEl.classList.add('default-cell');
    originTdEl.textContent = route.origin;

    const destinationTdEl = document.createElement('td');
    destinationTdEl.classList.add('default-cell');
    destinationTdEl.textContent = route.destination;

    const dateTdEl = document.createElement('td');
    dateTdEl.classList.add('default-cell');
    dateTdEl.textContent = route.date;

    const startTdEl = document.createElement('td');
    startTdEl.classList.add('default-cell');
    startTdEl.textContent = route.start;

    const endTdEl = document.createElement('td');
    endTdEl.classList.add('default-cell');
    endTdEl.textContent = route.end;

    const priceTdEl = document.createElement('td');
    priceTdEl.classList.add('default-cell');
    priceTdEl.textContent = route.price;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "Edit";
    buttonEditEl.setAttribute('id', 'id-edit-route-button-' + route.id);

    buttonEditEl.dataset.routeEditId = route.id;
    buttonEditEl.addEventListener('click', onRouteEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'route-edit-button-' + route.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-route-id-' + route.id);
    trEl.appendChild(taxiIdTdEl);
    trEl.appendChild(originTdEl);
    trEl.appendChild(destinationTdEl);
    trEl.appendChild(dateTdEl);
    trEl.appendChild(startTdEl);
    trEl.appendChild(endTdEl);
    trEl.appendChild(priceTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createRoutesTableBodyNotAdmin(routes) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];

    const originTdEl = document.createElement('td');
    originTdEl.classList.add('default-cell');
    originTdEl.textContent = route.origin;

    const destinationTdEl = document.createElement('td');
    destinationTdEl.classList.add('default-cell');
    destinationTdEl.textContent = route.destination;

    const dateTdEl = document.createElement('td');
    dateTdEl.classList.add('default-cell');
    dateTdEl.textContent = route.date;

    const startTdEl = document.createElement('td');
    startTdEl.classList.add('default-cell');
    startTdEl.textContent = route.start;

    const endTdEl = document.createElement('td');
    endTdEl.classList.add('default-cell');
    endTdEl.textContent = route.end;

    const priceTdEl = document.createElement('td');
    priceTdEl.classList.add('default-cell');
    priceTdEl.textContent = route.price;

    const buttonOrderEl = document.createElement('p');
    buttonOrderEl.textContent = "Order";
    buttonOrderEl.setAttribute('id', 'id-order-route-button-' + route.id);

    buttonOrderEl.dataset.routeOrderId = route.id;
    buttonOrderEl.addEventListener('click', onRouteOrderButtonClicked);

    buttonOrderEl.dataset.routePrice = route.price;

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonOrderEl);
    buttonOneTdEl.setAttribute('id', 'route-order-button-' + route.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-route-id-' + route.id);
    trEl.appendChild(originTdEl);
    trEl.appendChild(destinationTdEl);
    trEl.appendChild(dateTdEl);
    trEl.appendChild(startTdEl);
    trEl.appendChild(endTdEl);
    trEl.appendChild(priceTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createRoutesTableHeaderAdmin() {
    const taxiIdThEl = document.createElement('th');
    taxiIdThEl.classList.add('default-th');``
    taxiIdThEl.textContent = 'Taxi ID';

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

    const priceThEl = document.createElement('th');
    priceThEl.classList.add('default-th');
    priceThEl.textContent = 'Price';

    const trEl = document.createElement('tr');

    trEl.appendChild(taxiIdThEl);
    trEl.appendChild(originThEl);
    trEl.appendChild(destinationThEl);
    trEl.appendChild(dateThEl);
    trEl.appendChild(startThEl);
    trEl.appendChild(endThEl);
    trEl.appendChild(priceThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createRoutesTableHeaderNotAdmin() {
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

    const priceThEl = document.createElement('th');
    priceThEl.classList.add('default-th');
    priceThEl.textContent = 'Price';

    const trEl = document.createElement('tr');

    trEl.appendChild(originThEl);
    trEl.appendChild(destinationThEl);
    trEl.appendChild(dateThEl);
    trEl.appendChild(startThEl);
    trEl.appendChild(endThEl);
    trEl.appendChild(priceThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createNewDepositButtonRoute() {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add balance to wallet';
    return buttonEl;
}

function addToWalletRoute() {
    removeAllChildren(myRoutesDivEl);
    createNewDepositFormRoute();
}

function createNewDepositFormRoute() {
    const formEl = document.createElement('form');
    formEl.setAttribute('id','new-deposit-form');
    formEl.classList.add('menu-form');
    formEl.onSubmit = 'return false;';

    const inputNaEl = document.createElement("input");
    inputNaEl.setAttribute("type","text");
    inputNaEl.classList.add("text-input");
    inputNaEl.placeholder = "Amount";
    inputNaEl.setAttribute("name","wallet-amount");

    const brEl = document.createElement("br");

    const sEl = createNewSubmitDepositButtonRoute();
    sEl.addEventListener('click', onSubmitNewDepositRoute);

    formEl.appendChild(inputNaEl);
    formEl.appendChild(brEl);
    formEl.appendChild(sEl);

    myRoutesDivEl.appendChild(formEl);
}

function createNewSubmitDepositButtonRoute() {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'new-deposit-button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add balance to wallet';

    return buttonEl;
}

function onSubmitNewDepositRoute() {
    const loginFormEl = document.forms['new-deposit-form'];

    const nameInputEl = loginFormEl.querySelector('input[name="wallet-amount"]');

    removeAllChildren(myRoutesDivEl);
    const name = nameInputEl.value;

    const params = new URLSearchParams();
    params.append('user-deposit', name);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onDepositSubmissionResponseRoute);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/users');
    xhr.send(params);
}

function onDepositSubmissionResponseRoute() {
    if (this.status === OK) {
        const deposit = JSON.parse(this.responseText);
        alert(deposit.message);
        onRoutesClicked();
    } else {
        onOtherResponse(myRoutesDivEl, this);
    }
}


function createNewRouteButton() {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new route';
    return buttonEl;
}

function addNewRoute() {
    removeAllChildren(myRoutesDivEl);
    createNewRouteForm();
}

function createNewRouteForm() {
    const formEl = document.createElement('form');
    formEl.setAttribute('id','new-route-form');
    formEl.classList.add('menu-form');
    formEl.onSubmit = 'return false;';

    const inputIdEl = document.createElement("input");
    inputIdEl.setAttribute("type","text");
    inputIdEl.classList.add("text-input");
    inputIdEl.placeholder = "Taxi ID";
    inputIdEl.setAttribute("name","taxi-id");

    const inputOrEl = document.createElement("input");
    inputOrEl.setAttribute("type","text");
    inputOrEl.classList.add("text-input");
    inputOrEl.placeholder = "Origin";
    inputOrEl.setAttribute("name","route-origin");

    const inputDeEl = document.createElement("input");
    inputDeEl.setAttribute("type","text");
    inputDeEl.classList.add("text-input");
    inputDeEl.placeholder = "Destination";
    inputDeEl.setAttribute("name","route-destination");

    const inputDaEl = document.createElement("input");
    inputDaEl.setAttribute("type","text");
    inputDaEl.classList.add("text-input");
    inputDaEl.placeholder = "Date";
    inputDaEl.setAttribute("name","route-date");

    const inputStEl = document.createElement("input");
    inputStEl.setAttribute("type","text");
    inputStEl.classList.add("text-input");
    inputStEl.placeholder = "Start";
    inputStEl.setAttribute("name","route-start");

    const inputEnEl = document.createElement("input");
    inputEnEl.setAttribute("type","text");
    inputEnEl.classList.add("text-input");
    inputEnEl.placeholder = "End";
    inputEnEl.setAttribute("name","route-end");

    const inputPrEl = document.createElement("input");
    inputPrEl.setAttribute("type","text");
    inputPrEl.classList.add("text-input");
    inputPrEl.placeholder = "Price";
    inputPrEl.setAttribute("name","route-price");

    const brEl = document.createElement("br");

    const sEl = createNewSubmitRouteButton();
    sEl.addEventListener('click', onSubmitNewRoute);

    formEl.appendChild(inputIdEl);
    formEl.appendChild(inputOrEl);
    formEl.appendChild(inputDeEl);
    formEl.appendChild(inputDaEl);
    formEl.appendChild(inputStEl);
    formEl.appendChild(inputEnEl);
    formEl.appendChild(inputPrEl);
    formEl.appendChild(brEl);
    formEl.appendChild(sEl);

    myRoutesDivEl.appendChild(formEl);
}

function createNewSubmitRouteButton() {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'new-route-button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.classList.add('form-button');
    buttonEl.textContent = 'Add new route';

    return buttonEl;
}

function onSubmitNewRoute() {
    const loginFormEl = document.forms['new-route-form'];

    const taxiIdInputEl = loginFormEl.querySelector('input[name="taxi-id"]');
    const originInputEl = loginFormEl.querySelector('input[name="route-origin"]');
    const destinationInputEl = loginFormEl.querySelector('input[name="route-destination"]');
    const dateInputEl = loginFormEl.querySelector('input[name="route-date"]');
    const startInputEl = loginFormEl.querySelector('input[name="route-start"]');
    const endInputEl = loginFormEl.querySelector('input[name="route-end"]');
    const priceInputEl = loginFormEl.querySelector('input[name="route-price"]');

    removeAllChildren(myRoutesDivEl);
    const taxiId = taxiIdInputEl.value;
    const origin = originInputEl.value;
    const destination = destinationInputEl.value;
    const date = dateInputEl.value;
    const start = startInputEl.value;
    const end = endInputEl.value;
    const price = priceInputEl.value;

    const params = new URLSearchParams();
    params.append('taxi-id', taxiId);
    params.append('route-origin', origin);
    params.append('route-destination', destination);
    params.append('route-date', date);
    params.append('route-start', start);
    params.append('route-end', end);
    params.append('route-price', price);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onRouteSubmissionResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/routes');
    xhr.send(params);
}

function onRouteSubmissionResponse() {
    if (this.status === OK) {
        const route = JSON.parse(this.responseText);
        alert(route.message);
        onRoutesClicked();
    } else {
        onOtherResponse(myRoutesDivEl, this);
    }
}


function onRouteEditButtonClicked() {
    const id = this.dataset.routeEditId;
    const tableEl = document.getElementById('edit-route-table');
    const cells = tableEl.rows.namedItem('row-route-id-' + id).cells;

    for (let i = 0; i < cells.length - 1; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-route-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('Edit');
    saveButtonEl.appendChild(saveButtonTextNodeEl);
    saveButtonEl.dataset.routeId = id;
    saveButtonEl.addEventListener('click', onRouteSaveButtonClicked);
    document.getElementById('route-edit-button-' + id).appendChild(saveButtonEl);
}

function createPopUpInput(id, textContent) {
    const inputEl = document.createElement('input');
    inputEl.classList.add('pop-up-box');
    inputEl.name = 'input-route-id-' + id;
    inputEl.setAttribute('id', 'route-input-' + id);
    inputEl.value = textContent;
    return inputEl;
}

function onRouteSaveButtonClicked() {
    const id = this.dataset.routeId;
    const user = getCurrentUser();

    const inputs = document.getElementsByClassName('pop-up-box');

    const data = {};
    data.id = id;
    data.taxiId = inputs[0].value;
    data.origin = inputs[1].value;
    data.destination = inputs[2].value;
    data.date = inputs[3].value;
    data.start = inputs[4].value;
    data.end = inputs[5].value;
    data.price = inputs[6].value;
    const json = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onRouteEditSubmitResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('PUT', 'protected/routes');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.send(json);
}

function onRouteEditSubmitResponse() {
    if (this.status === OK) {
        const message = JSON.parse(this.responseText);
        alert(message.message);
        onRoutesClicked();
    } else {
        onOtherResponse(myRoutesDivEl, this);
    }
}

function onRouteOrderButtonClicked() {
    const routeId = this.dataset.routeOrderId;

    const params = new URLSearchParams();
    params.append('route-id', routeId);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onRouteOrderResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/orders');

    xhr.send(params);
}

function onRouteOrderResponse() {
    if (this.status === OK) {
        const message = JSON.parse(this.responseText);
        alert(message.message);
        onRoutesClicked();
    } else {
        onOtherResponse(myRoutesDivEl, this);
    }
}

function onRouteResponse() {
    if (this.status === OK) {
        const route = JSON.parse(this.responseText);
        onRouteLoad(route);
    } else {
        onOtherResponse(myRoutesDivEl, this);
    }
}

function onRouteLoad(route) {
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'routes-table');
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    removeAllChildren(myRoutesDivEl);
    myRoutesDivEl.appendChild(tableEl);
}
