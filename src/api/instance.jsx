import axios from 'axios';

const instance = axios.create({
    baseURL: "https://679027cc49875e5a1a947d3c.mockapi.io/produtos"
});

export const fetchProdutos = async () => {
    try {
        const response = await instance.get('/');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
};