let pracownicy = [{
        'imie': 'Jan',
        'nazwisko': 'Kowalski',
        'dzial': 'IT',
        'wynagrodzenieKwota': '3000',
        'wynagrodzenieWaluta': 'PLN'
    },
    {
        'imie': 'Anna',
        'nazwisko': 'Bąk',
        'dzial': 'Administracja',
        'wynagrodzenieKwota': '2400.50',
        'wynagrodzenieWaluta': 'PLN'
    },
    {
        'imie': 'Paweł',
        'nazwisko': 'Zabłocki',
        'dzial': 'IT',
        'wynagrodzenieKwota': '3300',
        'wynagrodzenieWaluta': 'PLN'
    },
    {
        'imie': 'Tomasz',
        'nazwisko': 'Osiecki',
        'dzial': 'Administracja',
        'wynagrodzenieKwota': '2100',
        'wynagrodzenieWaluta': 'PLN'
    },
    {
        'imie': 'Iwona',
        'nazwisko': 'Leihs-Gutowska',
        'dzial': 'Handlowiec',
        'wynagrodzenieKwota': '3100',
        'wynagrodzenieWaluta': 'PLN'
    },
]


// CREATE AND RENDER WORKERS TABLE
function createWorkersTable(array) {
    let workersTableDiv = document.createElement('div');
    workersTableDiv.classList.add('workers-table');

    let table = document.createElement('table');

    //tHead
    let tHead = document.createElement('thead');
    let headerRow = document.createElement('tr');

    let imieHeader = document.createElement('th');
    let nazwiskoHeader = document.createElement('th');
    let dzialHeader = document.createElement('th');
    let wynagrodzenieHeader = document.createElement('th');

    imieHeader.innerHTML = 'Imię';
    nazwiskoHeader.innerHTML = 'Nazwisko';
    dzialHeader.innerHTML = 'Dział';
    wynagrodzenieHeader.innerHTML = 'Wynagrodzenie w PLN';
    headerRow.appendChild(imieHeader);
    headerRow.appendChild(nazwiskoHeader);
    headerRow.appendChild(dzialHeader);
    headerRow.appendChild(wynagrodzenieHeader);
    tHead.appendChild(headerRow);

    //tBody
    let tBody = document.createElement('tbody');

    for (let i = 0; i < array.length; i++) {
        let row = document.createElement('tr');
        for (let key in array[i]) {
            let td = document.createElement('td');
            if (key === 'wynagrodzenieKwota') {
                td.innerHTML = array[i][key] + ' PLN';
                row.appendChild(td);
            } else if (key === 'wynagrodzenieWaluta') {
                break;
            } else {
                td.innerHTML = array[i][key];
                row.appendChild(td);
            }
            tBody.appendChild(row);
        }
        table.appendChild(tHead);
        table.appendChild(tBody);
        workersTableDiv.appendChild(table);
        document.body.appendChild(workersTableDiv);
    }
}

//ADD A NEW WORKER FUNCTION
const form = document.getElementById("newUser");
form.addEventListener('submit', addNewWorker);

function addNewWorker(el) {
    el.preventDefault();
    let newObjectUser = {};
    newObjectUser.imie = document.querySelector('#imie').value;
    newObjectUser.nazwisko = document.querySelector('#nazwisko').value;
    newObjectUser.dzial = document.querySelector('#dzial').value;
    newObjectUser.wynagrodzenieKwota = document.querySelector('#wynagrodzenie').value;
    newObjectUser.wynagrodzenieWaluta = 'PLN';

    pracownicy.push(newObjectUser);

    let tBody = document.querySelector('tbody');
    let row = document.createElement('tr');
    for (let key in newObjectUser) {
        let td = document.createElement('td');
        if (key === 'wynagrodzenieKwota') {
            td.innerHTML = newObjectUser[key] + ' PLN';
            row.appendChild(td);
        } else if (key === 'wynagrodzenieWaluta') {
            break;
        } else {
            td.innerHTML = newObjectUser[key];
            row.appendChild(td);
        }
    }
    tBody.appendChild(row);

    //calculate sums again after adding new worker 
    let workersTable = document.querySelector('.workers-table');
    workersTable.removeChild(document.querySelector('.sums'));
    sum(pracownicy);

    //update search engine with new selection options
    let body = document.querySelector('body');
    body.removeChild(document.querySelector('.search'));
    document.forms[0].reset();
    createSearchEngine();
}

// CALCULATE AND RENDER SUMS FUNCTION
function sum(array) {
    let totalSum = 0;
    let itSum = 0;
    let adminSum = 0;
    let handlowiecSum = 0;
    for (let i = 0; i < array.length; i++) {
        totalSum += parseFloat(array[i].wynagrodzenieKwota);
        if (array[i].dzial === 'IT') {
            itSum += parseFloat(array[i].wynagrodzenieKwota);
        }
        if (array[i].dzial === 'Administracja') {
            adminSum += parseFloat(array[i].wynagrodzenieKwota);
        }
        if (array[i].dzial === 'Handlowiec') {
            handlowiecSum += parseFloat(array[i].wynagrodzenieKwota);
        }
    }

    // render sums
    let sumDiv = document.createElement('div');
    sumDiv.classList.add('sums');
    let totalSumP = document.createElement('p');
    let itSumP = document.createElement('p');
    let adminSumP = document.createElement('p');
    let handlowiecSumP = document.createElement('p');

    totalSumP.innerHTML = 'Całkowita suma wynagrodzeń: ' + totalSum + ' PLN';
    itSumP.innerHTML = 'Suma wynagrodzeń dział IT: ' + itSum + ' PLN';
    adminSumP.innerHTML = 'Suma wynagrodzeń dział Administracja: ' + adminSum + ' PLN';
    handlowiecSumP.innerHTML = 'Suma wynagrodzeń dział Handlowiec: ' + handlowiecSum + ' PLN';

    sumDiv.appendChild(itSumP);
    sumDiv.appendChild(adminSumP);
    sumDiv.appendChild(handlowiecSumP);
    sumDiv.appendChild(totalSumP);
    let workersTableDiv = document.querySelector('.workers-table');
    workersTableDiv.appendChild(sumDiv);
}


