import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Phone, User } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { userAuthStore } from '../store/userAuthStore.js';
import RotatingCircle from '../components/Rotation.jsx';
import im from '../assets/im.jpg'



const SignUp = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatchClass, setPasswordMatchClass] = useState('');

  const [formData,setFormData] = useState({
    User_Name:"",
    User_Email:"",
    User_Password:"",
    confirmpassword:"",
    User_Mobile:"",
  })

  const { signup, isSigningUp } = userAuthStore();

  

  const validateForm = () => {
    console.log("Submitting data", formData);
    if (!formData.User_Name.trim()) return toast.error("user name is required");
    if (!formData.User_Email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.User_Email)) return toast.error("Invalid email format");
    if (!formData.User_Password) return toast.error("Password is required");
    if (formData.User_Password.length < 6) return toast.error("Password must be at least 6 characters");
    if (formData.User_Password !== formData.confirmpassword) return toast.error("Confirm password not same as password");

    return true;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signup(formData);
    // if(validateForm()){
    //   console.log("success",validateForm());
    // }
    // if (success === true) signup(formData);
  };


  const confirmpassword = (e) =>{
    if(formData.User_Password !== e.target.value){
      setPasswordMatchClass('text-red-600');
    }
    else{
      setPasswordMatchClass('text-green-600');
    }
  }

  const circle = document.getElementById('circle');
    const images = [
      './images/vk.webp',
      'https://via.placeholder.com/80',
      'https://via.placeholder.com/80',
    ];

    const radius = 120; // Radius of the circle
    const angleStep = 360 / images.length;

  



  return (
    <div className="w-screen h-[91vh] flex items-center justify-center">
      <div className="w-[60vw] h-[70vh] flex items-center justify-center">

        <div className="w-[50%] h-[100%] border-hidden flex flex-col items-center justify-center border p-6 customstyle">
          <h2 className="text-2xl font-bold mb-4">Signup</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* username */}
            <div className="relative">
            
              <label className="block mb-1 text-sm font-medium">Username</label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 text-base-content/40" />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full pl-10 p-2 border rounded"
                    value={formData.User_Name}
                    onChange={(e) => setFormData({ ...formData, User_Name: e.target.value })}
                  />
              </div>
            </div>

             {/* Email */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 text-base-content/40" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 p-2 border rounded"
                  value={formData.User_Email}
                  onChange={(e) => setFormData({ ...formData, User_Email: e.target.value })}
                />

              </div>  
            </div>


             {/* Mobile */}
             <div className="relative">
              <label className="block mb-1 text-sm font-medium">Mobile</label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 text-base-content/40" />
                <input
                  type="number"
                  placeholder="Enter your Mobile Number"
                  className="w-full pl-10 p-2 border rounded"
                  value={formData.User_Mobile}
                  onChange={(e) => setFormData({ ...formData, User_Mobile: e.target.value })}
                />

              </div>  
            </div>





            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 text-base-content/40" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 p-2 border rounded"
                  value={formData.User_Password}
                  onChange={(e) => setFormData({ ...formData, User_Password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-2 top-5 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>


           



             {/* Confirm Password */}
            <div className="relative">
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className={`absolute left-2 top-2.5 text-base-content/40 ${passwordMatchClass}`}/>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 p-2 border rounded"
                  value={formData.confirmpassword}
                  onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
                  onInput={confirmpassword}
                />
                <button
                  type="button"
                  className="absolute right-2 top-5 transform -translate-y-1/2"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>


             {/* Signup Button */}
             <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2"
              disabled={isSigningUp}>
               {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

        </div>
        <div className="w-[50%] h-[100%] flex justify-around items-center relative flex-col">
              <RotatingCircle/>
              <h1 className="mt-96 text-2xl">Trump Cards</h1>
        </div>
      </div>

  
    </div>
  )
}

export default SignUp
