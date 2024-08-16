import 'regenerator-runtime/runtime';
import axios from "axios";
const url = "http://localhost:3000/";

$("#btnlogar").click(async function () {
    try {
        axios.post(url + "login", {
        });
      alert("Login Realizado");
    } catch (errors) {
        
        console.error(errors);
    }
});

