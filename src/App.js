// import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CartContextProvider } from './Context/cartContext';
import { WishlistContextProvider } from './Context/wishlistContext';
import { Toaster } from 'react-hot-toast'
import { Offline, Online } from 'react-detect-offline'
import Layout from './Components/Layout/Layout';
import Home from'./Components/Home/Home';
import Login from'./Components/Login/Login';
import Cart from'./Components/Cart/Cart';
import CheckOut from './Components/CheckOut/CheckOut';
import Wishlist from'./Components/Wishlist/Wishlist';
import Register from'./Components/Register/Register';
import Categories from'./Components/Categories/Categories';
import Products from'./Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Brands from'./Components/Brands/Brands';
import About from'./Components/About/About';
import NotFound from'./Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';

function App() {
  const [userData, setuserData] = useState(null);

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken)
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  }, []);

  let routers = createHashRouter([
    {path:'', element:<Layout setuserData={setuserData} userData={userData}/>, children: [
      {index:true, element:<Home/>},
      {path:'about', element:<About/>},
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'checkout', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:'wishlist', element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'login', element:<Login saveUserData={saveUserData}/>},
      {path:'Register', element:<Register/>},
      {path:'Products', element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'categories/:id', element:<ProtectedRoute><CategoryProducts/></ProtectedRoute>},
      {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'brands/:id', element:<ProtectedRoute><BrandProducts/></ProtectedRoute>},
      {path:'*', element:<NotFound/>},
    ]}
  ])
  return <>
  <CartContextProvider>
    <WishlistContextProvider>
    {/* Use this with createBrowserRouter */}
    {/* <Online>Only shown when you're online</Online> */}
    {/* <Offline><div className='network'>You Are Offline. Check You Network!!</div></Offline>  */}
    <Offline polling={{ url: 'https://jsonplaceholder.typicode.com/posts/1', interval: 5000 }}>
      <div className='network'>You Are Offline. Check Your Network!!</div>
    </Offline>
    <Toaster/>
    <RouterProvider router={routers}></RouterProvider>
    </WishlistContextProvider>
  </CartContextProvider>
  </>
}

export default App;
