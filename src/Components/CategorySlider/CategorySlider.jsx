import React, { useEffect, useState } from 'react'
// import styles from './CategorySlider.module.css';
import axios from 'axios';
import Slider from 'react-slick'

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    autoplay: true
  }
  async function getCategories(){  
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data)
  }
  useEffect(()=> {
    getCategories();
  }, [])
  return <>
    <div className='my-5'>
      <Slider {...settings}>
        {categories.map((category)=>
          <div key={category._id}>
            <img className='w-100' height={250} src={category.image} alt="" />
            <h2 className='h6 pt-2 text-center'>{category.name}</h2>
          </div>
        )}
      </Slider>
    </div>
  </>
}
