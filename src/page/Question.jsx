import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { reload } from '../Count';

const Question = ({i,_id,url,title,tags,revisionCount,difficulty}) => {
     const navi = useNavigate();
     //const [ques, setques] = useState(0);
    // const[i , seti] = useRecoilState(indx)
     const [count,setcount] = useRecoilState(reload);
    const tagarray = tags.split(","); 

    async function Remove(){
         const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${_id}`,{headers:{token:localStorage.getItem('token')}})
         if(res.data.a==1){
              setcount(!count);
         }
    }

   async function update(){
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/countupdate/${_id}`,{},{headers:{token:localStorage.getItem('token')}})
    if(res.data.a==1){
      setcount(!count);
    }
   }

  return (
      <>
      <div class="px-6 py-4 border-b border-gray-200 hover:bg-[#e0ffcd] dark:hover:bg-[#8e86e6ca] ease-in duration-300">
      <div class="flex items-center justify-between">
      <a href={url} target="_blank" rel="noreferrer"><span className='font-bold cursor-pointer dark:text-white'>{i}. {title}</span></a>
        <button onClick={Remove} class="dark:text-[#d9f2ff] dark:hover:text-[#c51350] hover:text-[#c51350] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-400">
          Remove
        </button>
      </div>
      <div class="mt-4 flex items-center justify-between w-full">
        <div className='w-[30%]'>
          <span class="text-sm font-medium text-gray-600 dark:text-[#f8fcfb]">Difficulty:</span>
          {difficulty?.toUpperCase()=="EASY" &&<span class='text-sm text-[green] pl-1 font-bold'>{difficulty}</span>}
          {difficulty?.toUpperCase()=="MEDIUM" &&<span class='text-sm text-[orange] pl-1 font-bold'>{difficulty}</span>}
          {difficulty?.toUpperCase()=="HARD" &&<span class='text-sm text-[red] pl-1 font-bold'>{difficulty}</span>}
        </div>
        <div className='flex items-center gap-2 w-[30%]'>
        <div  class="text-sm font-medium text-gray-600 dark:text-[#d9f2ff]">
          Revise count {revisionCount}
        </div>
        <svg onClick={update} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer dark:bg-[#d9f2ff] dark:rounded-full trans">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
        </div>
        
        <div class="flex space-x-2 w-[40%] items-center justify-end">
          <span class="text-sm font-medium text-gray-600 dark:text-[#c5d86d]">Tags:</span>
          {tagarray.map(list=>(
            <span class="text-sm text-gray-800 dark:text-white">{list}</span>
        ))}
        </div>
      </div>
    </div>   
      </>    
       
  )
}

export default Question