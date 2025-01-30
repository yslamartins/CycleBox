import React from "react";
import "./Home/home-components/Home.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#D9D9D9] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mt-18 mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl text-[#E94B35] font-bold text-center mb-8">
            Sobre a Cyclebox
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Bem-vindo à <strong>Cyclebox</strong>, o seu brechó online moderno e
            sustentável! Nossa missão é transformar a maneira como as pessoas
            compram e vendem produtos usados, oferecendo uma plataforma
            intuitiva e segura para todos.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            Na Cyclebox, acreditamos que a reutilização de produtos é essencial
            para um futuro mais sustentável. Por isso, criamos um espaço onde
            você pode encontrar itens de qualidade, com preços acessíveis, e ao
            mesmo tempo contribuir para a redução do desperdício.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            O que fazemos?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            A Cyclebox é uma plataforma online que conecta compradores e
            vendedores de produtos usados. Aqui, você pode:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
            <li className="mb-2">
              Navegar por um vasto inventário de itens de segunda mão, desde
              roupas e acessórios até eletrônicos e móveis.
            </li>
            <li className="mb-2">
              Comprar produtos com facilidade e segurança, garantindo transações
              confiáveis.
            </li>
            <li className="mb-2">
              Vender itens que você não usa mais, dando uma nova vida a eles e
              ajudando o meio ambiente.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Por que escolher a Cyclebox?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Escolhemos a sustentabilidade como nosso pilar principal. Ao comprar
            e vender na Cyclebox, você está:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
            <li className="mb-2">
              Reduzindo o desperdício e o impacto ambiental.
            </li>
            <li className="mb-2">
              Economizando dinheiro com produtos de qualidade a preços
              acessíveis.
            </li>
            <li className="mb-2">
              Contribuindo para uma economia circular, onde os produtos ganham
              uma segunda chance.
            </li>
          </ul>

          <p className="text-lg text-gray-700 mb-6">
            Junte-se a nós nessa jornada para um consumo mais consciente e
            sustentável. Explore a Cyclebox e descubra como é fácil fazer a
            diferença!
          </p>

          <div className="text-center mt-8">
            <Link to="/" className="text-[#E94B35] border border-[#E94B35] hover:scale-105 transition-transform bg-white text-sm sm:text-base px-4 py-2 cursor-pointer w-full sm:w-auto">
    Voltar para página inicial
            </Link>
      </div>
        </div>
      </div>
    </>
  );
}