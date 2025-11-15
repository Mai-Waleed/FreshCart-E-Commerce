import { useFormik } from 'formik'
import React, { useState } from 'react'
// import styles from './Register.module.css';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';


export default function Register() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [msgError, setmsgError] = useState('')

  async function handleRegister(values){
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err)=> {
      setLoading(false);
      setmsgError(`${err.response.data.message}`)
    })
    if(data.message === 'success'){
      setLoading(false);
      navigate('/login')
    }
  }
  let validationSchema = Yup.object ({
    name: Yup.string().required('Required').min(3,'Must be 3 characters or more').max(15,'Must be 15 characters or less'),
    email: Yup.string().required('Required').email('Invalid email address'),
    password: Yup.string().required('Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'At least One Small, One Capital, One Special Character'),
    rePassword: Yup.string().required('Required').oneOf([Yup.ref('password')],'Passwords Don\'t Match'),
    phone: Yup.string().required('Required').matches(/^01[0125][0-9]{8}$/,'Invalid Phone Number'),
  })
  // function validate(values){
  //   let errors = {};
  //   if (!values.name)
  //     errors.name = 'Required'
  //   else if (values.name.length > 2)
  //     errors.name = 'Must be 3 characters or more'
  //   else if (values.name.length > 15)
  //     errors.name = 'Must be 15 characters or less';

  //   if (!values.email)
  //     errors.email = 'Required'
  //   else if (!/^[A-Z0-9._%+-]+[A-Z]{2,4}$/i.test(values.email))
  //     errors.email = 'Invalid email address'

  //   if (!values.password)
  //     errors.password = 'Required'
  //   else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.phone))
  //     errors.password = 'At least One Small, One Capital, One Special Character'
  //   if (!values.rePassword)
  //     errors.rePassword = 'Required'
  //   else if (values.password !== values.rePassword)
  //     errors.rePassword = 'Not Same Password'

  //   if (!values.phone)
  //     errors.phone = 'Required'
  //   else if (!/^01[0125][0-9]{8}$/i.test(values.phone))
  //     errors.phone = 'Invalid Phone Number'

  //   return errors
  // }
  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleRegister
  });
  return <>
  <Helmet>
    <title>FreshCart | Register</title>
  </Helmet>
    <div className='w-75 mx-auto py-4'>
      <h3>Register Now : </h3>
      {msgError.length > 0 ? <div className='alert alert-danger'>{msgError}</div> : null}

      <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input className='form-control mb-2' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null}

        <label htmlFor="email">Email</label>
        <input className='form-control mb-2' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

        <label htmlFor="password">Password</label>
        <input className='form-control mb-2' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange } onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
        <label htmlFor="rePassword">Confirm Password</label>
        <input className='form-control mb-2' type="password" name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

        <label htmlFor="phone">Phone</label>
        <input className='form-control mb-2' type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}

        {loading ? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}
      </form>
    </div>
  </>
}
