function onProfileClicked() {
  onProfileLoad(getCurrentUser());
}

function onProfileLoad(user) {
    if (user.role === 'ADMIN') {
        showContentById('menu-li-activity');
        showContentById('menu-li-profile');
        showContentById('menu-li-users');
        showContentById('menu-li-flights');
        showContentById('menu-li-routes');
        showContentById('menu-li-planes');
        showContentById('menu-li-taxis');
        showContentById('menu-li-logout');
        hideContentById('menu-li-orders');
        showMenu();
    } else if (user.role === 'REGISTERED') {
        showContentById('menu-li-profile');
        showContentById('menu-li-flights');
        showContentById('menu-li-routes');
        showContentById('menu-li-orders');
        showContentById('menu-li-logout');
        hideContentById('menu-li-activity');
        hideContentById('menu-li-users');
        hideContentById('menu-li-planes');
        hideContentById('menu-li-taxis');
        showMenu();
    } else if (user.role === 'UNREGISTERED') {
        showContentById('menu-li-flights');
        showContentById('menu-li-routes');
        hideContentById('menu-li-activity');
        hideContentById('menu-li-profile');
        hideContentById('menu-li-users');
        hideContentById('menu-li-planes');
        hideContentById('menu-li-taxis');
        hideContentById('menu-li-orders');
        hideContentById('menu-li-logout');
        onFlightsClicked();
    }
    showProfileContent(user);
    if (user.role !== 'UNREGISTERED') {
        onProfileDisplayClicked();
    }
}

function showProfileContent(user) {
    const pEl = document.createElement('p');
    if (user.role === 'UNREGISTERED') {
      const textOne = document.createTextNode('Welcome! You are currently browsing the site as a guest. To access additional content, click ');
      pEl.appendChild(textOne);
      const registerAEl = document.createElement('a');
      registerAEl.textContent = 'here';
      registerAEl.href = 'javascript:void(0)';
      registerAEl.onclick = onRegisterRedirectClicked;
      pEl.appendChild(registerAEl);
      const textTwo = document.createTextNode(' to register.');
      pEl.appendChild(textTwo);
      showContents(['profile-content', 'flight-content']);
    } else {
      pEl.textContent = 'Welcome ' + user.name + '!';
      showContents(['profile-content']);
    }
    removeAllChildren(profileContentDivEl);
    profileContentDivEl.appendChild(pEl);

}

function onProfileDisplayClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSingleProfileLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/profile');
    xhr.send();
}

function onSingleProfileLoad() {
    if(this.status === OK) {
        const user = JSON.parse(this.responseText);
        showProfileData(user);
    } else {
        onOtherResponse(profileContentDivEl, this);
    }
}

function showProfileData(user) {
    removeAllChildren(profileContentDivEl);

    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'edit-profile-table');
    if (user.role === 'ADMIN') {
        const theadEl = createProfileTableHeaderAdmin();
        const tbodyEl = createProfileTableBodyAdmin(user);
        tableEl.appendChild(theadEl);
        tableEl.appendChild(tbodyEl);
        profileContentDivEl.appendChild(tableEl);
    } else {
        const theadEl = createProfileTableHeaderNotAdmin();
        const tbodyEl = createProfileTableBodyNotAdmin(user);
        tableEl.appendChild(theadEl);
        tableEl.appendChild(tbodyEl);
        profileContentDivEl.appendChild(tableEl);
    }
}

function createProfileTableHeaderAdmin() {
    const nameThEl = document.createElement('th');
    nameThEl.textContent = 'Name';

    const emailThEl = document.createElement('th');
    emailThEl.textContent = 'Email';

    const passwordThEl = document.createElement('th');
    passwordThEl.textContent = 'Password';

    const roleThEl = document.createElement('th');
    roleThEl.textContent = 'Role';

    const buttonOneThEl = document.createElement('th');
    buttonOneThEl.textContent = 'Edit';

    const trEl = document.createElement('tr');
    trEl.appendChild(nameThEl);
    trEl.appendChild(emailThEl);
    trEl.appendChild(passwordThEl);
    trEl.appendChild(roleThEl);
    trEl.appendChild(buttonOneThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);

    return theadEl;
}

