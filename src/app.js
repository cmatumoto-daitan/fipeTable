import * as functions from './utils';

// can't export let.
// first select
const typeSelect = functions.createSelect('type', '200px', '500px');
// second select
const vehicleSelect = functions.createSelect('vehicle', '200px', '800px');
// third select
const modelSelect = functions.createSelect('model', '200px', '1100px');
const preco = document.createElement('h1');

const url = 'http://fipeapi.appspot.com/api/1/carros';

const app = document.getElementById('app');

function loadElements() {
  // the title of the page
  app.innerHTML = "<h1 align='center'>FIPE Table</h1>";

  // set the elements in document
  app.appendChild(typeSelect);
  app.appendChild(vehicleSelect);
  app.appendChild(modelSelect);
  app.appendChild(preco);

  // fills the first select
  functions.getInfoFromFipeTable(`${url}/marcas.json`)
    .then((array) => { functions.populateSelect(array, typeSelect); });
}

document.addEventListener('DOMContentLoaded', () => { loadElements(); });

export default {
  typeSelect,
  vehicleSelect,
  modelSelect,
  preco,
  url,
};
