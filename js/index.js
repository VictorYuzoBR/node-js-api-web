

import 'regenerator-runtime/runtime';
import axios from "axios";
const url = "http://localhost:3000/";

$(document).ready(function() {


    loadselect();
    loadTable();

});


function loadselect() {
    axios.get(url + "perfil", {
    }).then(function (response) { 
        $.each(response.data, function(key,item) {
            $("#selecionaperfil").append(
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
    axios.get(url + "users", { 
    }).then(function (response) {
        var table = new DataTable("#tabela_user",{
            data: response.data,
            columns: [
            
                {data: "id"} ,
                {data: "name"},
                {data: "email"},
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
    await axios.put(url + 'users' , {
        id:$("#id").val(),
        name: $("#nome").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        admin: $("#admin").prop("checked"),
        perfil: $("#selecionaperfil option:selected").val(),
    }).then(function (response) {
        alert("Registro Atualizado com Sucesso");
        refreshtable();
    }).catch(function (error) {
        console.log(error);
    });
}

async function loadUser(id){
    await axios.get(url + 'user2/' + id, {       
    }).then(function (response) {
        $("#id").val( response.data.id)
        $("#nome").val(  response.data.name)
        $("#password").val(  response.data.password)
        $("#email").val(  response.data.email)
        $("#admin").prop("checked", response.data.admin)
        


    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id) {
    await axios.delete(url + 'users/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        alert("Este usuario esta em alguma venda");
        console.log(error);
    });
}

function clear() {
    $("#id").val(""),
    $("#nome").val(""),
    $("#email").val( ""),
    $("#password").val(  ""),
    $("#admin").prop("checked", false),
    refreshtable()
}

async function refreshtable() {
    window.location.reload(true);
}

async function insert() {
    await axios.post(url + 'users', {
        name: $("#nome").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        admin: $("#admin").prop("checked"),
        perfil: $("#selecionaperfil option:selected").val(),


    }).then(function (response) {
        alert("Registro Incluído com Sucesso");
    }).catch(function (error) {
        console.log(error);
    });
}

