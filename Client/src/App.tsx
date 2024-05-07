import React from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LogIn/LogIn';
import Navbar from './components/NavBar/NavBar';
import HomePage from './components/Home/Home';
import Footer from './components/Footer/Footer';
import RentalPage from './Pages/Rentals/Rentals';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Navbar />
     
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/rentals' element={<RentalPage/>} />
        </Routes>
        <ToastContainer />
       
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;