import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer'
import About from './pages/About'
import Header from './components/Header';
import SignInSignUp from './pages/SignInSignUp';
import SingleProduct from './pages/SingleProduct';
function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/login" element={<SignInSignUp />} />
          <Route path="/produto/:id" element={<SingleProduct />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
