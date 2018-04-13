(function() {
    const app = document.getElementById('app');
    const url = ['http://fipeapi.appspot.com/api/1/carros'];

    let typeId;
    let vehicleId;
    let modelId;
    let typeSelect;
    let vehicleSelect;
    let modelSelect;
    let preco = document.createElement('h1');

    function carregaElementos(){
        app.innerHTML="<h1 align='center'>FIPE Table</h1>";

        //primeira caixa de Seleção
        typeSelect = createSelect('type', '200px', '550px');
        //select.addEventListener("click", updateSelects);

        //segunda caixa de Seleção
        vehicleSelect = createSelect('vehicle', '200px', '850px');
        //select.addEventListener("click", updateSelects);

        //terceira caixa de Seleção    
        modelSelect = createSelect('model', '200px', '1150px');
        //select.addEventListener("click", SetPrice);

        //coloca os selects criados no document
        app.appendChild(typeSelect);
        app.appendChild(vehicleSelect);
        app.appendChild(modelSelect); 
        app.appendChild(preco);

        //preenche primeiro select
        getInfoFromFipeTable(url+'/marcas.json',function getResponse(array){
            populateSelect(array, typeSelect);
        });  
    }

    //conforme qual select foi enviado, ele determina o que fazer
    const updateSelects=(select)=>{
        if(select.target.selectedIndex!==-1){
            preco.innerHTML = ""; 
            const id = select.target.parentElement.value;
            if(select.target.parentElement.id==='type'){
                typeId=id;
                clearSelect(vehicleSelect);
                getInfoFromFipeTable(url+'/veiculos/'+typeId+'.json',function getResponse(array){
                    populateSelect(array, vehicleSelect);
                }); 
                clearSelect(modelSelect);
            }else if(select.target.parentElement.id==='vehicle'){
                vehicleId=id;
                clearSelect(modelSelect);
                getInfoFromFipeTable(url+'/veiculo/'+typeId+'/'+vehicleId+'.json',function getResponse(array){
                    populateSelect(array, modelSelect);
                }); 
            }else{
                modelId=id;
                getInfoFromFipeTable(url+'/veiculo/'+typeId+'/'+vehicleId+'/'+modelId+'.json',function getResponse(array){
                    preco.innerHTML = "<br><h1 align='center'>"+(array['preco'])+"</h1>"; 
                });                
            }
        }
    }

    //limpa o select determinado
    const clearSelect=(select)=>{
        while (select.options.length) {
            select.remove(0);
        }
    }

    //os dados retornados pelo get são inseridos no select determinado
    const populateSelect=(array, actualSelect)=>{
        let select = AddAnOptionInSelect(actualSelect);
            array.forEach(element => {
                select(element['name'],element['id']); 
            });  
    }

    //cria o select
    const createSelect = (id, width='100px', left, size=4)=>{
        const select = document.createElement("select");
        select.id = id;
        select.size= size;
        select.style.width = width;
        select.style.position = 'absolute';
        select.style.left =left;
        select.addEventListener("click", updateSelects);
        //select.style.height = height;
        return select;
    }

    //determinando-se o select a ser preenchido, retorna uma função que preenche o select com os options
    const AddAnOptionInSelect=(elemSelect)=>{
        return  function (name, value){
            const elemOption = document.createElement("option");
            elemOption.text=name;
            elemOption.value=value;
            elemSelect.add(elemOption, null);
        }
    }

    //pega as informações da API pelo get retornando-as pelo callback 
    const getInfoFromFipeTable=(urlSend, callback)=>{
        const xhr =  new XMLHttpRequest();
        const url = urlSend;
        xhr.responseType = 'json';
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
                callback(xhr.response);                      
            }
        }
        xhr.open('GET', url);
        xhr.send();
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        carregaElementos();
    });
})();
