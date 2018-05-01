import * as functions from './utils';

export let typeSelect,
    vehicleSelect,
    modelSelect,
    preco = document.createElement('h1');

export const url = ['http://fipeapi.appspot.com/api/1/carros'];

(function () {

    const app = document.getElementById('app');    

    function carregaElementos() {
        app.innerHTML = "<h1 align='center'>FIPE Table</h1>";
        //primeira caixa de Seleção
        typeSelect = functions.createSelect('type', '200px', '550px');
        //select.addEventListener("click", updateSelects);

        //segunda caixa de Seleção
        vehicleSelect = functions.createSelect('vehicle', '200px', '850px');
        //select.addEventListener("click", updateSelects);

        //terceira caixa de Seleção    
        modelSelect = functions.createSelect('model', '200px', '1150px');
        //select.addEventListener("click", SetPrice);

        //coloca os selects criados no document
        console.log(app);
        app.appendChild(typeSelect);
        console.log(typeSelect);
        app.appendChild(vehicleSelect);
        console.log(vehicleSelect);
        app.appendChild(modelSelect);
        console.log(modelSelect);
        app.appendChild(preco);
        console.log(app);

        //preenche primeiro select
        functions.getInfoFromFipeTable(url + '/marcas.json', function getResponse(array) {
            functions.populateSelect(array, typeSelect);
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        carregaElementos();
    });
})();

