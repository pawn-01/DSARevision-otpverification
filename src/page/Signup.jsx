import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'
import axios from 'axios'
import { user } from '../Count';
import { useRecoilState } from 'recoil';


const Signup = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);
  //const user = 'h';
  
  async function register(e){
     e.preventDefault();
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`,{
        username,
        email,
        password
     })

     console.log(res.data);
  
     if(res.data.a==1){
       setredirect(true);
     }
     else if(res.data.a==0){
       alert(res.data.msg);
     }

     
  }

if(redirect){
     return <Navigate to="/login" />
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
                <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Sign up</h3>
                  <p className="text-sm text-muted-foreground">Enter your details below to create your account </p>
            </div>
  <div className="p-6">
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Username
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Mark smith"
          required=""
          type="text"
          value={username}
          onChange={(e)=>{setusername(e.target.value)}}
        />
      </div>
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
        Sign up
      </button>
    </div>
    <div className="mt-4 text-center text-sm">
      Already have an account ? 
      <Link className="underline" to="/login">
        Login
      </Link>
    </div>
  </div>
</div>

         </div>
       </div>
    </>
  )
}

export default Signup