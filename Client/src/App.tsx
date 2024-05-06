import React from 'react'
import './App.css'
import SignUp from './components/SignUp/signup'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
function App()
{
 

  return (
    <ChakraProvider>
   <div>
   <h1>React App</h1>
   <SignUp/>  
   <ToastContainer />
   </div>
   </ChakraProvider>
  )
}

export default App
