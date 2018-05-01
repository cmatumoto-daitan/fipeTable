import * as components from "./app";

let typeId,vehicleId, modelId;
//receive a select and by the 'id' determine what to do
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

//limpa o select determinado
export function clearSelect(select) {
    while (select.options.length) {
        select.remove(0);
    }
}

//os dados retornados pelo get são inseridos no select determinado
export function populateSelect(array, actualSelect) {
    console.log(actualSelect);
    let select = AddAnOptionInSelect(actualSelect);
    array.forEach(element => {
        select(element['name'], element['id']);
        console.log(element);
    });
}

//determinando-se o select a ser preenchido, retorna uma função que preenche o select com os options
export function AddAnOptionInSelect(elemSelect) {
    return function (name, value) {
        const elemOption = document.createElement("option");
        elemOption.text = name;
        elemOption.value = value;
        elemSelect.add(elemOption, null);
    }
}

//pega as informações da API pelo get retornando-as pelo callback 
export function getInfoFromFipeTable(urlSend, callback) {
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