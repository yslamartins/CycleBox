import { fetchProdutos } from "../api/instance";
import React, { useEffect, useState } from "react";

import "./Home/home-components/Home.css";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

export default function ProductsList() {
  const [products, setProducts] = useState([]); // Estado para armazenar todos os produtos
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
  const productsPerPage = 9; // Número de produtos por página

  // useEffect para buscar os produtos quando o componente for montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProdutos();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calcula os produtos da página atual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Se estiver carregando, exibe uma mensagem de carregamento
  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4 text-center">
          <p>Carregando produtos...</p>
        </div>
      </>
    );
  }

  // Se houver um erro, exibe a mensagem de erro
  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4 text-center">
          <p className="text-red-500">Erro: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 mt-30 text-[#E94B35]">Produtos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              size={product.size}
            />
          ))}
        </div>
        <div className="py-8 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-[#E94B35] text-white cursor-pointer"
                  : "bg-gray-200 text-gray-700 cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="py-8 bg-[#FBE9E7] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <h2 className="text-md font-semibold">Alta Qualidade</h2>
            <p className="text-sm text-gray-600">Marcas de primeira linha</p>
          </div>
          <div className="text-center">
            <h2 className="text-md font-semibold">Proteção de garantia</h2>
            <p className="text-sm text-gray-600">Mais de 2 anos</p>
          </div>
          <div className="text-center">
            <h2 className="text-md font-semibold">Frete grátis</h2>
            <p className="text-sm text-gray-600">Pedidos acima de R$250</p>
          </div>
          <div className="text-center">
            <h2 className="text-md font-semibold">Suporte 24/7</h2>
            <p className="text-sm text-gray-600">Suporte dedicado</p>
          </div>
        </div>
      </div>
    </>
  );
}
