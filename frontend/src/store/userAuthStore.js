import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";


export const userAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingUp:false,
    isCheckingAuth:true,
    isUpdatingProfile:false,
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log("error in checkAuth:",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data) =>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            if (res.data) {
                set({ authUser: res.data });
                toast.success("Account created successfully");
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }        
    }

}))