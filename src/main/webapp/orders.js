function onOrdersClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onOrdersLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/orders');
    xhr.send();
}

function onOrdersLoad() {
  if(this.status === OK) {
  const orders = JSON.parse(this.responseText);
  createOrdersDisplay(orders);
  showContents(['order-content']);
  } else {
    onOtherResponse(myOrdersDivEl, this);
  }
}

function createOrdersDisplay(orders) {
  if (orders.length === 0) {
    removeAllChildren(myOrdersDivEl);
    const pEl = document.createElement('p');
    pEl.setAttribute('id', 'order-info');
    pEl.textContent = 'The order log is empty';
    myOrdersDivEl.appendChild(pEl);
  } else {
    removeAllChildren(myOrdersDivEl);
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'edit-order-table');
    const theadEl = createOrdersTableHeader();
    const tbodyEl = createOrdersTableBody(orders);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myOrdersDivEl.appendChild(tableEl);
  }
}

function createOrdersTableBody(orders) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    const idTdEl = document.createElement('td');
    idTdEl.classList.add('default-cell');
    idTdEl.textContent = order.id;

    const orTdEl = document.createElement('td');
    orTdEl.classList.add('default-cell');
    orTdEl.textContent = order.origin;

    const daTdEl = document.createElement('td');
    daTdEl.classList.add('default-cell');
    daTdEl.textContent = order.date;

    const stTdEl = document.createElement('td');
    stTdEl.classList.add('default-cell');
    stTdEl.textContent = order.start;

    const trEl = document.createElement('tr');
    // trEl.setAttribute('id', 'row-order-id-' + flight.id);
    trEl.appendChild(idTdEl);
    trEl.appendChild(orTdEl);
    trEl.appendChild(daTdEl);
    trEl.appendChild(stTdEl);

    tbodyEl.appendChild(trEl);
  }
  return tbodyEl;
}

function createOrdersTableHeader() {
     const idThEl = document.createElement('th');
     idThEl.classList.add('default-th');``
     idThEl.textContent = 'Flight ID';

     const orThEl = document.createElement('th');
     orThEl.classList.add('default-th');``
     orThEl.textContent = 'Origin';

     const daThEl = document.createElement('th');
     daThEl.classList.add('default-th');
     daThEl.textContent = 'Date';

     const stThEl = document.createElement('th');
     stThEl.classList.add('default-th');
     stThEl.textContent = 'Start';

     const trEl = document.createElement('tr');

     trEl.appendChild(idThEl);
     trEl.appendChild(orThEl);
     trEl.appendChild(daThEl);
     trEl.appendChild(stThEl);

     const theadEl = document.createElement('thead');
     theadEl.appendChild(trEl);
     return theadEl;
}

function onOrderResponse() {
    if (this.status === OK) {
        const order = JSON.parse(this.responseText);
        onOrderLoad(order);
    } else {
        onOtherResponse(myOrdersDivEl, this);
    }
}

function onOrderLoad(order) {
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'orders-table');
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    removeAllChildren(myOrdersDivEl);
    myOrdersDivEl.appendChild(tableEl);
}
