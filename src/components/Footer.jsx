import React from 'react';  
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa"; 

import '../index.css'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="shadow-[var(--box-shadow) bg-white mt-4">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-8">
              <img src={logo} alt="Logo" className="w-full h-auto" />
            </div>
            <p className="mt-4 ml-2 text-sm text-gray-600 max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
              <h3 className="text-lg font-bold text-sm mb-4">Como Funciona</h3>
              <ul className="space-y-2">
                <li><a href="/sobre" className="text-sm text-gray-600 hover:underline">Sobre</a></li>
                <li><a href="/" className="text-sm text-gray-600 hover:underline">Autenticidade</a></li>
                <li><a href="/" className="text-sm text-gray-600 hover:underline">Como Cuidar</a></li>
                <li><a href="/" className="text-sm text-gray-600 hover:underline">Newsletter</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-sm mb-4">Saiba Mais</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Opções de Pagamento</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Políticas de Devolução</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Termo de Autenticidade</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Políticas de Privacidade</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-sm mb-4">Contato</h3>
              <div className="mb-4">
                <h4 className="text-md font-semibold flex items-center gap-2 text-sm">
                  <FaMapMarkerAlt className="text-gray-600 " />
                  Endereço
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>

                         <div className="mb-4">
                <h4 className="text-md font-semibold flex items-center gap-2 text-sm">
                  <FaPhoneAlt className="text-gray-600" />
                  Telefone
                </h4>
                <p className="text-sm text-gray-600 mt-1">+(84) 546-6789</p>
              </div>

                        <div className="mb-4">
                <h4 className="text-md font-semibold flex items-center gap-2 text-sm">
                  <FaClock className="text-gray-600" />
                  Horário
                </h4>
                <p className="text-sm text-gray-600 mt-1">Segunda-Sexta: 9:00 - 22:00 </p>
                <p className="text-sm text-gray-600 mt-1"> Sábado-Domingo: 9:00 - 21:00 </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">&copy; 2025 CycleBox. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
