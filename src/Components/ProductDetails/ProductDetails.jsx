import React, { useEffect, useState } from 'react'
// import styles from './ProductDetails.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Slider from 'react-slick'

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let {id} = useParams()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  async function getProductDetails(id) {
    setIsLoading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setProductDetails(data.data)
    setIsLoading(false)
  }

  useEffect(()=>{
    getProductDetails(id)
  },[id])

  return <>
  <Helmet>
    <title>FreshCart | Produtct Details</title>
  </Helmet>
  <div className='row align-items-center py-3 justify-content-center align-items-center'>
  {isLoading ? <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div> : <>
  <div className='col-md-4'>
      <Slider {...settings}>
        {productDetails?.images.map((img)=>
          <img key={img} src={img} alt='' className='w-100'/>
        )}
      </Slider>
    </div>
    <div className='col-md-8'>
      <h3>{productDetails?.title}</h3>
      <p className='text-muted p-2'>{productDetails?.description}</p>
      <div className='d-flex justify-content-between'>
        <span className='text-muted'>{productDetails?.price} EGP</span>
        <span>
          <i className='fas fa-star rating-color'></i> {productDetails?.ratingsAverage}
        </span>
      </div>
      {/* <button className='btn bg-main text-white w-50'><i className='fa-solid fa-cart-plus'></i></button> */}
      <button className='btn bg-main text-white my-4' style={{marginRight:"1%", width:"49%"}}><i className='fa-solid fa-cart-plus'></i></button>
      <button className='btn bg-main text-white my-4' style={{ width:"49%"}}><i className='fa-solid fa-heart'></i></button>
    </div>
  </>}
  </div>
  </>
}
