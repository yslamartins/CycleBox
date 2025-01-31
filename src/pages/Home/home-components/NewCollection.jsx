import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../components/Button";

export default function NewCollection() {
  return (
    <div className="relative w-full pt-[70px] h-[400px] flex items-center justify-center bg-gray-200 mb-4 overflow-hidden">
      <img
        src="https://spcity.com.br/wp-content/uploads/2016/11/brecho_minha_avo_tinha-1300x700.jpg"
        alt="Banner Nova Coleção"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="relative z-1 text-center p-4">
        <p className="text-lg text-gray-900">Novos drops toda semana</p>
        <h1 className="text-3xl font-bold text-[var(--secondary-color)] mt-2">Nova Coleção</h1>
        <NavLink to="/produtos">
          <Button text={"Explorar"} className="mt-4 px-12 py-4 text-xl" />
        </NavLink>
      </div>
    </div>
  );
}
