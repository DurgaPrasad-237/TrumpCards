import React from 'react'
import Navbar from './components/Navbar'
import { useThemeStore } from './store/useThemeStore'
import SignUp from './pages/SignUp';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const {theme} = useThemeStore();

  

  return (
    <div data-theme={theme}>
      <Navbar/>
      <SignUp/>
      <Toaster/>
    </div>
  )
}

export default App
