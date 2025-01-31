import { useState, useEffect, useRef } from 'react';
import { IoCartOutline, IoMenu, IoPersonOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import Logo from '../../public/CycleBox_LOGO_1.png';
import { CiSearch } from 'react-icons/ci';
import classNames from 'classnames';
import '../styles/variables.css';

export default function Header() {
    const [mostrarPesquisa, setMostrarPesquisa] = useState(false);
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMostrarMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const scrollToContato = () => {
        const contatoSection = document.getElementById("contato");
        if (contatoSection) {
            contatoSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header className="bg-[var(--neutral-light)] h-[70px] fixed w-full z-10 flex items-center px-4 shadow-[var(--box-shadow)]">
                <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
                    {/* Menu e Logo */}
                    <div className="flex items-center gap-3">
                        <IoMenu
                            className="text-[24px] md:hidden cursor-pointer"
                            onClick={() => setMostrarMenu(!mostrarMenu)}
                        />
                        <NavLink to="/">
                            <img src={Logo} alt="Logo" className="w-20 lg:w-24 object-contain cursor-pointer" />
                        </NavLink>
                    </div>

                    {/* Links de Navegação - Desktop */}
                    <nav className="hidden md:flex md:justify-center gap-8">
                        <NavLink
                            to="/produtos"
                            className={({ isActive }) =>
                                classNames('text-sm md:text-base font-medium', {
                                    'text-[var(--primary-color)] underline': isActive,
                                    'text-neutral-dark hover:text-[var(--primary-color)]': !isActive,
                                })
                            }
                        >
                            Produtos
                        </NavLink>
                        <NavLink
                            to="/sobre"
                            className={({ isActive }) =>
                                classNames('text-sm md:text-base font-medium', {
                                    'text-[var(--primary-color)] underline': isActive,
                                    'text-neutral-dark hover:text-[var(--primary-color)]': !isActive,
                                })
                            }
                        >
                            Sobre
                        </NavLink>
                        <button
                            onClick={scrollToContato}
                            className="text-sm md:text-base font-medium text-neutral-dark hover:text-[var(--primary-color)]"
                        >
                            Contato
                        </button>
                    </nav>

                    {/* Ícones de Busca, Carrinho e Perfil (Pessoa) */}
                    <div className="flex items-center gap-3">
                        {!mostrarPesquisa && (
                            <button className="md:hidden" onClick={() => setMostrarPesquisa(true)}>
                                <CiSearch className="text-[24px]" />
                            </button>
                        )}

                        <div className="flex gap-2 hidden md:block">
                            <label htmlFor="search" className="flex">
                                <input
                                    type="text"
                                    id="search"
                                    className="border-2 border-gray-300 p-2 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Buscar..."
                                />
                                <CiSearch className="text-[24px] md:text-[28px] self-center" />
                            </label>
                        </div>

                        {/* Carrinho */}
                        <button className="relative">
                            <div className="absolute top-[-4px] right-[-4px] flex items-center justify-center bg-[var(--primary-color)] text-white rounded-full w-4 h-4 text-xs font-bold">
                            </div>
                            <IoCartOutline className="text-[24px] md:text-[28px] text-[var(--primary-color)] cursor-pointer" />
                        </button>

                        {/* Ícone de Perfil (Pessoa) - Desktop */}
                        <NavLink to="/login">
                            <button className="hidden md:block cursor-pointer">
                                <IoPersonOutline className="text-[24px] md:text-[28px] text-[var(--primary-color)]" />
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* Barra de Pesquisa Expandida - Mobile */}
                {mostrarPesquisa && (
                    <div className="flex md:hidden bg-var[{neutral-light}] border border-gray-300 rounded-md px-4 py-2 w-full mt-2">
                        <CiSearch className="text-gray-500 text-[20px] mr-2" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="w-full bg-transparent outline-none text-sm"
                        />
                        <button onClick={() => setMostrarPesquisa(false)} className="ml-2 text-gray-500">
                            ✖
                        </button>
                    </div>
                )}
            </header>

            {/* Menu Lateral - Mobile */}
            {mostrarMenu && (
                <div className="bg-black/50 w-screen h-screen fixed top-0 z-10 md:hidden">
                    <div
                        ref={menuRef}
                        className="w-[80%] bg-[var(--neutral-light)] h-full px-5 py-6 flex flex-col justify-between"
                    >
                        <nav className="flex flex-col gap-4 z-10">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    classNames('block py-2 transition-colors duration-300 text-sm md:text-base', {
                                        'text-[var(--primary-color)] font-bold underline': isActive,
                                        'text-neutral-dark hover:text-[var(--primary-color)]': !isActive,
                                    })
                                }
                                onClick={() => setMostrarMenu(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/produtos"
                                className={({ isActive }) =>
                                    classNames('block py-2 transition-colors duration-300 text-sm md:text-base', {
                                        'text-[var(--primary-color)] font-bold underline': isActive,
                                        'text-neutral-dark hover:text-[var(--primary-color)]': !isActive,
                                    })
                                }
                                onClick={() => setMostrarMenu(false)}
                            >
                                Produtos
                            </NavLink>
                            <NavLink
                                to="/sobre"
                                className={({ isActive }) =>
                                    classNames('block py-2 transition-colors duration-300 text-sm md:text-base', {
                                        'text-[var(--primary-color)] font-bold underline': isActive,
                                        'text-neutral-dark hover:text-[var(--primary-color)]': !isActive,
                                    })
                                }
                                onClick={() => setMostrarMenu(false)}
                            >
                                Sobre
                            </NavLink>
                            <button
                                onClick={() => {
                                    scrollToContato();
                                    setMostrarMenu(false);
                                }}
                                className="text-sm md:text-base font-medium text-neutral-dark hover:text-[var(--primary-color)] cursor-pointer"
                            >
                                Contato
                            </button>
                        </nav>
                        <div className="flex justify-center">
                            <NavLink to="/login">
                                <Button text="Entrar" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}