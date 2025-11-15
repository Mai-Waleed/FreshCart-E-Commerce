import React, { useContext } from 'react'
// import styles from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
// import { wishlistContext } from '../../Context/wishlistContext';

export default function Navbar({userData, setuserData}) {
  const navigate = useNavigate(); 
  let {numOfCartItems} = useContext(cartContext);
  // let {numOfWishlistItems} = useContext(wishlistContext);
  return <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" href="#" aria-current="page"
                >Home
                <span className="visually-hidden">(current)</span></a
              >
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">Brands</Link>
            </li>
          </ul> : null}
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-tiktok'></i>
              <i className='fab mx-2 fa-linkedin'></i>
              <i className='fab mx-2 fa-youtube'></i>
            </li>

            {userData === null ? 
            <>
              <li className="nav-item">
                <Link className="nav-link" to="login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">Register</Link>
              </li>
            </> : <>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="cart">
                <i className='fas fa-shopping-cart fa-lg'></i>
                <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfCartItems}</span>
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="wishlist">
                <i class="fa-solid fa-bookmark fa-lg"></i>
                <span className='badge bg-main text-white position-absolute top-0 end-0'></span>
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link" style={{cursor:'pointer'}} onClick={()=> {
                localStorage.removeItem('userToken');
                setuserData(null)
                navigate('/')
              }}>Logout</span>
            </li>
            </>
            }
          </ul>
        </div>
      </div>
    </nav>
    
  </>
}