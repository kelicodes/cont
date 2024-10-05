import React, { useEffect, useState,useContext,createContext } from 'react'

export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {

  const url = "https://classic-backend-1.onrender.com"

  const [allproducts, setAllproduct]=useState([])
  useEffect(() => {
    fetch(`${url}/allproducts`).then((response)=>response.json()).then((data)=>setAllproduct(data))
    console.log(allproducts);
    
  }, [])
  const contextvalue={allproducts,url}
  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
