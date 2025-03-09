import React from 'react'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import { Routes, Route } from 'react-router-dom';
import {AddProduct} from '../../Components/AddProduct/AddProduct';
import {ListProduct} from '../../Components/ListProduct/ListProduct';
import  {UserInfo}  from '../../Components/UserInfo/UserInfo';
import { SpinGame } from '../../Components/spinGame/Spingame';


export const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path='/justuserinfo' element={<UserInfo />} />
        <Route path='/spinGame' element={<SpinGame />} />
      </Routes>
    </div>
  )
}
