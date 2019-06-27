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
  if (routes.length === 0) {
    removeAllChildren(myRoutesDivEl);
    const pEl = document.createElement('p');
    pEl.setAttribute('id', 'route-info');
    pEl.textContent = 'The route log is empty';
    myRoutesDivEl.appendChild(pEl);
    myRoutesDivEl.appendChild(buttonEl);
  } else {
    removeAllChildren(myRoutesDivEl);
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'edit-route-table');
    const theadEl = createRoutesTableHeader();
    const tbodyEl = createRoutesTableBody(routes);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myRoutesDivEl.appendChild(tableEl);
  }
}

function createRoutesTableBody(routes) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];

    const eventNameTdEl = document.createElement('td');
    eventNameTdEl.classList.add('default-cell');
    eventNameTdEl.textContent = route.origin;

    const tableNameTdEl = document.createElement('td');
    tableNameTdEl.classList.add('default-cell');
    tableNameTdEl.textContent = route.destination;

    const userNameTdEl = document.createElement('td');
    userNameTdEl.classList.add('default-cell');
    userNameTdEl.textContent = route.start;

    const eventDateTdEl = document.createElement('td');
    eventDateTdEl.classList.add('default-cell');
    eventDateTdEl.textContent = route.end;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "edit button placeholder";
    buttonEditEl.setAttribute('id', 'id-edit-route-button-' + route.id);

    buttonEditEl.dataset.routeEditId = route.id;
    buttonEditEl.addEventListener('click', onRouteEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'route-edit-button-' + route.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-route-id-' + route.id);
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(eventDateTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createRoutesTableHeader() {
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
    const saveButtonTextNodeEl = document.createTextNode('edit button placeholder');
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
    data.origin = inputs[0].value;
    data.destination = inputs[1].value;
    data.start = inputs[2].value;
    data.end = inputs[3].value;
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
