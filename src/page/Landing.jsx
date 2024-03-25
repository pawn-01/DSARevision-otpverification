import React, { useEffect, useState } from 'react'
import Question from './Question'
import { Navigate, useNavigate } from 'react-router-dom'
import Questionlist from './Questionlist';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { listcount, user } from '../Count';

const usedebounce = (name,delay)=>{
  const [debounce, setdebounce] = useState("hi");
  const [load, setload] = useState(true);
  
    useEffect(() => {
      const time = setTimeout(()=>{
          setdebounce(name);  
          setload(false);
      },delay);
    
      return () => {
         clearTimeout(time);
      }
    }, [name],[delay])

    return {debounce,load};
}


const Landing = () => {
     const Navi = useNavigate();
     const [confirm, setconfirm] = useState(false);
     const [count,setcount] = useRecoilState(listcount)
     const [User,setUser] = useRecoilState(user);
     const [logout, setlogout] = useState(false);
     const [name, setname] = useState("");
     const debouncy = usedebounce(name,500);
     const [tags,settags] = useState("");
     const debouncetags = usedebounce(tags,500);
     const[Theme,setTheme] = useState();

     useEffect(() => {
         if(!localStorage.getItem('theme')){
             setTheme(localStorage.setItem('theme','light'));
         }
         else{
          setTheme(localStorage.getItem('theme'));
         }

         async function Profie(){
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile`,{},{headers:{token:localStorage.getItem('token')}})
          if(res.data.a==0){
               localStorage.removeItem('token');
                Navi("/login");
             }
           else if(res.data.a==1){
              setUser(res.data.user)
           }

           const ver = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify`,{},{headers:{token:localStorage.getItem('token')}});
           if(ver.data.a!=1){
               Navi('/verify');
           }
         }

         Profie()
     }, [])

     function changetheme(){
       if(Theme=="light"){
          localStorage.setItem('theme','dark');
          setTheme("dark")
       }
       else{
        localStorage.setItem('theme','light');
          setTheme("light")
       }
     }
     
  
    function logoutfunc(){
         localStorage.removeItem('token');
         setUser(null);
         Navi('/login');
    }

    function navigate(){
          Navi("/problem");
    }
     
    function Delete(){
        setconfirm(!confirm); 
    }

    async function deletelist(){
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteAll`,{headers:{"token":localStorage.getItem('token')}});
        if(res.data.a==1){
           setcount(0);
           Delete();
        }
        else{
          alert("There is may be a issue");
        }
    }    



  return (
    <>
    <div className={`${Theme} w-full min-h-[100vh] ${Theme=="light" ? 'bg-[white]' : 'bg-neutral-900'}`}>
    <div className={`px-4 py-6  space-y-6 md:px-6 lg:px-8 max-w-[1100px] mx-auto dark:bg-neutral-900 dark:`}>
        <div className="space-y-3 flex justify-between items-center">
         <div className='flex flex-col gap-3'>
         <h1 class="text-3xl font-bold dark:text-white">DSA Revison Problem List</h1>
          <div className="w-full max-w-xl flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 dark:text-white trans">
           <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
            <input
              className="flex h-10 w-full rounded-md border border-input border-l-[0] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search problems"
              type="text"
              value={name}
              onChange={(e)=>{setname(e.target.value)}}
            ></input>
          </div>
         </div>
         <div>

         </div>
          <div className='font-bold text-[1.4rem] dark:text-white'>Total Problem: {count}</div>
          {null && <div className='bg-[#fdffab] rounded-full px-4 py-5 font-bold cursor-pointer font-bold dark:bg-[#4f81c7] dark:text-[white] border border-black' >{Theme}</div>}
          <div><svg onClick={changetheme} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer dark:text-[white]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                 </svg>
              </div>
          <button className='bg-[#00204a] py-[1rem] text-white px-[1.2rem] rounded-lg font-bold py-[1rem] dark:bg-[#ff6464]' onClick={navigate}>Add New Problem</button>
          {!logout && <div className='bg-[#1e549f] rounded-full px-4 py-2 text-white font-bold cursor-pointer dark:bg-[#5be7a9]' onClick={()=>{setlogout(!logout)}}>{User?.username?.charAt(0)?.toUpperCase()}</div>}
          {logout && <div  className="cursor-pointer flex gap-2"><div className='text-[#888] hover:underline font-bold ' onClick={logoutfunc}>logout</div><svg onClick={()=>{setlogout(!logout)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:bg-white dark:rounded-full trans">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</div>
  
          }
        </div>
        <div>
        <div class="max-w-full mx-auto p-6 bg-white rounded-lg shadow-2xl dark:bg-[#240041]">
  <div class="flex items-center justify-between mb-4 ">
    <div class="flex items-center space-x-2">
      <div class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
        DSA
      </div>
    </div>
     <div className='flex justify-center items-center gap-1'>
     <div className='text-[#888] dark:text-white font-bold'>Tags:</div>
    <input className="flex h-10 w-[5.5rem] rounded-md border border-input border-black  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter Tag"
              type="text"
              value={tags}
              onChange={(e)=>{settags(e.target.value)}}
            ></input>
     </div>
    <div class="flex space-x-2">
      <div class="dark:text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Start Practicing
      </div>

      <button class="inline-flex items-center justify-center bg-[red] text-[white] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2" onClick={Delete}>
        Delete
      </button>
    </div>
  </div>
  <div class="overflow-hidden rounded-lg border-t border-b border-gray-200">
   {!confirm &&  !debouncy.load && <Questionlist value={debouncy.debounce}  value2={debouncetags.debounce}/>}
   {confirm && <div className='dark:text-white'>
     <h1>Are You sure you want to delete your entire question list ?</h1>
     <div className='flex gap-5 p-5 '>
     <button class="bg-[red] text-[white] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground h-10 px-4 py-2" onClick={deletelist}>
        Yes
      </button>
      <button class=" bg-[green] text-[white] whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground h-10 px-4 py-2" onClick={Delete}>
        No
      </button>
     </div>
   </div>}
  </div>
</div>
      
      </div>   
    </div>
    </div>  
    </>
  )
}

export default Landing