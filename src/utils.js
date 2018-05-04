import * as components from "./app";

let typeId, vehicleId, modelId;

//receives a select and by the 'id' determines what to do
export function updateSelects(select) {
  if (select.target.selectedIndex !== -1) {
    components.preco.innerHTML = "";
    const id = select.target.parentElement.value;
    if (select.target.parentElement.id === 'type') {
      typeId = id;
      clearSelect(components.vehicleSelect);
      getInfoFromFipeTable(components.url + '/veiculos/' + typeId + '.json', function getResponse(array) {
        populateSelect(array, components.vehicleSelect);
      });
      clearSelect(components.modelSelect);
    } else if (select.target.parentElement.id === 'vehicle') {
      vehicleId = id;
      clearSelect(components.modelSelect);
      getInfoFromFipeTable(components.url + '/veiculo/' + typeId + '/' + vehicleId + '.json', function getResponse(array) {
        populateSelect(array, components.modelSelect);
      });
    } else {
      modelId = id;
      getInfoFromFipeTable(components.url + '/veiculo/' + typeId + '/' + vehicleId + '/' + modelId + '.json', function getResponse(array) {
        components.preco.innerHTML = "<br><h1 align='center'>" + (array['preco']) + "</h1>";
      });
    }
  }
}

export function createSelect(id, width = '100px', left, size = 4) {
  const select = document.createElement("select");
  select.id = id;
  select.size = size;
  select.style.width = width;
  select.style.position = 'absolute';
  select.style.left = left;
  select.addEventListener("click", updateSelects);
  return select;
}

//clear the select
export function clearSelect(select) {
  while (select.options.length) {
    select.remove(0);
  }
}

//the data returned by the get is inserted in the select determined
export function populateSelect(array, actualSelect) {
  let select = addAnOptionInSelect(actualSelect);
  array.forEach(element => {
    select(element['name'], element['id']);
  });
}

//when the select is detemined, returns a function that fills the select with options
export function addAnOptionInSelect(elemSelect) {
  return function (name, value) {
    const elemOption = document.createElement("option");
    elemOption.text = name;
    elemOption.value = value;
    elemSelect.add(elemOption, null);
  }
}

//catch the information by the url and returns in the callback
export function getInfoFromFipeTable(urlSend, callback) {
  return new Promise((resolve, reject){

  });
  const xhr = new XMLHttpRequest();
  const url = urlSend;
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callback(xhr.response);
    }
  }
  xhr.open('GET', url);
  xhr.send();
}
