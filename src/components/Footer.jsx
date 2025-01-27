import React from 'react';
import '../index.css'

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <img alt="Logo" />
          <p >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <div className="flex space-x-4 mb-6 pt-7 text-[23px] gap-5">
            <a href="#" className="text-white">
            </a>
            <a href="#" className="text-white">
            </a>
            <a href="#" className="text-white">
            </a>
          </div>
        </div>

        <div className="flex gap-28 ">
          <div className="G w-[135px] ">
            <div>
              <h3 className="text-lg font-bold pb-5">Informação</h3>
              <ul className="flex flex-col gap-3 mt-0">
                <li>
                  <a href="#" className="text-white hover:underline">
                    Sobre Drip Store
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Segurança
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Trabalhe conosco
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Meus Pedidos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="G w-[96px]">
            <h3 className="text-lg font-bold pb-5">Categoria</h3>
            <ul className="flex flex-col gap-3 mt-0">
              <li>
                <a href="#" className="text-white hover:underline">
                  Camisetas
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Calças
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Bonés
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Headphones
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Tênis
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="G w-[233px] pt-5 md:pt-0 ">
          <h3 className="text-lg font-bold">Contato</h3>
          <p className="md:pt-4">
            Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE,
            60150-161
          </p>
          <p className="pt-7">(85) 3051-3411</p>
        </div>
      </div>

      <div className="w-full border-t-2 border-t-gray-500 mt-4 text-center pt-8 pb-5 ">
        <p>&copy; 2024 Digital College</p>
      </div>
    </footer>
  );
};

export default Footer;