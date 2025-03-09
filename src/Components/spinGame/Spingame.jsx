import React, { useState, useEffect } from "react";
import "../UserInfo/UserInfo.css";
import {jwtDecode} from "jwt-decode";
import {BACKEND_API} from '../../config'


export const SpinGame = () => {
  const [allSpinWin, setAllSpinWin] = useState([]);
  const [userName, setUserName] = useState("");

  // Define fetchUserInfo at the component level
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/spinGame/`);
      const data = await response.json();
      if (data) {
        const updatedData = data.map((order) => {
          const token = order.userName; // Assuming userName field contains the token
          if (token && token.split('.').length === 3) {
            try {
              const decodedToken = jwtDecode(token);
              order.userName = decodedToken.user.id; // Assuming the user ID is what you need
            } catch (error) {
              console.error("Error decoding token:", error);
              order.userName = "Invalid token"; // Handle the case of invalid token
            }
          } else {
            order.userName = "Invalid token format"; // Handle the case of incorrect token format
          }

          // Format date to 24-hour format
          order.date = formatDate(order.date);

          return order;
        });
        setAllSpinWin(updatedData);
      }
    } catch (error) {
      console.error("Error fetching spin game data:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []); // Run only once on component mount

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
    return formattedDate;
  };

  const deleteSpinWin = async (id) => {
    try {
      await fetch(`${BACKEND_API}/spinGame/${id}/delete`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      // Refetch the spin data after deletion
      fetchUserInfo();
      alert("O'chirildi !!!")
    } catch (error) {
      console.error("Error deleting spin win:", error);
    }
  };

  return (
    <div className="users">
      <hr />
      {allSpinWin.map((order, index) => (
        <div className="user" key={index}>
          <div className="userI">
            <span style={{ width: '450px' }}>
              Foydalanuvchi: <h1 style={{ fontSize: '13px', width: '450px', overflow: 'auto' }}>{order.userName}</h1>
            </span>
            <span className="span">
              Vaqt <h3>{order.date}</h3>
            </span>
          </div>
          <div className="productBox">
            <div className="product">
              {order.spinWin}
            </div>
          </div>
          <button className="btnSucces" onClick={() => { deleteSpinWin(order.id) }}>Done</button>
          <hr />
        </div>
      ))}
    </div>
  );
};
