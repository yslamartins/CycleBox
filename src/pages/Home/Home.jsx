import React from 'react';
import '../../styles/variables.css';

import Header from '../../components/Header';
import CategorySection from './home-components/CategorySection';
import ProductsHome from './home-components/ProductsHome';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--neutral-gray)' }}>
      <Header/>
      <CategorySection/>
      <ProductsHome />
    </div>
  )
   
}