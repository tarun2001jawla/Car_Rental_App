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
import ContactUsPage from './Pages/ContactUs/ContactUs';
import Erro404NotFoundPage from './components/404Page/404';
import ConfirmationPage from './components/ReservationConfirmForm/Confirmation';
import AdminLoginForm from './components/admin page/adminLogin';
import CarAddForm from './components/admin page/carAddForm';
import OrderHistory from './components/admin page/orderHistory';
import { UserProvider } from './components/contexts/userContext';
function App() {
  return (
   
    <BrowserRouter>
      <ChakraProvider>
      <UserProvider>
        <Navbar />
     
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/rentals' element={<RentalPage/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/reserve' element={<AboutUs/>} />
          <Route path='/confirm-booking' element={<ConfirmationPage/>} />
          <Route path='/query' element={<ContactUsPage/>} />
          <Route path='/admin/login' element={<AdminLoginForm/>} />
          <Route path='/admin/add' element={<CarAddForm/>} />
          <Route path='/admin/orders' element={<OrderHistory/>} />
          <Route path='*' element={<Erro404NotFoundPage/>} />
        </Routes>
      
        <Footer/>
        <ToastContainer />
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
   
  );
}

export default App;