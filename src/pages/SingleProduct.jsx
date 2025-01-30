import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProdutos } from '../api/instance';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard'; 
import { FaSpinner } from 'react-icons/fa'; 

export default function SingleProduct() {
    const [prodSelect, setProdSelect] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const produtos = await fetchProdutos();
                const produtoEncontrado = produtos.find((prod) => prod.id === id);
                setProdSelect(produtoEncontrado);
                if (produtoEncontrado) {
                    const relacionados = produtos
                        .filter((prod) => prod.category === produtoEncontrado.category && prod.id !== produtoEncontrado.id)
                        .slice(0, 3); 
                    setRelatedProducts(relacionados);
                }
                setLoading(false); 
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
                setLoading(false); 
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <FaSpinner className="animate-spin text-[#E94B35]" size={40} />
            </div>
        );
    }

    if (!prodSelect) {
        return <div className="text-center text-gray-600 mt-10">Produto não encontrado</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-[var(--neutral-alt)]">
            <div className="text-center mb-8 m-20">
                <h1 className='text-3xl text-[var(--primary-color)] font-bold font-[var(--font-secondary)]'>
                    {prodSelect.category}
                </h1>
                <p className="text-gray-600 mt-2">Descubra a história por trás deste item único.</p>
            </div>

            <div className="container max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 p-6 flex justify-center items-center bg-[var(--neutral-light)]">
                    <img
                        src={prodSelect.image}
                        alt={prodSelect.name}
                        className="w-full max-w-sm rounded-md shadow-md transform hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-[var(--neutral-dark)] mb-3 font-[var(--font-secondary)]">
                        {prodSelect.name}
                    </h1>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Este item faz parte de uma coleção especial que remonta aos anos 80. Cada peça
                        foi cuidadosamente selecionada para trazer um toque de nostalgia ao seu guarda-roupa.
                    </p>

                    <div className="flex items-center gap-2 text-[var(--primary-color)] text-lg font-semibold mb-4">
                        <span>R$ {prodSelect.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm text-gray-600 bg-[var(--neutral-light)] px-3 py-1 rounded-full">
                            {prodSelect.condition}
                        </span>
                        <span className={`text-sm ${prodSelect.enabled ? 'text-green-600' : 'text-red-600'}`}>
                            {prodSelect.enabled ? 'Disponível' : 'Indisponível'}
                        </span>
                    </div>

                    <Button
                        text={prodSelect.enabled ? 'Comprar' : 'Indisponível'}
                        className="w-full bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white py-2 rounded-lg transition-all"
                        disabled={!prodSelect.enabled}
                    />
                </div>
            </div>

            <div className="container max-w-4xl mt-8">
                <h2 className="text-2xl font-bold text-[var(--neutral-dark)] mb-6">Produtos Relacionados</h2>
                <div className="flex flex-col items-center gap-6 justify-between lg:flex-row mb-20">
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="">
                            <ProductCard
                                image={product.image}
                                name={product.name}
                                description={product.category}
                                price={product.price}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
