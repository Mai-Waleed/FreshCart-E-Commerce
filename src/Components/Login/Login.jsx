import { useFormik } from 'formik'
import React, { useState } from 'react'
// import styles from './Login.module.css';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';


export default function Login({saveUserData}) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [msgError, setmsgError] = useState('')

  async function handleLogin(values){
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err)=> {
      setLoading(false);
      setmsgError(`${err.response.data.message}`)
    })
    if(data.message === 'success'){
      localStorage.setItem('userToken', data.token)
      saveUserData();
      setLoading(false);
      navigate('/')
    }
  }
  let validationSchema = Yup.object ({
    email: Yup.string().required('Required').email('Invalid email address'),
    password: Yup.string().required('Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'At least One Small, One Capital, One Special Character'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });
  return <>
  <Helmet>
    <title>FreshCart | Login</title>
  </Helmet>
    <div className='w-75 mx-auto py-4'>
      <h3>Login Now : </h3>
      {msgError.length > 0 ? <div className='alert alert-danger'>{msgError}</div> : null}

      <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input className='form-control mb-2' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

        <label htmlFor="password">Password</label>
        <input className='form-control mb-2' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange } onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

        {loading ? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
      </form>
    </div>
  </>
}
