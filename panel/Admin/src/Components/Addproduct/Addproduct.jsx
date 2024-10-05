import React, { useState } from 'react';
import upload from "../../assets/upload_area.svg";
import "./Addproduct.css";

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    desc: ""
  });

  const add = async () => {
    console.log(productDetails);

    // Step 1: Upload image to Cloudinary
    let responseData;
    let formData = new FormData();
    formData.append('image', image); // Append the selected image

    try {
      const response = await fetch('https://classic-backend-1.onrender.com/upload', {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData, // Send the image to the backend (Cloudinary)
      });
      responseData = await response.json();

      // Step 2: Check if upload was successful
      if (responseData.success) {
        // Step 3: Save product along with Cloudinary URL
        const updatedProductDetails = {
          ...productDetails,
          image: responseData.image_url, // Set the image URL returned from Cloudinary
        };

        const addProductResponse = await fetch('https://classic-backend-1.onrender.com/addproduct', {
          method: "POST",
          headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
          },
          body: JSON.stringify(updatedProductDetails), // Send updated product details
        });
        const productData = await addProductResponse.json();
        productData.success ? alert('Product added') : alert("Product addition failed");
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error("Error uploading image or adding product:", error);
    }
  };

  const imagehandle = (e) => {
    setImage(e.target.files[0]); // Handle file input
  };

  const changehandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className='addproduct'>
      <div className="addproductitemfields">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changehandler} type="text" name="name" placeholder='Product Name' />
      </div>
      <div className="addproductitemfields">
        <p>Product description</p>
        <input value={productDetails.desc} onChange={changehandler} type="text" name="desc" placeholder='Product Description' />
      </div>
      <div className="addproductprice">
        <div className="addproductitemfields">
          <p>Offer Price</p>
          <input value={productDetails.price} onChange={changehandler} type="text" name="price" placeholder="Offer Price" />
        </div>
      </div>
      <div className="addproductitemfield">
        <p>Product category</p>
        <select value={productDetails.category} onChange={changehandler} name="category" className='addproductselector'>
          <option value="Sweaters">Sweaters</option>
          <option value="Shirts">Shirts</option>
          <option value="Hoodies">Hoodies</option>
        </select>
      </div>
      <div className="addproductitemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload} alt="" className='addproductthumbnailimg' />
        </label>
        <input onChange={imagehandle} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={add} className='addproductbtn'>ADD</button>
    </div>
  );
};

export default Addproduct;
