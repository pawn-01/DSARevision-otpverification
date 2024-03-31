import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { user } from '../Count';

const Emailverify = () => {
    const navi = useNavigate();
    const [otp, setOtp] = useState('');
    const [resend, setresend] = useState(false);
    const[User,setUser] = useRecoilState(user);
    const [date, setdate] = useState(new Date().getTime()); 

    useEffect(() => {
        async function backend(){
         if(localStorage.getItem('token')){
            const ver = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify`,{},{headers:{token:localStorage.getItem('token')}});
           if(ver.data.a==1){
               navi('/landing')
             }
            else{
              const t = new Date().getTime();
              if(t>date+60000){
                setdate(new Date().getTime());
                const otpres = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/otpsend`,{},{headers:{token:localStorage.getItem('token')}})
                if(otpres.data.a==1){
                    alert(otpres.data.msg);
                }
            }
            else{
              alert("Please wait for few seconds")
            }
          }
          }
          else{
              navi('/login');
        }
    }
        backend();

    }, [resend])
    
    async function verified(){
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verifyotp`,{otp},{headers:{token:localStorage.getItem('token')}})
          if(res.data.a==1){
            alert(res.data.msg);
            navi('/landing')
          }
          else if(res.data.a==0){
            alert(res.data.msg);
          }
    }


  return (
    <>
    <p className='flex justify-center items-center text-center'>Please wait for 10 second otp is sent to your gmail <br/> After 20sec if you don't get otp refresh the page or click on resend button</p>
    <div className='flex justify-center items-center h-[80vh]'>
      <div class="border text-card-foreground w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col pb-6">
        <div class="p-4">
         <h2 class="text-3xl text-gray-900 dark:text-gray-50">Enter OTP</h2>
         <p class="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">An OTP has been sent to your email</p>
         <div class="w-full md:grid-cols-6">
          <div class="flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-gray-50 md:col-span-2 p-[1rem]">
        OTP
      </div>
      <div class="flex items-center space-x-2 md:col-span-4 justify-center ">
        <div class="py-2 w-fit mx-[auto]">
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span ></span>}
      renderInput={(props) => <input  class="min-w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-gray-800 mr-[1.2rem]" {...props} />}
        /> 
        </div>
      </div>
    </div>
    <button onClick={verified} class="w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-900 dark:text-gray-50 py-2 px-4 rounded-md mt-4">
      Verify OTP
    </button>
  </div>
  <p className='text-[#888] w-full pl-[7.5rem] pb-2'>wait for a minute</p>
  <button onClick={()=>{setresend(!resend)}} class="w-[90%] items-center bg-black text-white hover:bg-red-600 dark:bg-gray-900 dark:text-gray-50 py-2 px-4 rounded-md mx-auto">
      Resend OTP
    </button>
</div>
    </div>
   

    <button onClick={()=>{localStorage.removeItem('token');navi('/')}} class="w-fit flex justify-center items-center items-center bg-black text-white hover:bg-red-600 dark:bg-gray-900 dark:text-gray-50 py-2 px-4 rounded-md mx-auto">
       GO to Signup Page
    </button>
   </>
  )
}

export default Emailverify;