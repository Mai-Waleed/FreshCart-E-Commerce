import React, { useContext, useEffect, useState } from 'react'
// import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/wishlistContext';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  let {addToCart, setNumOfCartItems} = useContext(cartContext);
  let {addToWishlist} = useContext(wishlistContext);

  async function addProduct(productId){
    let response = await addToCart(productId)
    if(response?.data?.status === 'success') {
      setNumOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message)
    }
  }

  async function addProduct2(productId){
    let response = await addToWishlist(productId)
    if(response?.data?.status === 'success') {
      // setnumOfWishlistItems(response.data.numOfWishlistItems)
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message)
    }
  }

  async function getProducts(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    setProducts(data.data)
  }
  useEffect(()=> {
    getProducts();
  }, [])

  return <>
    <div className="row">
      {products.map((product)=> <div key={product._id} className="col-md-2">
        <div className="product cursor-pointer px-2 py-3">
          <Link to={`/productdetails/${product._id}`}>
          <img className='w-100' src={product.imageCover} alt="" />
          <span className='text-main fw-bold font-sm'>{product.category.name}</span>
          {/* Convert String To Array Then Slice Then Make It String Again */}
          <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
          <div className='d-flex justify-content-between'>
            <span className='text-muted'>{product.price} EGP</span>
            <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
          </div>
          </Link>

          <button className='btn bg-main text-white' onClick={()=> addProduct(product._id)} style={{marginRight:"2px", width:"49%"}}><i className='fa-solid fa-cart-plus'></i></button>
          <button className='btn bg-main text-white' onClick={()=> addProduct2(product._id)} style={{ width:"49%"}}><i className='fa-solid fa-heart'></i></button>

        </div>
      </div>
      )}
    </div>
  </>
}
