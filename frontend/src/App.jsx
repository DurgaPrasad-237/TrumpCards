import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useThemeStore } from './store/useThemeStore'
import SignUp from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import { userAuthStore } from './store/userAuthStore';
import { Loader } from 'lucide-react';

const App = () => {

  const {theme} = useThemeStore();
  // const {authUser,checkAuth,isCheckingAuth} = userAuthStore()

  // useEffect(()=>{
  //   checkAuth();
  // },[checkAuth])

  if(false) return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  

  return (
    <div data-theme={theme}>
      <Navbar/>
      <SignUp/>
      <Toaster/>
    </div>
  )
}

export default App
