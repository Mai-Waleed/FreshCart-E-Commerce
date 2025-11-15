import { useFormik } from 'formik'
import React from 'react'
// import styles from './Footer.module.css';
import img1 from '../../assets/images/imgi_105_app-icon-01.png'
import img2 from '../../assets/images/imgi_106_app-icon-02.png'

export default function Footer() {
  async function handleSubmit(values){
    console.log('Form Submitted : ', values)
  }

  let formik = useFormik({
      initialValues: {
        email : '',
      },
      onSubmit: handleSubmit
    })

  return <>
    <div className='footer w-100 mt-5 bottom-0'>
      <div className='d-flex flex-column container py-3 mx-lg-5 w-100'>
        <h4 className='fw-medium'>Get the FreshCart app</h4>
        <p className='bg-light-main font-sm text-black-50'>We will sent you a link, open it on your phone to download the app</p>
        <div className='mx-3'>
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex w-100'>
              <input type="text" className='form-control' name="share" id="share" value={formik.values.email} onChange={formik.handleChange} placeholder='Email ...'/>
              <button className='btn bg-main text-white mx-4' style={{width:'200px'}}>Share App Link</button>
            </div>
          </form>
        </div>
        <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '25px',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          ><hr className='w-100' style={{color: '#777'}}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#444', fontSize: '14px', fontWeight: 'bold'}}>Payment Partners</span>
              <img src="https://freshcart.codescandy.com/assets/images/payment/amazonpay.svg" alt="Amazon Pay" height="25" style={{cursor: 'pointer'}}/>
              <img src="https://freshcart.codescandy.com/assets/images/payment/american-express.svg" alt="Amex" height="25" style={{cursor: 'pointer'}}/>
              <img src="https://freshcart.codescandy.com/assets/images/payment/mastercard.svg" alt="Mastercard" height="25" style={{cursor: 'pointer'}}/>
              <img src="https://freshcart.codescandy.com/assets/images/payment/paypal.svg" alt="PayPal" height="25" style={{cursor: 'pointer'}}/>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#444', fontSize: '14px', fontWeight: 'bold'}}>Get deliveries with FreshCart</span>
              <img src={img2} alt="App Store" height="38" style={{cursor: 'pointer'}}/>
              <img src={img1} alt="Google Play" height="38" style={{cursor: 'pointer'}}/>
            </div>
          </div><hr className='w-100' style={{color: '#777'}}/>
          <div className='d-flex justify-content-center'>
            <p className='text-black-50'>© 2025 FreshCart. All rights reserved. Designed by <span className='text-main'>Mai Waleed</span></p>
          </div>
      </div>
    </div>
  </>
}
