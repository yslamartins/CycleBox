import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer';
import About from './pages/About';
import ProductsList from './pages/ProductsList';

import Header from './components/Header';
import SignInSignUp from './pages/SignInSignUp';
import SingleProduct from './pages/SingleProduct';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null; 
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/produtos" element={<ProductsList />} />
        <Route path="/login" element={<SignInSignUp />} />
        <Route path="/produto/:id" element={<SingleProduct />} />
        <Route path="/produtos/categoria/:categoria" element={<ProductsList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;