// CREATE SEARCH ENGINE FUNCTION

function createSearchEngine() {
    let searchDiv = document.createElement('div');
    searchDiv.classList.add("search");

    let searchForm = document.createElement('form');
    searchForm.setAttribute('method', "post");
    searchForm.setAttribute('action', "submit.php");

    searchDiv.appendChild(searchForm);

    let searchFieldset = document.createElement('fieldset');
    searchForm.appendChild(searchFieldset);

    let searchLegend = document.createElement('legend');
    searchLegend.innerHTML = 'Wyszukaj';
    searchFieldset.appendChild(searchLegend)

    let labelOsoba = document.createElement('label');
    labelOsoba.setAttribute('for', "osoba");
    labelOsoba.innerHTML = 'Osoba: ';
    searchFieldset.appendChild(labelOsoba);

    let inputOsoba = document.createElement("input");
    inputOsoba.setAttribute('type', "text");
    inputOsoba.setAttribute('name', "osoba");
    inputOsoba.setAttribute('id', "osoba");
    searchFieldset.appendChild(inputOsoba);

    let labelDzial = document.createElement('label');
    labelDzial.setAttribute('for', "dzial-search");
    labelDzial.innerHTML = 'Dzial: ';
    searchFieldset.appendChild(labelDzial);

   let inputDzial =  createSearchDzial(pracownicy);
   searchFieldset.appendChild(inputDzial);

   let labelZarobkiOd = document.createElement('label');
   labelZarobkiOd.setAttribute('for', "zarobki-od");
   labelZarobkiOd.innerHTML = 'Zarobki od: ';
   searchFieldset.appendChild(labelZarobkiOd);

   let inputZarobkiOd = document.createElement("input");
    inputZarobkiOd.setAttribute('type', "text");
    inputZarobkiOd.setAttribute('name', "zarobki-od");
    inputZarobkiOd.setAttribute('id', "zarobki-od");
    searchFieldset.appendChild(inputZarobkiOd);

    let labelZarobkiDo = document.createElement('label');
    labelZarobkiDo.setAttribute('for', "zarobki-od: ");
    labelZarobkiDo.innerHTML = 'do: ';
    searchFieldset.appendChild(labelZarobkiDo);
 
    let inputZarobkiDo = document.createElement("input");
     inputZarobkiDo.setAttribute('type', "text");
     inputZarobkiDo.setAttribute('name', "zarobki-do");
     inputZarobkiDo.setAttribute('id', "zarobki-do");
     searchFieldset.appendChild(inputZarobkiDo);

    let submitInput = document.createElement("button");
    submitInput.setAttribute('id', 'search-button');
    submitInput.innerHTML = 'Wyszukaj';
    submitInput.setAttribute('type', 'submit');
    searchFieldset.appendChild(submitInput);
    submitInput.addEventListener('click', searchData);

    document.body.appendChild(searchDiv);
}

// ADD OPTIONS TO DZIAL SELECTION INPUT
function createSearchDzial(array) {
    let inputDzial = document.createElement("select");
    inputDzial.setAttribute('type', "select");
    inputDzial.setAttribute('name', "dzial-search");
    inputDzial.setAttribute('id', "dzial-search");
    let startSelection = document.createElement('option');
    startSelection.innerHTML = 'wybierz';
    inputDzial.appendChild(startSelection);
    // get unique set of Dzial options from database
    let mySet = new Set();
    for (let i = 0; i < array.length; i++) {
        for (let key in array[i]) {
            if (key === 'dzial') {
                mySet.add(array[i][key]);
            }
        }
    }
    for (let item of mySet) {
        let option = document.createElement('option');
        option.innerHTML = item;
        inputDzial.appendChild(option);
    }
 return inputDzial;
}

//Main Search function
function searchData(el){
    el.preventDefault();
    let osoba = document.getElementById('osoba')
    let osobaValue = osoba.value ;
    let dzial = document.getElementById('dzial-search');
    let dzialValue = dzial.value;
 

    let zarobkiOd = document.getElementById('zarobki-od');
    let odValue = parseFloat(zarobkiOd.value);
    let zarobkiDo = document.getElementById('zarobki-do');
    let doValue = parseFloat(zarobkiDo.value);
 
    searchOsoba(pracownicy,osobaValue,dzialValue);
    searchByWage(pracownicy,odValue,doValue);
    document.forms[1].reset();
}


function searchOsoba(array,osobaValue,dzialValue){

    for (let i = 0; i < array.length; i++) {
        for (const key in array[i]) {
            if (array[i][key] === osobaValue || array[i][key] === dzialValue) {
                valueFound = true;
                console.log(array[i]);
            }
        }
    }
    if(valueFound === false){
        alert('Nie znaleziono pracowników');
    }
}

//search by wynagrodzenie function
function searchByWage(array,a,b){

    for (let i = 0; i < array.length; i++) {
         
            if ((parseFloat(array[i].wynagrodzenieKwota) >= a) && (parseFloat(array[i].wynagrodzenieKwota) <= b) ){
                console.log(array[i]);
        }
    }
}



createWorkersTable(pracownicy);
sum(pracownicy);
createSearchEngine();
