// components/ProductCard.js
import React from 'react';

const ProductCard = ({ image, name, description, price, size }) => {
  // Define a classe do card dependendo do tamanho
  const cardClass = size === 'small' ? 'w-[180px] h-[350px]' : 'w-[200px] h-[350px] gap-4';

  return (
    <div className={`flex flex-col items-center hover:scale-105 transition-transform bg-white overflow-hidden ${cardClass} cursor-pointer`}>
      {/* Div da foto */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={image} // Usando a URL da imagem do produto
          alt={name} // Usando o nome do produto para alt
          className="w-full h-full object-cover "
        />
      </div>

      {/* Div das informações */}
      <div className="mt-4 text-center bg-white p-4 rounded-lg w-full">
        <h2 className="font-bold text-sm">{name}</h2>
        {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
        <p className="text-sm font-semibold text-[#E94B35] mt-2">
          R$ {price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
