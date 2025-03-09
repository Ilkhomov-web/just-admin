import React, { useState, useEffect } from "react";
import "./UserInfo.css";
import {BACKEND_API} from '../../config'


export const UserInfo = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/orders`);
      const data = await response.json();
      if (data) {
        setAllOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (id) => {
    await fetch(`${BACKEND_API}/orders/delete`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id}),
    })
    await fetchInfo()
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="users">
      <hr />
      {allOrders.map((order, index) => (
        <div className="user" key={index}>
          <div className="userI">
            <span className="span">
              Foydalanuvchi: <h1>{order.userName}</h1>
            </span>
            <span className="span">
              Tel: <h3>{order.userPhone}</h3>
            </span>
            <span className="span">
              Manzil: <h3>{order.userMap}</h3>
            </span>
            <span className="span">
              Manzil: <h3>{order.userDate}</h3>
            </span>
          </div>
          <div className="productBox">
          {order.product.map((prod, prodIndex) => (
              <div key={prodIndex} className="product">
                <p>Mahsulot Nomi : {prod.name}</p>
                <p>Qancha: {prod.count}</p>
                <p>O'lchami: {prod.size}</p>
                <p>Narxi: {prod.price}</p>
                <p>Hamma Narxi: {prod.total}</p>
                <img src={prod.image} alt={prod.name} />
              </div>
          ))}
          </div>
          <button className="btnSucces" onClick={()=>{deleteOrder(order.id)}}>Yetkazildi</button>
          <hr />
        </div>
      ))}
      
    </div>
  );
};
