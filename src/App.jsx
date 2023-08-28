import './App.css'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import YarnPage from './pages/YarnPage';
import YarnProvider, { YarnContext } from './contexts/YarnContext';
import NavBar from './components/NavBar';
import { useContext, useEffect, useState } from 'react';
import Footer from './components/Footer';
import ToTopButton from './components/ToTopButton';
import CompaniesPage from './pages/CompaniesPage';

function App() {

  return (
    <YarnProvider>
      <NavBar />
      <ToTopButton/>
      <div className="align-middle pt-20">
      <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="yarn/:yarnId" element={<YarnPage/>} />
          <Route path="yarn-company/:companyId" element={<CompaniesPage/>}/>
      </Routes>
      </div>
      <Footer/>
    </YarnProvider>
  )
}

export default App
