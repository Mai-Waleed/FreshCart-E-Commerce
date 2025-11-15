import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null)
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    async function getCart() {
        let response = await getLoggedUserCart()
        if(response?.data?.status === 'success'){
            setNumOfCartItems(response.data.numOfCartItems)
            setCartId(response.data.data._id)
        }
    }

    useEffect(()=>{
        getCart();
    },[])
    let headers = {
        token : localStorage.getItem('userToken')
    }

    function addToCart(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId : id
        }, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }
    function getLoggedUserCart(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }
    function removeFromCart(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }
    function updateProductCount(id, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count : count
        }, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }
    function clearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }
    function onlinePayment(cartId, shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress : shippingAddress
        }, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }

    return <cartContext.Provider value={{cartId, numOfCartItems, setNumOfCartItems, addToCart, getLoggedUserCart, removeFromCart, updateProductCount, clearCart, onlinePayment}}>
        {props.children}
    </cartContext.Provider>
}