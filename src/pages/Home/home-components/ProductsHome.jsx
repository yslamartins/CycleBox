import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import {Autoplay, Scrollbar } from "swiper/modules";

import ProductCard from "../../../components/ProductCard";

import './Home.css'

import { FaSpinner } from "react-icons/fa";

import { fetchProdutos } from "../../../api/instance";



const ProductsHome = () => {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null);

  // Função para buscar os produtos
  useEffect(() => {
    const getProdutos = async () => {
      try {
        const data = await fetchProdutos(); // Chama a função que faz a requisição
        setProdutos(data); // Atualiza o estado com os dados da API
        setLoading(false); // Define o carregamento como falso
      } catch (err) {
        setError(err.message); // Armazena o erro no estado
        setLoading(false); // Define o carregamento como falso
      }
    };

    getProdutos();

  }, []);

  // Limita a exibição a 4 produtos na versão desktop
  const produtosExibidos = produtos.slice(0, 4);

    if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <FaSpinner className="animate-spin text-[#E94B35]" size={40} /> {/* Spinner de carregamento */}
      </div>
    );
  }
  
  if (error) {
    return <p className="text-center text-red-500">Erro ao carregar produtos: {error}</p>;
  }

  return (
    <>
      <h1 className="text-center font-bold text-2xl pt-8 mb-4 text-[#E94B35]">
        Nossos produtos
      </h1>

      {/* Cards para telas maiores (md e acima) */}
      <div className="hidden md:flex flex-wrap justify-center rounded-lg gap-4 bg-white py-6 mx-[200px]">
        {produtosExibidos.map((produto, index) => (
            <div key={index} className="flex flex-col items-center bg-white overflow-hidden w-[200px] cursor-pointer">
              {/* Div da foto */}
             <ProductCard
               image={produto.image}
               name={produto.name}
               description={produto.description}
               price={produto.price}
               size="large"
             />
            </div>
          
        ))}
      </div>

      {/* Carrossel para telas menores (mobile) */}
      <div className="md:hidden">
        <Swiper
          modules={[Scrollbar, Autoplay]} // Adicione o Autoplay aqui
          slidesPerView={2} // Exibe 2 cards por vez
          spaceBetween={16} // Espaço entre os cards
          scrollbar={{ draggable: true }} // Adiciona paginação
          autoplay={{ delay: 2500, disableOnInteraction: false }} // Configuração do Autoplay
          loop={true} // Ativa o loop infinito
          className="mySwiper"
        >
          {produtos.map((produto, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center bg-white overflow-hidden">
                 <ProductCard
                   image={produto.image}
                   name={produto.name}
                   description={produto.description}
                   price={produto.price}
                   size="small"
                 />
                </div>
              </SwiperSlide>
            
          ))}
        </Swiper>
      </div>

      {/* Botão "Ver mais" (exibido apenas se houver mais de 4 produtos) */}
      {produtos.length > 4 && (
        <div className="hidden md:flex justify-center mt-6 pb-10">
          <button
            onClick={() => {
              // Redirecionar para outra página
              window.location.href = "/"; // Altere o caminho conforme necessário
            }}
            className="text-[#E94B35] border border-[#E94B35] hover:scale-105 transition-transform bg-white text-sm px-10 py-2 cursor-pointer"
          >
            Ver mais
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsHome;