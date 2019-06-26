function onUsersClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/users');
    xhr.send();
}

function onUsersLoad() {
  if(this.status === OK) {
  const users = JSON.parse(this.responseText);
  createUsersDisplay(users);
  showContents(['user-content']);
  } else {
    onOtherResponse(myUsersDivEl, this);
  }
}

function createUsersDisplay(users) {
  if (users.length === 0) {
    removeAllChildren(myUsersDivEl);
    const pEl = document.createElement('p');
    pEl.setAttribute('id', 'user-info');
    pEl.textContent = 'The user log is empty';
    myUsersDivEl.appendChild(pEl);
    myUsersDivEl.appendChild(buttonEl);
  } else {
    removeAllChildren(myUsersDivEl);
    const tableEl = document.createElement('table');
    const theadEl = createUsersTableHeader();
    const tbodyEl = createUsersTableBody(users);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myUsersDivEl.appendChild(tableEl);
  }
}

function createUsersTableBody(users) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const eventNameTdEl = document.createElement('td');
    eventNameTdEl.classList.add('default-cell');
    eventNameTdEl.textContent = user.name;

    const tableNameTdEl = document.createElement('td');
    tableNameTdEl.classList.add('default-cell');
    tableNameTdEl.textContent = user.email;

    const userNameTdEl = document.createElement('td');
    userNameTdEl.classList.add('default-cell');
    userNameTdEl.textContent = user.password;

    const eventDateTdEl = document.createElement('td');
    eventDateTdEl.classList.add('default-cell');
    eventDateTdEl.textContent = user.role;

    const trEl = document.createElement('tr');
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(eventDateTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createUsersTableHeader() {
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

function onUserResponse() {
    if (this.status === OK) {
        const user = JSON.parse(this.responseText);
        onUserLoad(user);
    } else {
        onOtherResponse(myUsersDivEl, this);
    }
}

function onUserLoad(user) {
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'users-table');
    const theadEl = createUsersTableHeader();
    const tbodyEl= createUsersTableBody();
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    removeAllChildren(myUsersDivEl);
    myUsersDivEl.appendChild(tableEl);
}

