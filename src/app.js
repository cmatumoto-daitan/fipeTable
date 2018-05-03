import * as functions from './utils';

export let typeSelect,
  vehicleSelect,
  modelSelect,
  preco = document.createElement('h1');

export const url = ['http://fipeapi.appspot.com/api/1/carros'];

const app = document.getElementById('app');

function loadElements() {
  //the title os fthe page
  app.innerHTML = "<h1 align='center'>FIPE Table</h1>";
  //first select    
  typeSelect = functions.createSelect('type', '200px', '550px');
  //second select
  vehicleSelect = functions.createSelect('vehicle', '200px', '850px');
  //third select    
  modelSelect = functions.createSelect('model', '200px', '1150px');

  //set the elements in document
  app.appendChild(typeSelect);
  app.appendChild(vehicleSelect);
  app.appendChild(modelSelect);
  app.appendChild(preco);

  //fills the first select 
  functions.getInfoFromFipeTable(url + '/marcas.json', function getResponse(array) {
    functions.populateSelect(array, typeSelect);
  });
}
document.addEventListener('DOMContentLoaded', function () {
  loadElements();
});
