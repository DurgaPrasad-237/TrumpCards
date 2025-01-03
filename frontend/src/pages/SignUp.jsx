import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';


const SignUp = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatchClass, setPasswordMatchClass] = useState('');

  const [formData,setFormData] = useState({
    userName:"",
    email:"",
    password:"",
    confirmpassword:""
  })

  // const { signup, isSigningUp } = userAuthStore();
  let x = false;
  

  const validateForm = () => {
    console.log("Submitting data", formData);
    if (!formData.userName.trim()) return toast.error("user name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    if(formData.password !== formData.confirmpassword) return toast.error("Confirm password not same as password");

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
    // if(validateForm()){
    //   console.log("success",validateForm());
    // }
    // if (success === true) signup(formData);
  };


  const confirmpassword = (e) =>{
    if(formData.password !== e.target.value){
      setPasswordMatchClass('text-red-600');
    }
    else{
      setPasswordMatchClass('text-green-600');
    }
  }



  return (
    <div className="w-screen h-[91vh] flex items-center justify-center">
      <div className="w-[60vw] h-[60vh] flex items-center justify-center customstyle">

        <div className="w-[50%] h-[100%] flex flex-col items-center justify-center border p-6">
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
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              >
               {x ? (
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
        <div className="w-[50%] h-[100%]">

        </div>
      </div>

  
    </div>
  )
}

export default SignUp
