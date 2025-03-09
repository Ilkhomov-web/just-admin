import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import userInfo from '../../assets/sale.png';
import gameIcon from '../../assets/game.png';

export const Sidebar = () => {
  
  return (
    <div className='sidebar'>
      <Link to={"/addproduct"} style={{textDecoration: 'none'}}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Mahsulot Qo'shish</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{textDecoration: 'none'}}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Mahsulotlar Ro'yxati</p>
        </div>
      </Link>
      <Link to={"/justuserinfo"} style={{textDecoration: 'none'}}>
        <div className="sidebar-item">
          <img src={userInfo} alt="" width={'40px'} />
          <p>Buyurtmalar</p>
        </div>
      </Link>
      <Link to={"/spinGame"} style={{textDecoration: 'none'}}>
        <div className="sidebar-item">
          <img src={gameIcon} alt="" width={'40px'} />
          <p>SpinGame </p>
        </div>
      </Link>
    </div>
  )
}
