import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext'
import { Helmet } from 'react-helmet'
// import styles from './CheckOut.module.css';

export default function CheckOut() {
  let {onlinePayment, cartId} = useContext(cartContext);

  async function handleSubmit(values){
    let response = await onlinePayment(cartId, values);
    if(response?.data?.status === 'success'){
      window.location.href = response.data.session.url
    }
  }

  let formik = useFormik({
    initialValues: {
      details : '',
      city : '',
      phone : ''
    },
    onSubmit: handleSubmit
  })
  return <>
  <Helmet>
    <title>FreshCart | Check Out</title>
  </Helmet>
    <div className='w-50 py-5 mx-auto'>
      <form onSubmit={formik.handleSubmit}>
        
        <label htmlFor="details">Details : </label>
        <input type="text" className='form-control' value={formik.values.details} onChange={formik.handleChange} name='details' id='details' />

        <label htmlFor="city">City : </label>
        <input type="text" className='form-control' value={formik.values.city} onChange={formik.handleChange} name='city' id='city' />

        <label htmlFor="phone">Phone : </label>
        <input type="tel" className='form-control' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone' />

        <button className='btn border-main w-100 my-4' type='submit'>Pay</button>
      </form>
    </div>
  </>
}
