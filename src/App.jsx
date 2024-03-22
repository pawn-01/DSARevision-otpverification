import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './page/Login';
import Signup from './page/Signup';
import Landing from './page/Landing';
import Problem from './page/Problem';
import Notfound from './page/Notfound';
import Emailverify from './page/Emailverify';


const App = () => {
  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/verify' element={<Emailverify/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/problem' element={<Problem />} />
        <Route path='*' element={<Notfound/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App