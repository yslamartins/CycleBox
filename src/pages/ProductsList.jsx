import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import './ProductList.css';

import banner from "../assets/header-produtos.jpg";

export default function ProductsList() {
  const { categoria } = useParams(); // Captura o parâmetro de URL (categoria)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16); // Quantidade de itens por página
  const [selectedCategories, setSelectedCategories] = useState([]); // Categorias selecionadas
  const [filterOption, setFilterOption] = useState(""); // Filtro de condição (Novo / Usado) ou Ordenação
  const [sortBy, setSortBy] = useState(""); // Ordenação

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products/produtos");
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        throw new Error("Erro ao carregar produtos");
      }
    } catch (error) {
      console.error("Erro ao carregar os dados", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...products];

    // Filtra por categoria selecionada
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((category) => category.trim() === decodeURIComponent(product.category.trim()))
      );
    }

    // Filtra por condição (novo ou usado)
    if (filterOption === "New" || filterOption === "Used") {
      filtered = filtered.filter((product) => product.condition === filterOption);
    }

    // Ordenação por preço
    if (sortBy === "price_asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetar para a primeira página após filtrar/ordenar
  }, [selectedCategories, filterOption, sortBy, products]);

  // Aplica o filtro inicial baseado no parâmetro de URL
  useEffect(() => {
    if (categoria) {
      // Converte a categoria da URL para o formato usado nos produtos
      const formattedCategory = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      setSelectedCategories([formattedCategory]); // Atualiza a categoria selecionada
    }
  }, [categoria]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) 
        : [...prev, category] 
    );
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    if (value === "price_asc" || value === "price_desc") {
      setSortBy(value);
    } else {
      setSortBy(""); 
    }
  };

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
      <div className="container mx-auto p-4 pt-[90px]">
        <div className="relative mb-8">
          <img
            src={banner}
            alt="Banner de Produtos"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white text-center">
            Produtos
          </h1>
        </div>

        <div className="hidden sm:flex flex-row justify-end items-center mb-6 gap-4">
          <div className="flex gap-4">
            <select
              value={filterOption}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="" disabled>
                Ordenar por
              </option>
              <option value="price_asc">Menor Preço</option>
              <option value="price_desc">Maior Preço</option>
              <option value="New">Novo</option>
              <option value="Used">Usado</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="">
            <div className="block sm:hidden mb-4 flex justify-center gap-4">
              <select
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Filtrar por Categoria</option>
                {["Moda Masculina", "Moda Feminina", "Acessórios", "Calçados"].map(
                  (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>

              <select
                value={filterOption}
                onChange={handleFilterChange}
                className="p-2 border rounded"
              >
                <option value="" disabled>
                  Ordenar por
                </option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="New">Novo</option>
                <option value="Used">Usado</option>
              </select>
            </div>

            <div className="hidden sm:block bg-[var(--neutral-alt)] p-4 rounded-lg">
              <h2 className="font-bold mb-2">Filtrar por:</h2>
              {["Moda Masculina", "Moda Feminina", "Acessórios", "Calçados"].map(
                (category) => (
                  <label key={category} className="block mb-2">
                    <input
                      type="checkbox"
                      value={category}
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)} 
                      className="mr-2"
                    />
                    {category}
                  </label>
                )
              )}
            </div>
          </div>


          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {currentProducts.map((product, index) => (
                <Link
                  to={`/produto/${product.id}`}
                  key={index}
                  className="w-full px-2"
                >
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    description={product.category}
                    price={product.price}
                    size="small"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="py-8 flex justify-center space-x-2">
          {Array.from(
            { length: Math.ceil(filteredProducts.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                    ? "bg-[var(--primary-color)] text-white cursor-pointer"
                    : "bg-gray-200 text-gray-700 hover:bg-[#FBE9E7] cursor-pointer"
                  }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
        <div className="mt-4 py-8 grid grid-cols-1 bg-[var(--neutral-alt)] md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <h2 className="text-md font-semibold">Alta Qualidade</h2>
            <p className="text-gray-600 text-sm">Curadoria de excelência</p>
          </div>
          <div className="text-center">
            <h2 className="text-md font-semibold">Proteção de garantia</h2>
            <p className="text-gray-600 text-sm">Mais de 2 anos</p>
          </div>
          <div className="text-center">
            <h2 className="text-md font-semibold">Frete grátis</h2>
            <p className="text-gray-600 text-sm">Pedidos acima de R$250</p>
          </div>
          <div className="text-center">
            <h2 className="text-md font-semibold">Suporte 24h</h2>
            <p className="text-gray-600 text-sm">Suporte dedicado</p>
          </div>
        </div>
      </div>
    </>
  );
}
