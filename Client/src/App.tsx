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
import AboutUs from './Pages/About Us/AboutUs';
// import Cart from './Pages/cart/cart';
import Erro404NotFoundPage from './components/404Page/404';
//import CarReservationConfirmForm from './components/ReservationConfirmForm/ReservationForm';
import ConfirmationPage from './components/ReservationConfirmForm/Confirmation';
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
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/reserve' element={<AboutUs/>} />
          {/* <Route path='/cart' element={<Cart/>} /> */}
          <Route path='/confirm-booking' element={<ConfirmationPage/>} />
          <Route path='*' element={<Erro404NotFoundPage/>} />
        </Routes>
        <Footer/>
        <ToastContainer />
       
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;