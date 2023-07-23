import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import SeeAllCities from './Pages/SeeAllCities/SeeAllCities';
import CityDetails from './Pages/CityDetails/CityDetails';
import HomeDetails from './Pages/HomeDetails/HomeDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/see-all-cities' element={<SeeAllCities />} />
        <Route path='/city-details/:cityId' element={<CityDetails />} />
        <Route path='/home-details/:homeId' element={<HomeDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
