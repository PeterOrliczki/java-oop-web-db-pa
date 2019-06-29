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
  } else {
    removeAllChildren(myUsersDivEl);
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'edit-user-table');
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
    userNameTdEl.textContent = '*****';

    const eventDateTdEl = document.createElement('td');
    eventDateTdEl.classList.add('default-cell');
    eventDateTdEl.textContent = user.role;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "edit button placeholder";
    buttonEditEl.setAttribute('id', 'id-edit-user-button-' + user.id);

    buttonEditEl.dataset.userEditId = user.id;
    buttonEditEl.addEventListener('click', onUserEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'user-edit-user-button-' + user.id);

    const buttonDeleteEl = document.createElement('p');
    buttonDeleteEl.classList.add('icon-trash');
    buttonDeleteEl.textContent = "delete button placeholder";
    buttonDeleteEl.setAttribute('id', user.id);
    buttonDeleteEl.dataset.userDeleteId = user.id;
    buttonDeleteEl.addEventListener('click', onUserDeleteClicked);


    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-user-id-' + user.id);
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(eventDateTdEl);
    trEl.appendChild(buttonOneTdEl);
    trEl.appendChild(buttonDeleteEl);

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

    const buttonOneTdEl = document.createElement('th');
    buttonOneTdEl.textContent = 'Edit';

    const buttonTwoTdEl = document.createElement('th');
    buttonTwoTdEl.textContent = 'Delete';

    const trEl = document.createElement('tr');

    trEl.appendChild(eventNameThEl);
    trEl.appendChild(tableNameThEl);
    trEl.appendChild(userNameThEl);
    trEl.appendChild(eventDateThEl);
    trEl.appendChild(buttonOneTdEl);
    trEl.appendChild(buttonTwoTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function onUserEditButtonClicked() {
    const id = this.dataset.userEditId;
    const tableEl = document.getElementById('edit-user-table');
    const cells = tableEl.rows.namedItem('row-user-id-' + id).cells;

    for (let i = 0; i < cells.length - 1; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-user-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('edit button placeholder');
    saveButtonEl.appendChild(saveButtonTextNodeEl);
    saveButtonEl.dataset.userId = id;
    saveButtonEl.addEventListener('click', onUserSaveButtonClicked);
    document.getElementById('user-edit-user-button-' + id).appendChild(saveButtonEl);
}

function createPopUpInput(id, textContent) {
    const inputEl = document.createElement('input');
    inputEl.classList.add('pop-up-box');
    inputEl.name = 'input-user-id-' + id;
    inputEl.setAttribute('id', 'user-input-' + id);
    inputEl.value = textContent;
    return inputEl;
}

function onUserSaveButtonClicked() {
    const id = this.dataset.userId;
    const user = getCurrentUser();

    const inputs = document.getElementsByClassName('pop-up-box');

    const data = {};
    data.id = id;
    data.name = inputs[0].value;
    data.email = inputs[1].value;
    data.password = inputs[2].value;
    data.role = user.role;
    const json = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAdminUserEditSubmitResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('PUT', 'protected/profile');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.send(json);
}

function onUserDeleteClicked() {
    removeAllChildren(myUsersDivEl);
    const userId = this.dataset.userDeleteId;

    const params = new URLSearchParams();
    params.append('id', userId);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onDeleteResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('DELETE', 'protected/users?' + params.toString());
    xhr.send();
}

function onDeleteResponse() {
    if(this.status === OK) {
        const response = JSON.parse(this.responseText);
        alert(response.message);
        onUsersClicked();
    } else {
        onOtherResponse(myUsersDivEl, this);
    }
}

function onUserResponse() {
    if (this.status === OK) {
        const user = JSON.parse(this.responseText);
        onUserLoad(user);
    } else {
        onOtherResponse(myUsersDivEl, this);
    }
}

function onAdminUserEditSubmitResponse() {
    if (this.status === OK) {
        const message = JSON.parse(this.responseText);
        alert(message.message);
        onUsersClicked();
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
