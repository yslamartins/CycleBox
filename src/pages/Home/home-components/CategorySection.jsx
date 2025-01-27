import React from "react";

import './Home.css'
import bag from '../../../assets/bag.jpg'
import fem from '../../../assets/fem.jpg'
import masc from '../../../assets/masc.jpg'

export default function CategorySection() {

  return (
    <>
    <h1 className="text-center font-bold text-2xl pt-8 mb-1 text-[#E94B35]">Compre por categoria</h1>
    <p className="text-center text-sm mb-4 font-(--font-secondary)">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    
    <div className="flex justify-center gap-3">

      <div className="flex flex-col items-center overflow-hidden">
        <div className="w-[250px] h-[320px] bg-black rounded-lg">
          <img src={bag} className="w-full h-full object-cover zoom-effect" />
        </div>
         <p className="text-center text-sm  mt-4">Acessórios</p>
      </div>

      <div className="flex flex-col items-center  overflow-hidden">
        <div className="w-[250px] h-[320px] bg-black rounded-lg">
        <img src={fem} className="w-full h-full object-cover zoom-effect" />
        </div>
         <p className="text-center text-sm  mt-4">Feminino</p>
      </div>

      <div className="flex flex-col items-center  overflow-hidden">
        <div className="w-[250px] h-[320px] bg-black rounded-lg">
        <img src={masc} className="w-full h-full object-cover zoom-effect"/>
        </div>
         <p className="text-center text-sm  mt-4">Masculino</p>
      </div>
    
    </div>
    </>
  );
}
