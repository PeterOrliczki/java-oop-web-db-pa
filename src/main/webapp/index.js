const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

let headerDivEl;
let navDivEl;
let menuListEl;
let loginContentDivEl;
let registerRedirectEl;
let guestRedirectEl;
let loginRedirectEl;
let profileContentDivEl;
let profileContentTitleDivEl;
let myActivitiesDivEl;
let myUsersDivEl;
let myFlightsDivEl;
let myRoutesDivEl;
let myPlanesDivEl;
let myTaxisDivEl;

function newInfo(targetEl, message) {
    newMessage(targetEl, 'info', message);
}

function newError(targetEl, message) {
    newMessage(targetEl, 'error', message);
}

function newMessage(targetEl, cssClass, message) {
    clearMessages();

    const pEl = document.createElement('p');
    pEl.classList.add('message');
    pEl.classList.add(cssClass);
    pEl.textContent = message;

    targetEl.appendChild(pEl);
}

function clearMessages() {
    const messageEls = document.getElementsByClassName('message');
    for (let i = 0; i < messageEls.length; i++) {
        const messageEl = messageEls[i];
        messageEl.remove();
    }
}

function removeAllChildren(el) {
    while (el.lastChild) {
      if (el.lastChild.className !== 'content-header') {
        el.lastChild.remove();
      } else if (el.lastChild.className === 'content-header') {
        break;
      }
    }
}

function onNetworkError(response) {
    document.body.remove();
    const bodyEl = document.createElement('body');
    document.appendChild(bodyEl);
    newError(bodyEl, 'Network error, please try reloading the page');
}

function onOtherResponse(targetEl, xhr) {
    if (xhr.status === NOT_FOUND) {
        newError(targetEl, 'Not found');
        console.error(xhr);
    } else {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status === INTERNAL_SERVER_ERROR) {
            newError(targetEl, `Server error: ${json.message}`);
        } else if (xhr.status === UNAUTHORIZED || xhr.status === BAD_REQUEST) {
            newError(targetEl, json.message);
        } else {
            newError(targetEl, `Unknown error: ${json.message}`);
        }
    }
}

function showContents(ids) {
    const contentEls = document.getElementsByClassName('content');
    for (let i = 0; i < contentEls.length; i++) {
        const contentEl = contentEls[i];
        if (ids.includes(contentEl.id)) {
            contentEl.style.display = 'block';
        } else {
            contentEl.style.display = 'none';
        }
    }
}

function showMenu() {
    menuListEl.style.display = 'block';
}

function hideMenu() {
    menuListEl.style.display = 'none';
}

function showContentById(id) {
    const contentEl = document.getElementById(id);
    contentEl.style.display = 'block';
}

function hideContentById(id) {
    const contentEl = document.getElementById(id);
    contentEl.style.display = 'none';
}

function hasAuthorization() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/flights');
    xhr.send();
    if (xhr.status === OK) {
      return true;
    }
}

function setAuthorization(user) {
    return localStorage.setItem('user', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function setUnauthorized() {
    return localStorage.removeItem('user');
}

function onLoad() {
    headerDivEl = document.getElementById('header');
    navDivEl = document.getElementById('menu');
    menuListEl = document.getElementById('menu-list');
    loginContentDivEl = document.getElementById('login-content');

    loginRedirectEl = document.getElementById('login-redirect');
    loginRedirectEl.addEventListener('click', onLoginRedirectClicked);

    registerRedirectEl = document.getElementById('register-redirect');
    registerRedirectEl.addEventListener('click', onRegisterRedirectClicked);

    guestRedirectEl = document.getElementById('guest-redirect');
    guestRedirectEl.addEventListener('click', onGuestRedirectClicked);

    profileContentDivEl = document.getElementById('profile-content');
    profileContentTitleDivEl = document.getElementById('profile-content-title');

    myActivitiesDivEl = document.getElementById('activities-content');

    myUsersDivEl = document.getElementById('user-content');

    myFlightsDivEl = document.getElementById('flight-content');

    myRoutesDivEl = document.getElementById('route-content');

    myPlanesDivEl = document.getElementById('plane-content');

    myTaxisDivEl = document.getElementById('taxi-content');

    const loginButtonEl = document.getElementById('login-button');
    loginButtonEl.addEventListener('click', onLoginButtonClicked);

    const registerButtonEl = document.getElementById('register-button');
    registerButtonEl.addEventListener('click', onRegisterButtonClicked);
    getCurrentUser();
    if (hasAuthorization()) {
        onProfileLoad(getCurrentUser());
    } else {
        hideMenu();
        showContents(['login-content']);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);

