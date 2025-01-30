
import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer'
import About from './pages/About'
import ProductsList from './pages/ProductsList'


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produtos" element={<ProductsList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
