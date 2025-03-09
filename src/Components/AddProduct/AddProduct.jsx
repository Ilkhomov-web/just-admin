import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
import {BACKEND_API} from '../../config'

export const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    image: '',
    size: [],
    category: 'women',
    new_price: '',
    old_price: '',
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'size') {
      let sizes = [...productDetails.size];
      if (checked) {
        sizes.push(value);
      } else {
        sizes = sizes.filter((size) => size !== value);
      }
      setProductDetails({ ...productDetails, size: sizes });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
    
  };

  const Add_Product = async ()=> {
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch(`${BACKEND_API}/upload`, {
  method: 'POST', // Metodni 'POST' ga o'zgartiring
  headers: {
    Accept: 'application/json',
  },
  body: formData,
}).then((resp) => resp.json()).then((data)=> {responseData=data});

if(responseData.success){
  product.image = responseData.image_url;
  await fetch(`${BACKEND_API}/products/`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((resp)=> resp.json()).then((data)=> {
    data.success?alert("Product Added"):alert("Feild Product")
  })
}


  }

  return (
    <div className="AddProduct">
      <div className="product-itemfield">
        <p>Mahsulot Nomi</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Product title' />
      </div>
      <div className="product-itemfield">
        <p>Mahsulot Haqida</p>
        <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder='Product description' />
      </div>
      <div className="product-itemfield">
        <p>Mahsulot O'chami</p>
        <div className="checkbox">
        {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', 'S', 'M', 'L', '1XL', '2XL', '3XL', '4XL'].map((size) => (
            <div className="check" key={size}>
              <span>{size}</span>
              <input
                className="inputCheck"
                value={size}
                onChange={changeHandler}
                type="checkbox"
                name="size"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="addproduct-price">
        <div className="product-itemfield">
          <p>Mahsulot Eski Narxi</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Product old_price' />
        </div>
        <div className="product-itemfield">
          <p>Mahsulot Yangi Narxi</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Product new_price' />
        </div>
      </div>
      <div className="product-itemfield">
          <p>Mahsulot Turkumi</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selected">
            <option value="women">Ayollar</option>
            <option value="men">Erkaklar</option>
            <option value="kid">Bolalar</option>
            <option value="socks">Paypoqlar</option>
            <option value="sneakers">Krasofkalar</option>
            <option value="pants">Shiplar</option>
            <option value="caps">Kepkalar</option>
            <option value="slipper">Tapchkalar</option>
            <option value="fudbolka">Fudbolkalar</option>
            <option value="treko">Trekolar</option>
            <option value="sviter">Sviterlar</option>
            <option value="nimcha">Nimchalar</option>
            <option value="makas">Makaslar</option>
            <option value="bag">So'mkalar</option>
            <option value="boshqa">Boshqalar</option>
            <option value="discount">Skidkalar</option>
            <option value="look">Looklar</option>
          </select> 
        </div>
        <div className="product-itemfield">
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} alt="" className='upload-thumnial-img' />
          </label>
          <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className="addProduct-btn">Mahsulotni Qo'shish</button>
    </div>
  )
}
