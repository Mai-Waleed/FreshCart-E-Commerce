import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
// import styles from './Brands.module.css';

export default function Brands() {
  const [brands, setBrands] = useState([])

  async function getBrands() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setBrands(data.data)
  }

  useEffect(()=>{
    getBrands();
  }, [])
  return <>
  <Helmet>
    <title>FreshCart | Brands</title>
  </Helmet>
  <div className="row">
    {brands.map((brand)=> <div key={brand._id} className='col-md-2'>
      <Link to={`/brands/${brand._id}`}>
        <div className='brand cursor-pointer px-2 py-4 text-center'>
          <img className='w-100 my-2' height={250} src={brand.image} alt="" />
          <h2 className='font-sm fw-bold'>{brand.name}</h2>
        </div>
      </Link>
    </div>)}
  </div>
  </>
}
