import 'regenerator-runtime/runtime';
import axios from "axios";
const url = "http://localhost:3000/";

$(document).ready(function() {

    loadTable();

});



$("#btnsalvar").click(async function () {
    try {
        if($("#id").val()== ""){
            await insert();
        } else{
            await update();
        }
        clear();
    } catch (errors) {
        console.error(errors);
    }
});


function loadTable() {
    axios.get(url + "categoria", { 
    }).then(function (response) {
        var table = new DataTable("#tabela_categoria",{
            data: response.data,
            columns: [
            
               {data: "id"},
               {data: "nome"},
               {
                data: null,
                defaultContent: '<button id="edit">Editar</button>&nbsp;<button id="excluir">Excluir</button>',
                targets: -1
            },

            ]
        });

                table.on('click', 'button', function (e) {
            var data = table.row( $(this).parents('tr') ).data();
            
          
            if(this.id==='edit'){
                loadUser(data.id);
            } else{
                deleteRecord(data.id);
            }           
        });   
    }).catch(function (error) {
        alert(error);
    });
}


$("#btnlimpar").click(async function () {

    try {
    
           clear();


    } catch (errors) {
        console.error(errors);
    }
}
);

async function update() {
    await axios.put(url + 'categoria' , {
        id:$("#id").val(),
        nome: $("#nome").val(),
    }).then(function (response) {
        alert("Registro Atualizado com Sucesso");
        refreshtable();
    }).catch(function (error) {
        console.log(error);
    });
}

async function loadUser(id){
    await axios.get(url + 'categoria2/' + id, {       
    }).then(function (response) {
        $("#id").val( response.data.id)
        $("#nome").val(  response.data.nome)


    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id) {
    await axios.delete(url + 'categoria/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        alert("esta categoria esta em algum produto");
        console.log(error);
    });
}

function clear() {
    $("#id").val(""),
    $("#nome").val(""),

    refreshtable()
}

async function refreshtable() {
    window.location.reload(true);
}

async function insert() {
    await axios.post(url + 'categoria', {
        nome: $("#nome").val(),


    }).then(function (response) {
        alert("Registro Incluído com Sucesso");
    }).catch(function (error) {
        console.log(error);
    });
}