import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TitleBar from './components/TitleBar';
import Footer from './components/Footer/Footer';
import PreLaunch from './pages/PreLaunch/PreLaunch';
import ContactForm from './pages/ContactForm/ContactForm';
import HomePage from './pages/HomePage/HomePage';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import Checkout from './pages/Checkout/Checkout';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import Hero from './components/HeroSection/Hero';
import CartModal from './components/CartModal/CartModal';


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);


  

  return (
    <div className="">
      <TitleBar />
      <Navbar />
      
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pre-launch" element={<PreLaunch />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/singleproduct/:id" element={<SingleProduct/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/summary" element={<SummaryPage/>} />
        </Routes>
      
        <div className="App">
          
          <CartModal isOpen={isCartOpen} closeModal={() => setIsCartOpen(false)} />
        </div>
      <Footer />
    </div>
  );
}

export default App;
