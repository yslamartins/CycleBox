import React from 'react';
import '../../styles/variables.css';

import CategorySection from './home-components/CategorySection';
import Header from '../../components/Header';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--neutral-gray)' }}>
      <Header/>
      <CategorySection/>
    </div>
  )
   
}