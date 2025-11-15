import React from 'react'
// import styles from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  if(localStorage.getItem('userToken') == null){
    //Don't have account navigate to Login
    return <Navigate to={'/login'}/>
  } else {
    //Have account navigate to what he need
    return props.children;
  }
}
