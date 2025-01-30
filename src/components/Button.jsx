import React from 'react';
import classNames from 'classnames';

const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'px-6 py-3 rounded-[var(--border-radius)] font-[var(--font-primary)] text-sm md:text-base transition-colors duration-[var(--transition-speed)] cursor-pointer',
        // Cor de fundo
        'bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] active:bg-[var(--primary-color)]',
        // Cor do texto
        'text-white',
        // Bordas
        'border-none focus:ring-2 focus:ring-[var(--primary-color)]',
        // Sombras
        'shadow-[var(--box-shadow)]',
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
