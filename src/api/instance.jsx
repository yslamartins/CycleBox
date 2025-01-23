import axios from 'axios'
 
const instance = axios.create({
    baseURL: "https://679027cc49875e5a1a947d3c.mockapi.io/produtos"
});

export default instance;