function createProfileTableHeaderNotAdmin() {
    const nameThEl = document.createElement('th');
    nameThEl.textContent = 'Name';

    const emailThEl = document.createElement('th');
    emailThEl.textContent = 'Email';

    const passwordThEl = document.createElement('th');
    passwordThEl.textContent = 'Password';

    const balanceThEl = document.createElement('th');
    balanceThEl.textContent = 'Balance';

    const buttonOneThEl = document.createElement('th');
    buttonOneThEl.textContent = 'Edit';

    const trEl = document.createElement('tr');
    trEl.appendChild(nameThEl);
    trEl.appendChild(emailThEl);
    trEl.appendChild(passwordThEl);
    trEl.appendChild(balanceThEl);
    trEl.appendChild(buttonOneThEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);

    return theadEl;
}

function createProfileTableBodyAdmin(user) {
    const tbodyEl = document.createElement('tbody');

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = user.name;
    nameTdEl.setAttribute('id', user.id);

    const emailTdEl = document.createElement('td');
    emailTdEl.textContent = user.email;
    emailTdEl.setAttribute('id', user.id);

    const passwordTdEl = document.createElement('td');
    passwordTdEl.textContent = '*****';
    passwordTdEl.setAttribute('id', user.id);

    const roleTdEl = document.createElement('td');
    roleTdEl.textContent = user.role;
    roleTdEl.setAttribute('id', user.role);

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "Edit";
    buttonEditEl.setAttribute('id', 'id-edit-button-' + user.id);

    buttonEditEl.dataset.userEditId = user.id;
    buttonEditEl.addEventListener('click', onProfileEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'user-edit-button-' + user.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-user-id-' + user.id);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(emailTdEl);
    trEl.appendChild(passwordTdEl);
    trEl.appendChild(roleTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);


    return tbodyEl;
}

function createProfileTableBodyNotAdmin(user) {
    const tbodyEl = document.createElement('tbody');

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = user.name;
    nameTdEl.setAttribute('id', user.id);

    const emailTdEl = document.createElement('td');
    emailTdEl.textContent = user.email;
    emailTdEl.setAttribute('id', user.id);

    const passwordTdEl = document.createElement('td');
    passwordTdEl.textContent = '*****';
    passwordTdEl.setAttribute('id', user.id);

    const balanceTdEl = document.createElement('td');
    balanceTdEl.textContent = user.balance;
    balanceTdEl.setAttribute('id', user.balance);

    const buttonEditEl = document.createElement('p');
    buttonEditEl.textContent = "Edit";
    buttonEditEl.setAttribute('id', 'id-edit-button-' + user.id);

    buttonEditEl.dataset.userEditId = user.id;
    buttonEditEl.addEventListener('click', onProfileEditButtonClicked);

    const buttonOneTdEl = document.createElement('td');
    buttonOneTdEl.appendChild(buttonEditEl);
    buttonOneTdEl.setAttribute('id', 'user-edit-button-' + user.id);

    const trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row-user-id-' + user.id);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(emailTdEl);
    trEl.appendChild(passwordTdEl);
    trEl.appendChild(balanceTdEl);
    trEl.appendChild(buttonOneTdEl);

    tbodyEl.appendChild(trEl);


    return tbodyEl;
}

function onProfileEditButtonClicked() {
    const id = this.dataset.userEditId;
    const tableEl = document.getElementById('edit-profile-table');
    const cells = tableEl.rows.namedItem('row-user-id-' + id).cells;

    for (let i = 0; i < cells.length - 2; i++) {
        const tdEl = cells[i];
        const oldValue = tdEl.textContent;
        tdEl.textContent = '';
        tdEl.appendChild(createPopUpInput(i, oldValue));
    }

    document.getElementById('id-edit-button-' + id).style.display = 'none';
    const saveButtonEl = document.createElement('p');
    const saveButtonTextNodeEl = document.createTextNode('Edit');
    saveButtonEl.appendChild(saveButtonTextNodeEl);
    saveButtonEl.dataset.userId = id;
    saveButtonEl.addEventListener('click', onProfileSaveButtonClicked);
    document.getElementById('user-edit-button-' + id).appendChild(saveButtonEl);
}

function createPopUpInput(id, textContent) {
    const inputEl = document.createElement('input');
    inputEl.classList.add('pop-up-box');
    inputEl.name = 'input-user-id-' + id;
    inputEl.setAttribute('id', 'user-input-' + id);
    inputEl.value = textContent;
    return inputEl;
}

function onProfileSaveButtonClicked() {
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
    xhr.addEventListener('load', onUserEditSubmitResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('PUT', 'protected/profile');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.send(json);
}

function onUserEditSubmitResponse() {
   if (this.status === OK) {
      const response = JSON.parse(this.responseText);
      alert(response.message);
      onProfileClicked();
   } else {
       onOtherResponse(mySchedulesDivEl, this);
   }
}
