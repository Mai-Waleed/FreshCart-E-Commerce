import React from 'react'
// import styles from './NotFound.module.css';
import notFoundImg from '../../assets/images/error.svg'

export default function NotFound() {
  return <>
    <div className='container my-5 d-flex justify-content-center'>
      <img src={notFoundImg} alt="Not Found"/>
    </div>
  </>
}
