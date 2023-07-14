import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
