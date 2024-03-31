import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'
import { useRecoilState, useRecoilValue } from 'recoil';
import { user } from '../Count';
import { Vortex } from 'react-loader-spinner'
import axios from 'axios';

const Login = () => {
  const Navi = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);
  const [User,setUser] = useRecoilState(user);
  
  //const [loader, setloader] = useState(true);
  console.log(User);
// const user = useRecoilValue(userinfo)
  useEffect(() => {
    async function profile(){
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile`,{},{headers:{token:localStorage.getItem('token')}})
    if(res.data.a==1){
          setredirect(true);
          setUser(res.data);
       }
    }
    profile();
 }, [])
 
  
  async function register(e){
     e.preventDefault();
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,{
        email,
        password
     })
     if(res.data.a==1){
       alert("An otp is sent to your email for verification, if not yet verified !")
       localStorage.setItem('token',res.data.token);
       setredirect(true);
       setUser(res.data.user);
     //  Navi('/landing');
     }

     else{
       alert(res.data.msg);
     }
     
  }


  /*if(loader){
      return <div className='flex justify-center items-center h-[100vh]'>
           <Vortex
      visible={true}
      height="100"
      width="100"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
      </div>
  }*/
   if(redirect){
     return <Navigate to='/landing' />
   }

   
  return (
    <>
       <div className='flex w-[100vw] h-[100vh]'>
         <div className='bg-[#bbe4e9] w-[55%] flex flex-col justify-center items-center text-3xl font-bold tracking-tighter sm:text-4xl text-center text-[#5c5470]'>
            <p>
            "Practice...<br/>
             Makes You Perfect<br/>
            </p>
             <div className='text-[#233142]'>
             <Typewriter
            words={['so do it']}
            loop={true}
            cursor
            cursorStyle='|'
            typeSpeed={120}
            deleteSpeed={100}
          />
          <span className='text-[#5c5470]'>"</span> 
          </div>
          
         </div>

           <div className='w-[45%] flex justify-center items-center'>
             <div className="rounded-lg border bg-card text-card-foreground shadow-lg mx-auto max-w-sm ">
              <div className="flex flex-col p-6 space-y-1">
                <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
                  <p className="text-sm text-muted-foreground">Enter your Email below to login to your account</p>
            </div>
  <div className="p-6">
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Marksmith@gmail.com"
          required=""
          type="text"
          value={email}
          onChange={(e)=>{setemail(e.target.value)}}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </div>
  
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required=""
          type="password"
          value={password}
          placeholder='at least 6 character'
          onChange={(e)=>{setpassword(e.target.value)}}
        />
      </div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[100%] bg-[black] text-[white]"
        type="submit"
        onClick={register}
      >
        Login
      </button>
    </div>
    <div className="mt-4 text-center text-sm">
      Don't have an account ? 
      <Link className="underline" to="/">
        Signup
      </Link>
    </div>
  </div>
</div>

         </div>
       </div>
    </>
  )
}

export default Login