import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Autoplay, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";


import ProductCard from "../../../components/ProductCard";

import './Home.css'

import { FaSpinner } from "react-icons/fa";


const ProductsHome = () => {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);
  
  const carregarProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products/produtos");
      if (response.status === 200) {
        setProdutos(response.data);
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
      <h1 className="text-center font-bold text-2xl pt-[40px] mb-4 text-[#E94B35]">
        Nossos produtos
      </h1>

      {/* Cards para telas maiores (md e acima) */}
      <div className="hidden md:flex flex-wrap justify-center rounded-lg gap-4 bg-white py-6 mx-[200px]">
        {produtosExibidos.map((produto, index) => (
          <div key={index} className="flex flex-col items-center bg-white overflow-hidden w-[200px] cursor-pointer">
            {/* Div da foto */}
            <ProductCard
              id={produto.id}
              image={produto.image}
              name={produto.name}
              description={produto.category}
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
                  id={produto.id}
                  image={produto.image}
                  name={produto.name}
                  description={produto.category}
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
          <Link to='/produtos'>
            <button
              className="text-[#E94B35] border border-[#E94B35] hover:bg-[#F25C43] hover:text-white hover:scale-105 transition-transform bg-white text-sm px-10 py-2 cursor-pointer"
            >
              Ver mais
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductsHome;