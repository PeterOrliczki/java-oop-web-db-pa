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

    const nameTdEl = document.createElement('td');
    nameTdEl.classList.add('default-cell');
    nameTdEl.textContent = user.name;

    const emailTdEl = document.createElement('td');
    emailTdEl.classList.add('default-cell');
    emailTdEl.textContent = user.email;

    const passwordTdEl = document.createElement('td');
    passwordTdEl.classList.add('default-cell');
    passwordTdEl.textContent = '*****';

    const roleTdEl = document.createElement('td');
    roleTdEl.classList.add('default-cell');
    roleTdEl.textContent = user.role;

    const balanceTdEl = document.createElement('td');
    balanceTdEl.classList.add('default-cell');
    balanceTdEl.textContent = user.balance;

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "Edit";
    buttonEditEl.setAttribute('id', 'id-edit-user-button-' + user.id);

    buttonEditEl.dataset.userEditId = user.id;
    buttonEditEl.addEventListener('click', onUserEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'user-edit-user-button-' + user.id);

    const buttonDeleteEl = document.createElement('p');
    buttonDeleteEl.classList.add('icon-trash');
    buttonDeleteEl.textContent = "Delete";
    buttonDeleteEl.setAttribute('id', user.id);
    buttonDeleteEl.dataset.userDeleteId = user.id;
    buttonDeleteEl.addEventListener('click', onUserDeleteClicked);


    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-user-id-' + user.id);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(emailTdEl);
    trEl.appendChild(passwordTdEl);
    trEl.appendChild(roleTdEl);
    trEl.appendChild(balanceTdEl);
    trEl.appendChild(buttonOneTdEl);
    trEl.appendChild(buttonDeleteEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createUsersTableHeader() {
    const nameThEl = document.createElement('th');
    nameThEl.classList.add('default-th');``
    nameThEl.textContent = 'Name';

    const emailThEl = document.createElement('th');
    emailThEl.classList.add('default-th');
    emailThEl.textContent = 'Email';

    const passwordThEl = document.createElement('th');
    passwordThEl.classList.add('default-th');
    passwordThEl.textContent = 'Password';

    const roleThEl = document.createElement('th');
    roleThEl.classList.add('default-th');
    roleThEl.textContent = 'Role';

    const balanceThEl = document.createElement('th');
    balanceThEl.classList.add('default-th');
    balanceThEl.textContent = 'Balance';

    const trEl = document.createElement('tr');

    trEl.appendChild(nameThEl);
    trEl.appendChild(emailThEl);
    trEl.appendChild(passwordThEl);
    trEl.appendChild(roleThEl);
    trEl.appendChild(balanceThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function onUserEditButtonClicked() {
    const id = this.dataset.userEditId;
    const tableEl = document.getElementById('edit-user-table');
    const cells = tableEl.rows.namedItem('row-user-id-' + id).cells;

    for (let i = 0; i < cells.length - 3; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-user-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('Edit');
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
