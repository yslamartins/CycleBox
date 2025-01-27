import React from 'react';
import '../../styles/variables.css';

import CategorySection from './home-components/CategorySection';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--neutral-gray)' }}>
      <CategorySection/>
    </div>
  )
   
}