import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { listcount } from '../Count';
import axios from 'axios';

const Problem = () => {
  const Navi = useNavigate();
  const [title, settitle] = useState('');
  const [url, seturl] = useState('');
  const [tags, settags] = useState('');
  const [difficulty, setdifficulty] = useState('')
  const [redirect, setredirect] = useState(false);
  const [count,setcount] = useRecoilState(listcount);
// const user = useRecoilValue(userinfo)

   useEffect(() => {
    async function Profie(){
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile`,{},{headers:{token:localStorage.getItem('token')}})
      if(res.data.a==0){
           localStorage.removeItem('token');
            Navi("/login");
         }

       const ver = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify`,{},{headers:{token:localStorage.getItem('token')}});
       if(ver.data.a!=1){
           Navi('/verify');
       }
     }

     Profie()
   }, [])
   
  
  async function Revison(e){
   // console.log("add");
     e.preventDefault();
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add`,{
          title,
          url,
          tags,
          difficulty
     },{headers:{token:localStorage.getItem('token')}})

     if(res.data.a==1){
        setcount(count => count+1);
       setredirect(true);
     }
     else if(res.data.a==0){
         alert(res.data.message);
     }

     else{
       alert("There is some issue");
     }
     
  }

if(redirect){
     return <Navigate to="/landing" />
}

  return (
    <>
       <div className='h-[100vh] flex justify-center items-center bg-[#00204a]'>
       <div className="rounded-lg border bg-card text-card-foreground shadow-lg mx-auto w-[70%] bg-[#fcfefe]">
              <div className="flex flex-col p-6 space-y-1">
                <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Add Question</h3>
                  <p className="text-sm text-muted-foreground">Enter Question's details below to add in your revision list</p>
            </div>
  <div className="p-6">
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Question Title
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Two Sum"
          required=""
          type="text"
          value={title}
          onChange={(e)=>{settitle(e.target.value)}}
        />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Question Link
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="leetcode/gfg"
          required=""
          type="url"
          value={url}
          onChange={(e)=>{seturl(e.target.value)}}
        />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Question tags
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="plz give space between each tag and maximum 4 tags entered"
          required=""
          type="text"
          value={tags}
          onChange={(e)=>{settags(e.target.value)}}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Difficulty
          </div>
  
        </div>
        <select data-placeholder="Select difficulty" onChange={(e)=>{console.log(e.target.value); setdifficulty(e.target.value)}} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
    <option value=""></option>
    <option className='p-1'>Easy</option>
    <option className='px-1 py-0.5'>Medium</option>
    <option className='px-1 py-0.5'>Hard</option>
  
  </select>
        {null && <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required=""
          type="text"
          value={difficulty}
          placeholder='medium'
          onChange={(e)=>{setdifficulty(e.target.value)}}
        />}
      </div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[100%] bg-[black] text-[white] "
        onClick={Revison}
      >
        Add problem
      </button>
     
    </div>
  </div>
  </div>
  </div>
    </>
  )
}

export default Problem