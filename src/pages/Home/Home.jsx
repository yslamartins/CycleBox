import React from 'react';

import Header from '../../components/Header';
import CategorySection from './home-components/CategorySection';
import ProductsHome from './home-components/ProductsHome';

export default function Home() {
  return (
    <div className='bg-[#D9D9D9]'>
      <Header/>
      <CategorySection/>
      <ProductsHome />
    </div>
  )
  
  
}