function onActivitiesClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onActivitiesLoad);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/activities');
    xhr.send();
}

function onActivitiesLoad() {
  if(this.status === OK) {
  const activities = JSON.parse(this.responseText);
  createActivitiesDisplay(activities);
  showContents(['activities-content']);
  } else {
    onOtherResponse(myActivitiesDivEl, this);
  }
}

function createActivitiesDisplay(activities) {
  if (activities.length === 0) {
    removeAllChildren(myActivitiesDivEl);
    const pEl = document.createElement('p');
    pEl.setAttribute('id', 'activity-info');
    pEl.textContent = 'The activity log is empty';
    myActivitiesDivEl.appendChild(pEl);
    myActivitiesDivEl.appendChild(buttonEl);
  } else {
    removeAllChildren(myActivitiesDivEl);
    const tableEl = document.createElement('table');
    const theadEl = createActivitiesTableHeader();
    const tbodyEl = createActivitiesTableBody(activities);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    myActivitiesDivEl.appendChild(tableEl);
  }
}

function createActivitiesTableBody(activities) {
  const tbodyEl = document.createElement('tbody');

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];

    const eventNameTdEl = document.createElement('td');
    eventNameTdEl.classList.add('default-cell');
    eventNameTdEl.textContent = activity.eventName;

    const tableNameTdEl = document.createElement('td');
    tableNameTdEl.classList.add('default-cell');
    tableNameTdEl.textContent = activity.tableName;

    const userNameTdEl = document.createElement('td');
    userNameTdEl.classList.add('default-cell');
    userNameTdEl.textContent = activity.userName;

    const eventDateTdEl = document.createElement('td');
    eventDateTdEl.classList.add('default-cell');
    eventDateTdEl.textContent = activity.eventDate;

    const trEl = document.createElement('tr');
    trEl.appendChild(eventNameTdEl);
    trEl.appendChild(tableNameTdEl);
    trEl.appendChild(userNameTdEl);
    trEl.appendChild(eventDateTdEl);

    tbodyEl.appendChild(trEl);
  }

  return tbodyEl;
}

function createActivitiesTableHeader() {
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

function onActivityResponse() {
    if (this.status === OK) {
        const activity = JSON.parse(this.responseText);
        onActivityLoad(activity);
    } else {
        onOtherResponse(myActivitiesDivEl, this);
    }
}

function onActivityLoad(activity) {
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'activities-table');
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    removeAllChildren(myActivitiesDivEl);
    myActivitiesDivEl.appendChild(tableEl);
}
