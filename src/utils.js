let typeId;
let vehicleId;
let modelId;
let typeSelect;
let vehicleSelect;
let modelSelect;

const preco = document.createElement('h1');

const url = 'http://fipeapi.appspot.com/api/1/carros';

const app = document.getElementById('app');
// clear the select
export function clearSelect(select) {
  while (select.options.length) {
    select.remove(0);
  }
}

// catch the information by the url and returns a promisse with the result
export function getInfoFromFipeTable(urlSend) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => { reject(xhr.statusText); };
    xhr.open('GET', urlSend, true);
    xhr.send();
  });
}

// when the select is detemined, returns a function that fills the select with options
function addAnOptionInSelect(elemSelect) {
  return (name, value) => {
    const elemOption = document.createElement('option');
    elemOption.text = name;
    elemOption.value = value;
    elemSelect.add(elemOption, null);
  };
}

// the data returned by the get is inserted in the select determined
function populateSelect(array, actualSelect) {
  const select = addAnOptionInSelect(actualSelect);
  array.forEach(element => (select(element.name, element.id)));
}

// receives a select and by the 'id' determines what to do
function updateSelects(select) {
  if (select.target.selectedIndex !== -1) {
    preco.innerHTML = '';
    const id = select.target.parentElement.value;
    if (select.target.parentElement.id === 'type') {
      typeId = id;
      clearSelect(vehicleSelect);
      getInfoFromFipeTable(`${url}/veiculos/${typeId}.json`)
        .then((array) => { populateSelect(array, vehicleSelect); })
        .catch();
      clearSelect(modelSelect);
    } else if (select.target.parentElement.id === 'vehicle') {
      vehicleId = id;
      clearSelect(modelSelect);
      getInfoFromFipeTable(`${url}/veiculo/${typeId}/${vehicleId}.json`)
        .then((array) => { populateSelect(array, modelSelect); })
        .catch();
    } else {
      modelId = id;
      getInfoFromFipeTable(`${url}/veiculo/${typeId}/${vehicleId}/${modelId}.json`)
        .then((array) => { preco.innerHTML = (`<br><h1 align='center'>${array.preco}</h1>`); })
        .catch();
    }
  }
}

function createSelect(id, width = '100px', left, size = 4) {
  const select = document.createElement('select');
  select.id = id;
  select.size = size;
  select.style.width = width;
  select.style.position = 'absolute';
  select.style.left = left;
  select.addEventListener('click', updateSelects);
  return select;
}

export default function loadElements() {
  // the title of the page
  app.innerHTML = "<h1 align='center'>FIPE Table</h1>";
  // first select
  typeSelect = createSelect('type', '200px', '500px');
  // second select
  vehicleSelect = createSelect('vehicle', '200px', '800px');
  // third select
  modelSelect = createSelect('model', '200px', '1100px');

  // set the elements in document
  app.appendChild(typeSelect);
  app.appendChild(vehicleSelect);
  app.appendChild(modelSelect);
  app.appendChild(preco);

  // fills the first select
  getInfoFromFipeTable(`${url}/marcas.json`)
    .then((array) => { populateSelect(array, typeSelect); });
}
