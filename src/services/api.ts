import axios from "axios";

const api = axios.create({
    //baseURL: "http://localhost:3000",
    baseURL: "https://aluguel-auto.herokuapp.com",
});

export default api;

//https://aluguel-auto.herokuapp.com/
