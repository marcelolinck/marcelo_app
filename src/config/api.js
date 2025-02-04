import axios from "axios";

//Substituir o IP 192.168.0.14 pelo IP da maquina que está o aplicativo. Para encontrar o IP: ipconfig para windows ou ifconfig para Linux
const api = axios.create({
    baseURL: 'http://192.168.0.15:8000/api/'
});

export default api;