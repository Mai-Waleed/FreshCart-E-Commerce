import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishlistContext = createContext();

export function WishlistContextProvider(props){
    const [wishlistId, setWishlistId] = useState(null)
    // const [numOfWishlistItems, setnumOfWishlistItems] = useState(0)
    async function getWishlist() {
        let response = await getLoggedUserWishlist()
        if(response?.data?.status === 'success') {
            // setnumOfWishlistItems(response.data.numOfWishlistItems)
            setWishlistId(response.data.data._id)
        }
    }

    useEffect(()=>{
        getWishlist();
    },[])
    let headers = {
        token : localStorage.getItem('userToken')
    }

    function addToWishlist(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId : id
        }, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }
    function getLoggedUserWishlist(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }
    function removeFromWishlist(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers : headers
        }).then((response)=> response)
        .catch((error)=> error)
    }

    return <wishlistContext.Provider value={{wishlistId, addToWishlist, getLoggedUserWishlist, removeFromWishlist}}>
        {props.children}
    </wishlistContext.Provider>
}