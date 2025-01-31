import React from 'react';
import CategorySection from './home-components/CategorySection';
import ProductsHome from './home-components/ProductsHome';
import NewCollection from './home-components/NewCollection';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--neutral-gray)' }}>
      <NewCollection />
      <CategorySection/>
      <ProductsHome />
    </div>
  )
   
}