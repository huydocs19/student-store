import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import { useParams } from "react-router-dom"
import {Hero, NavBar, SubNavBar, NotFound, ProductView} from "components"
import "./ProductDetail.css"

export default function ProductDetail({
  user, 
  activeCategory,
  setActiveCategory,
  handleOnSearchInputChange,
  searchInputValue,
  addToCart,
  removeFromCart,
  getQuantityOfItemInCart,
  handleLogout,
  searchProduct,
}) {
  const [product, setProduct] = useState(null)
  const [isFetching, setIsFetching] = useState(false)   
  let {productId} = useParams() 
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true)      
      const {data} = await apiClient.fetchProductById(productId) 
      if (data?.product) {       
        setProduct(data.product)                      
      } 
      setIsFetching(false)      
    } 
    fetchProduct()
  }, [productId]);
  return (
    <div className="product-detail">
      <NavBar user={user} handleLogout={handleLogout}/>
      <Hero />
      <SubNavBar        
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        handleOnSearchInputChange={handleOnSearchInputChange}
        searchInputValue={searchInputValue}        
        searchProduct={searchProduct}
      />
      {isFetching ? 
          <div className="card">
            <p>Loading...</p>
          </div>:
        product ?
        <ProductView 
          product={product} 
          quantity={getQuantityOfItemInCart(product)} 
          addToCart={addToCart} 
          removeFromCart={removeFromCart}
        />:
        <NotFound />
      }
    </div>
  )
}
