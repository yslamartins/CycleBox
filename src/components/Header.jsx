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
    const menuRef = useRef(null);  // Referência para o menu

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMostrarMenu(false);  // Fecha o menu se o clique for fora
            }
        };

        // Adiciona o listener de clique
        document.addEventListener('mousedown', handleClickOutside);

        // Limpeza do evento quando o componente for desmontado
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className="bg-[var(--neutral-light)] max-h-[400px] fixed w-full">
                <div className="flex justify-evenly items-center">
                    {/* Logo e Menu (Mobile) */}
                    <div className="flex items-center gap-3">
                        <IoMenu
                            className="text-[28px] md:hidden"
                            onClick={() => setMostrarMenu(!mostrarMenu)}
                        />
                        <NavLink to="/">
                            <img src={Logo} alt="Logo" className="w-28 lg:w-30 object-contain cursor-pointer" />
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
                        <NavLink
                            to="/contato"
                            className={({ isActive }) =>
                                classNames('text-sm md:text-base font-medium', {
                                    'text-[var(--primary-color)] underline': isActive,
                                    'text-neutral-dark hover:text-[var(--primary-color)]': !isActive,
                                })
                            }
                        >
                            Contato
                        </NavLink>
                    </nav>

                    {/* Ícones de Busca, Carrinho e Perfil (Pessoa) */}
                    <div className="flex items-center gap-3">
                        {/* Barra de Pesquisa - Mobile */}
                        <button
                            className="md:hidden"
                            onClick={() => setMostrarPesquisa(!mostrarPesquisa)}
                        >
                            <CiSearch className="text-[24px] md:text-[28px]" />
                        </button>

                        <div className="flex gap-2 hidden md:block">
                            <label htmlFor="search" className="flex">
                                <CiSearch className="text-[24px] md:text-[28px] self-center" />
                                <input
                                    type="text"
                                    id="search"
                                    className="border-2 border-gray-300 p-2 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Buscar..."
                                />
                            </label>
                        </div>

                        {/* Carrinho */}
                        <button className="relative">
                            <div className="absolute top-[-4px] right-[-4px] flex items-center justify-center bg-[var(--primary-color)] text-white rounded-full w-4 h-4 text-xs font-bold">
                            </div>
                            <IoCartOutline className="text-[24px] md:text-[28px] text-[var(--primary-color)] cursor-pointer" />
                        </button>

                        {/* Ícone de Perfil (Pessoa) - Desktop */}
                        <NavLink to="/entrar">
                            <button className="hidden md:block cursor-pointer">
                                <IoPersonOutline className="text-[24px] md:text-[28px] text-[var(--primary-color)]" />
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* Barra de Pesquisa Expandida - Mobile */}
                {mostrarPesquisa && (
                    <div className="flex bg-[var(--neutral-gray)] w-full justify-between rounded-md px-4 py-2 md:hidden">
                        <input
                            type="text"
                            placeholder="Pesquisar produtos..."
                            className="bg-[var(--neutral-gray)] w-full outline-none"
                        />
                        <CiSearch className="text-[20px]" />
                    </div>
                )}
            </header>

            {/* Menu Lateral - Mobile */}
            {mostrarMenu && (
                <div className="bg-black/50 w-screen h-screen fixed top-0 z-10 md:hidden">
                    <div
                        ref={menuRef} // Referência ao menu
                        className="w-[80%] bg-[var(--neutral-light)] h-full px-5 py-6 flex flex-col justify-between"
                    >
                        <nav className="flex flex-col gap-4">
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
                            <NavLink
                                to="/contato"
                                className={({ isActive }) =>
                                    classNames('block py-2 transition-colors duration-300 text-sm md:text-base', {
                                        'text-[var(--primary-color)] font-bold underline': isActive,
                                        'text-neutral-dark hover:text-[var(--primary-color)]': !isActive,
                                    })
                                }
                                onClick={() => setMostrarMenu(false)}
                            >
                                Contato
                            </NavLink>
                        </nav>
                        <div className="flex justify-center">
                            <NavLink to="/entrar">
                                <Button text="Entrar" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
