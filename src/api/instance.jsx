import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4000/products/produtos"
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