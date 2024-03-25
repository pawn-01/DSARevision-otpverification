import React, { useState,CSSProperties, useEffect, memo }  from 'react'
import Question from './Question'
import {ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { listcount, reload } from '../Count'

const itemsperpage = 8;

const Questionlist = memo(function Questionlist({value,value2}) {
    const [currentpage, setcurrentpage] = useState(0);
    const [loader, setloader] = useState(true);
    const [queslist, setqueslist] = useState([]);
    const[count,setcount] = useRecoilState(listcount);
    const [Reload, setReload] = useRecoilState(reload);

    console.log("value "+value2)


    function handlepage(pagenumber){
        if(pagenumber>=0 && pagenumber<nofpage) {
         setcurrentpage(pagenumber);
        }
    }

    useEffect(() => {
      async function backend(){
         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/list?value=${value2==""?value:'Tags: '+value2}`,{headers:{token:localStorage.getItem('token')}});
         if(res.data.a==1){
            setqueslist(res.data.list);
            setloader(false);
            setcount(res.data.list.length);
         }
         else{
            alert("There is some issue");
         }
      }
      
       backend();
     
    }, [value,value2,Reload])

    console.log("list" + queslist);
   
    const rows = queslist.slice(currentpage*itemsperpage,(currentpage+1)*itemsperpage);
    const nofpage = Math.ceil(queslist.length/itemsperpage);
    const pageindex = Array.from({length:nofpage},(_,idx)=>idx+1)
  
    if(loader){
       return <div className='flex justify-center items-center h-[50vh]'>
          <ThreeDots
          className='.trans'
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
       </div>
    }

    if(!loader && queslist.length==0){
        return <div className='font-bold text-center dark:text-white'>No question is in your list.<br/> plz add question</div>
    }

   const array = pageindex.slice(Math.max(0,currentpage-2),Math.min(nofpage,currentpage+3))
  return (
     <>
       {rows.length>0 && rows.map((list,i)=>(
      <Question {...list} i={i+currentpage*itemsperpage+1}/>
        ))}
       {nofpage>1 && <div className='flex justify-center items-center cursor-pointer'>
          <svg onClick={()=>{handlepage(currentpage-1)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-black text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          {array.length>0 && array.map(page=>(
            <div onClick={() => {handlepage(page-1)}} className={`w-6 h-6 border border-black text-center cursor-pointer dark:text-white ${page==currentpage+1 ? 'Act' : ''}`}>{page}</div>
          ))}
          <svg onClick={()=>{handlepage(currentpage+1)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  bg-black text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
         </svg> 

        </div>}
     </>
  )
})

export default Questionlist