import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/cartContext'
import { wishlistContext } from '../../Context/wishlistContext'
import toast from 'react-hot-toast'

export default function CategoryProducts() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const [categoryName, setCategoryName] = useState('')
  const [subCategories, setSubCategories] = useState([]) // 🔹 إضافة للـ SubCategories
  const [selectedSub, setSelectedSub] = useState(null)   // 🔹 عشان نعرف انهي SubCategory المختارة

  let { addToCart, setNumOfCartItems } = useContext(cartContext)
  let { addToWishlist } = useContext(wishlistContext)

  // ✅ جلب منتجات الكاتيجوري أو الـsubcategory
  async function getCategoryProducts(subId = null) {
    setLoading(true)
    let url = subId
      ? `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subId}`
      : `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
    let { data } = await axios.get(url)
    setProducts(data.data)

    if (!subId) {
      if (data.data.length > 0) {
        setCategoryName(data.data[0].category.name)
      } else {
        // لو مفيش منتجات نجيب اسم الكاتيجوري
        let categoryRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        setCategoryName(categoryRes.data.data.name)
      }
    }
    setLoading(false)
  }

  // ✅ جلب SubCategories الخاصة بالكاتيجوري
  async function getSubCategories() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      setSubCategories(data.data)
    } catch (error) {
      console.log("Error fetching subcategories", error)
    }
  }

  useEffect(() => {
    getCategoryProducts()
    getSubCategories()
  }, [id])

  // 👉 spinner أثناء التحميل
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-success" role="status" style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )

  // 👉 دوال الإضافة إلى الكارت والويش ليست
  async function addProduct(productId) {
    let response = await addToCart(productId)
    if (response?.data?.status === 'success') {
      setNumOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

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
        <title>{categoryName ? `FreshCart | ${categoryName}` : 'FreshCart | Category'}</title>
      </Helmet>

      <div className="container my-5">
        <h2 className="text-center text-success mb-4">
          {categoryName ? `${categoryName} Products` : 'Products in this Category'}
        </h2>

        {/* 🔹 عرض SubCategories */}
        {subCategories.length > 0 && (
          <div className="mb-5 text-center">
            <h4 className="text-main mb-3">Subcategories</h4>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {subCategories.map((sub) => (
                <button
                  key={sub._id}
                  className={`btn border ${selectedSub === sub._id ? 'bg-success text-white' : 'bg-white text-success'}`}
                  onClick={() => {
                    setSelectedSub(sub._id)
                    getCategoryProducts(sub._id)
                  }}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="col-md-2">
                <div className="product cursor-pointer px-2 py-3">
                  <Link to={`/productdetails/${product._id}`}>
                    <img className='w-100' src={product.imageCover} alt={product.title} />
                    <span className='text-main fw-bold font-sm'>{product.category.name}</span>
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
            <p className='text-center text-muted'>No products found in this category.</p>
          )}
        </div>
      </div>
    </>
  )
}
