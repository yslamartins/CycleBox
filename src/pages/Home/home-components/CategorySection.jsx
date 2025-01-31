import React from "react";
import './Home.css';

import bag from '../../../assets/bag.jpg';
import fem from '../../../assets/fem.jpg';
import masc from '../../../assets/masc.jpg';

export default function CategorySection() {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-1 text-[#E94B35]">Compre por categoria</h1>
      <p className="text-center text-sm mb-4 font-(--font-secondary)">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="flex flex-col justify-center gap-8 md:flex-row md:gap-4">
        
        <div className="flex flex-col items-center overflow-hidden">
          <div className="w-[250px] h-[320px] bg-black rounded-lg hover:scale-105 transition-transform cursor-pointer">
            <img
              src={bag}
              alt="Acessórios"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-sm font-bold mt-4">Acessórios</p>
        </div>

        
        <div className="flex flex-col items-center overflow-hidden">
          <div className="w-[250px] h-[320px] bg-black rounded-lg hover:scale-105 transition-transform cursor-pointer">
            <img
              src={fem}
              alt="Feminino"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-sm font-bold mt-4">Feminino</p>
        </div>

        
        <div className="flex flex-col items-center overflow-hidden">
          <div className="w-[250px] h-[320px] bg-black rounded-lg hover:scale-105 transition-transform cursor-pointer">
            <img
              src={masc}
              alt="Masculino"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-sm font-bold mt-4 mb-4">Masculino</p>
        </div>
      </div>
    </div>
  );
}