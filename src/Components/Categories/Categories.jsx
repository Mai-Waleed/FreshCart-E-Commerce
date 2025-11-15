import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
// import styles from './Categories.module.css';

export default function Categories() {
  const [categories, setCategories] = useState([])

  async function getCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data)
  }

  useEffect(()=>{
    getCategories();
  }, [])
  return <>
  <Helmet>
    <title>FreshCart | Categories</title>
  </Helmet>
  <div className="row">
    {categories.map((category)=> <div key={category._id} className='col-md-2'>
      <Link to={`/categories/${category._id}`}>
        <div className="category cursor-pointer px-2 py-4 text-center">
          <img className='w-100 my-2'   height={250} src={category.image} alt="" />
          <h2 className='font-sm fw-bold'>{category.name}</h2>
        </div>
      </Link>
    </div>)}
  </div>
  </>
}
