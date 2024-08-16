import 'regenerator-runtime/runtime';
import axios from "axios";
const url = "http://localhost:3000/";

$("#btnrecuperar").click(async function () {

    try {
        await axios.post(url + "reset",{

            email: $("#email").val(),

        }).then (function (response){
            alert("Email de recuperação enviado")

        }).catch (function (error) {
            console.log(error);
            alert("erro")
        });
    } catch (errors) {
        console.error(errors);
    }
}
);