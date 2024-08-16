import 'regenerator-runtime/runtime';
import axios from "axios";
const url = "http://localhost:3000/";

$(document).ready(function() {


    loadselect();
    loadTable();

});


function loadselect() {
    axios.get(url + "categoria", {
    }).then(function (response) { 
        $.each(response.data, function(key,item) {
            $("#selecionacategoria").append(
                $("<option></option>")
                .attr("value",item.id)
                .text(item.nome)
            );
        });
        
    }).catch(function (error) {
        alert("error");
    });
}

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
    axios.get(url + "produtos", { 
    }).then(function (response) {
        var table = new DataTable("#tabela_produto",{
            data: response.data,
            columns: [
            
                {data: "nome"},
                {data: "validade"},
                {data: "fabricante"},
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
    await axios.put(url + 'produtos' , {
        id:$("#id").val(),
        nome: $("#nome").val(),
            fabricante: $("#fabricante").val(),
            validade: $("#validade").val(),
            categoria: $("#selecionacategoria option:selected").val(),
    }).then(function (response) {
        alert("Registro Atualizado com Sucesso");
        refreshtable();
    }).catch(function (error) {
        console.log(error);
    });
}

async function loadUser(id){
    await axios.get(url + 'produtos2/' + id, {       
    }).then(function (response) {
        $("#id").val( response.data.id)
        $("#nome").val(  response.data.nome)
        $("#fabricante").val(  response.data.fabricante)
        $("#validade").val(  response.data.validade)


    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id) {
    await axios.delete(url + 'produtos/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        alert("Este produto esta em alguma venda");
        console.log(error);
    });
}

function clear() {
    $("#id").val(""),
    $("#nome").val(""),
    $("#fabricante").val( ""),
    $("#validade").val(  ""),
    refreshtable()
}

async function refreshtable() {
    window.location.reload(true);
}

async function insert() {
    await axios.post(url + 'produtos', {
        nome: $("#nome").val(),
        fabricante: $("#fabricante").val(),
        validade: $("#validade").val(),
        categoria: $("#selecionacategoria option:selected").val(),


    }).then(function (response) {
        alert("Registro Incluído com Sucesso");
    }).catch(function (error) {
        console.log(error);
    });
}