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

    const trEl = document.createElement('tr');
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(eventDateTdEl);

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

    const trEl = document.createElement('tr');

    trEl.appendChild(eventNameThEl);
    trEl.appendChild(tableNameThEl);
    trEl.appendChild(userNameThEl);
    trEl.appendChild(eventDateThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
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