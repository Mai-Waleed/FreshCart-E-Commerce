import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
// import styles from './Cart.module.css';
import { Helmet } from 'react-helmet'

export default function Cart() {
  let {getLoggedUserCart, removeFromCart, updateProductCount, clearCart} = useContext(cartContext)
  const [cartDetails, setCartDetails] = useState(null)

  async function getCart() {
    let response = await getLoggedUserCart()
    if(response?.data?.status === 'success'){
      setCartDetails(response.data.data)
    }
  }
  
  async function removeProduct(productId) {
    let response = await removeFromCart(productId)
    setCartDetails(response.data.data)
    toast('Product Removed Successfully')
  }

  async function updateCount(productId, productQuantity) {
    let respone = await updateProductCount(productId, productQuantity)
    setCartDetails(respone.data.data)
  }

  async function clearProducts() {
    let response = await clearCart()
    setCartDetails(null)
    if(response?.data?.message === 'success') {
      toast('Cart Cleard Successfully')
    }
  }

  useEffect(()=> {
    getCart()
  }, [])
  return <>
  <Helmet>
    <title>FreshCart | Cart</title>
  </Helmet>
    {cartDetails ? <div className="bg-main-light p-4 my-4">
      <h3>Shop Cart :</h3>
      <div className='d-flex justify-content-between align-items-center'>
        <h6 className='text-main'>Total Cart Price : {cartDetails.totalCartPrice} EGP</h6>
        <button className='btn btn-danger mt-3' onClick={()=> clearProducts()}>Clear Cart</button>
      </div>
      {cartDetails.products.map((product)=> <div key={product.product._id} className="row border-bottom py-2 my-2 align-items-center">
        <div className="col-md-1">
          <img src={product.product.imageCover} className='w-100' alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between align-items-center ">
          <div>
            <h6>{product.product.title}</h6>
            <h6 className='text-main'>price : {product.price}</h6>
            <button onClick={()=> removeProduct(product.product._id)} className='btn m-0 p-0'><i className='fa-regular fa-trash-can text-main'></i></button>
          </div>
          <div>
            <button onClick={()=>updateCount(product.product._id, product.count + 1)} className='btn border-main btn-sm'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=>updateCount(product.product._id, product.count - 1)} className='btn border-main btn-sm'>-</button>
          </div>
        </div>
      </div> )}
        <button className='btn bg-main'>
          <Link className='text-white' to='/checkout'>Check Out</Link>
        </button>
    </div> : null}
  </>
}
