import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext'
import { wishlistContext } from '../../Context/wishlistContext'
import toast from 'react-hot-toast'

export default function BrandProducts() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const [brandName, setBrandName] = useState('')
  const [subBrands, setSubBrands] = useState([]) 
  const [selectedSub, setSelectedSub] = useState(null)

  let { addToCart, setNumOfCartItems } = useContext(cartContext)
  let { addToWishlist } = useContext(wishlistContext)

  // =============================
  //     GET PRODUCTS
  // =============================
  async function getBrandProducts(subId = null) {
    setLoading(true)

    let url = subId
      ? `https://ecommerce.routemisr.com/api/v1/products?subbrand=${subId}`
      : `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`

    let { data } = await axios.get(url)
    setProducts(data.data)

    if (!subId) {
      if (data.data.length > 0) {
        setBrandName(data.data[0].brand.name)
      } else {
        let brandRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        setBrandName(brandRes.data.data.name)
      }
    }

    setLoading(false)
  }

  // =============================
  //   GET SUBBRANDS OF BRAND
  // =============================
  async function getSubBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}/subbrands`)
      setSubBrands(data.data)
    } catch (err) {
      console.log("Error fetching subbrands", err)
    }
  }

  useEffect(() => {
    getBrandProducts()
    getSubBrands()
  }, [id])

  // =============================
  //   LOADING SPINNER
  // =============================
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-success" role="status" style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )

  // =============================
  //   ADD TO CART
  // =============================
  async function addProduct(productId) {
    let response = await addToCart(productId)
    if (response?.data?.status === 'success') {
      setNumOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  // =============================
  //   ADD TO WISHLIST
  // =============================
  async function addProduct2(productId) {
    let response = await addToWishlist(productId)
    if (response?.data?.status === 'success') {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <>
      <Helmet>
        <title>{brandName ? `FreshCart | ${brandName}` : 'FreshCart | Brand'}</title>
      </Helmet>

      <div className="container my-5">
        <h2 className="text-center text-success mb-4">
          {brandName ? `${brandName} Products` : 'Products of this Brand'}
        </h2>

        {/* SUBBRANDS */}
        {subBrands.length > 0 && (
          <div className="mb-5 text-center">
            <h4 className="text-main mb-3">Sub Brands</h4>

            <div className="d-flex flex-wrap justify-content-center gap-3">

              {/* ALL BUTTON */}
              <button
                className={`btn border ${selectedSub === null ? 'bg-success text-white' : 'bg-white text-success'}`}
                onClick={() => {
                  setSelectedSub(null)
                  getBrandProducts()
                }}
              >
                All
              </button>

              {subBrands.map((sub) => (
                <button
                  key={sub._id}
                  className={`btn border ${selectedSub === sub._id ? 'bg-success text-white' : 'bg-white text-success'}`}
                  onClick={() => {
                    setSelectedSub(sub._id)
                    getBrandProducts(sub._id)
                  }}
                >
                  {sub.name}
                </button>
              ))}

            </div>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="col-md-2">
                <div className="product cursor-pointer px-2 py-3">
                  <Link to={`/productdetails/${product._id}`}>
                    <img className='w-100' src={product.imageCover} alt={product.title} />
                    <span className='text-main fw-bold font-sm'>{product.brand.name}</span>
                    <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>

                    <div className='d-flex justify-content-between'>
                      <span className='text-muted'>{product.price} EGP</span>
                      <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
                    </div>
                  </Link>

                  <button
                    className='btn bg-main text-white'
                    onClick={() => addProduct(product._id)}
                    style={{ marginRight: "2px", width: "49%" }}
                  >
                    <i className='fa-solid fa-cart-plus'></i>
                  </button>

                  <button
                    className='btn bg-main text-white'
                    onClick={() => addProduct2(product._id)}
                    style={{ width: "49%" }}
                  >
                    <i className='fa-solid fa-heart'></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-muted'>No products found for this brand.</p>
          )}
        </div>
      </div>
    </>
  )
}
