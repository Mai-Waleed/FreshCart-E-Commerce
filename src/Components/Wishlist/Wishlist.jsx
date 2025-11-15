import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { wishlistContext } from '../../Context/wishlistContext'
// import styles from './Wishlist.module.css';

export default function Wishlist() {
  let {getLoggedUserWishlist, removeFromWishlist} = useContext(wishlistContext)
  const [wishlistDetails, setWishlistDetails] = useState(null)

  async function getWishlist() {
    let response = await getLoggedUserWishlist()
    if(response?.data?.status === 'success') {
      setWishlistDetails({ products: response.data.data })
    }
  }

  async function removeProduct(productId) {
    let response = await removeFromWishlist(productId)
    if (response?.data?.status === 'success') {
    setWishlistDetails((prev) => ({
      products: prev.products.filter((product) => product._id !== productId)
    }))
  } 
    toast('Product Removed Successfully')
  }

  useEffect(()=> {
      getWishlist()
    }, [])

  return <>
  <Helmet>
    <title>FreshCart | Wishlist</title>
  </Helmet>
    {wishlistDetails ? <div className='bg-main-light p-4 my-4'>
      <h3>My Wishlist :</h3>
      {wishlistDetails.products.map((product)=> <div key={product._id} className="row border-bottom py-2 my-2 align-items-center">
        <div className='col-md-1'>
          <img src={product.imageCover} className='w-100' alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between align-items-center ">
          <div>
            <h6>{product.title}</h6>
            <h6 className='text-main'>price : {product.price}</h6>
            <button onClick={()=> removeProduct(product._id)} className='btn m-0 p-0'><i className='fa-regular fa-trash-can text-main'></i></button>
          </div>
        </div>
      </div>)}
    </div> : null}
  </>
}
