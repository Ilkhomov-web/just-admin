import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import {BACKEND_API} from '../../config'



export const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch(`${BACKEND_API}/products`).then((res) => res.json()).then((data)=>{setAllProducts(data)});
  }

  useEffect(() => {
    fetchInfo()
  }, [])
  const remove_product = async (id) => {
    await fetch(`${BACKEND_API}/products/:id/delete`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id}),
    })
    await fetchInfo()
  }

  return (
    <div className='ListProduct'>
      <h1>Barcha Mahsulotlar Ro'yxati || {allproducts.length}</h1>
      <div className="listProduct-format-main">
        <p>Mahsulotlar</p>
        <p>Nomi</p>
        <p>Eski Narxi</p>
        <p>Yangi Narxi</p>
        <p>Turkumi</p>
        <p>Mahsulotni <br /> olib tashlash</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allproducts.map((product,index)=>{
          return <>
          <div key={index} className="listProduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
            </div>
            <hr />
            </>
        })}
      </div>
    </div>
  )
}
