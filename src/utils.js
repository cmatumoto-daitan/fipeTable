import components from './app';

let typeId;
let vehicleId;
let modelId;

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
    const url = urlSend;
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => { reject(xhr.statusText); };
    xhr.open('GET', url, true);
    xhr.send();
  });
}

// when the select is detemined, returns a function that fills the select with options
export function addAnOptionInSelect(elemSelect) {
  return (name, value) => {
    const elemOption = document.createElement('option');
    elemOption.text = name;
    elemOption.value = value;
    elemSelect.add(elemOption, null);
  };
}

// the data returned by the get is inserted in the select determined
export function populateSelect(array, actualSelect) {
  const select = addAnOptionInSelect(actualSelect);
  array.forEach(element => (select(element.name, element.id)));
}

// receives a select and by the 'id' determines what to do
export function updateSelects(select) {
  if (select.target.selectedIndex !== -1) {
    components.preco.innerHTML = '';
    const id = select.target.parentElement.value;
    if (select.target.parentElement.id === 'type') {
      typeId = id;
      clearSelect(components.vehicleSelect);
      getInfoFromFipeTable(`${components.url}/veiculos/${typeId}.json`)
        .then((array) => { populateSelect(array, components.vehicleSelect); })
        .catch();
      clearSelect(components.modelSelect);
    } else if (select.target.parentElement.id === 'vehicle') {
      vehicleId = id;
      clearSelect(components.modelSelect);
      getInfoFromFipeTable(`${components.url}/veiculo/${typeId}/${vehicleId}.json`)
        .then((array) => { populateSelect(array, components.modelSelect); })
        .catch();
    } else {
      modelId = id;
      getInfoFromFipeTable(`${components.url}/veiculo/${typeId}/${vehicleId}/${modelId}.json`)
        .then((array) => { components.preco.innerHTML = (`<br><h1 align='center'>${array.preco}</h1>`); })
        .catch();
    }
  }
}

export function createSelect(id, width = '100px', left, size = 4) {
  const select = document.createElement('select');
  select.id = id;
  select.size = size;
  select.style.width = width;
  select.style.position = 'absolute';
  select.style.left = left;
  select.addEventListener('click', updateSelects);
  return select;
}
