import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import {
  Home,
  Register,
  Login,
  Orders,
  NotFound,
  ShoppingCart,
  ProductDetail
} from "components"

import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart"
import "./App.css"

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [searchInputValue, setSearchInputValue] = useState("")
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])  
  const [cart, setCart] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [orders, setOrders] = useState([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState(null)  

  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item))
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item))
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item)
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart)

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value)
  }

  const handleOnCheckout = async () => {
    setIsCheckingOut(true)

    const {data, error} = await apiClient.createOrder({ order: cart })
    if (error) {
      setError(error)
    }    
    if (data?.order) {      
      setIsCheckingOut(false)
      setCart({})
      return data.order    
    } else {
      setError("Error checking out.")
    }
    setIsCheckingOut(false)    
  }
  const handleOnProductSearch = () => { 
    const fetchProductsBySearchInputValue = async () => {
      setIsFetching(true)

      const {data, error} = await apiClient.fetchProductList()      
      if (error) {
        setError(error)
      }
      if (data?.products) {
        const filteredProductsByCategory = data.products.filter(product => {
          if (activeCategory === "All Categories") { 
            return true
          } 
          return product.category === activeCategory.toLowerCase()   
        })        
        const filteredProducts = filteredProductsByCategory.filter(product => product.name.toLowerCase().includes(searchInputValue.toLowerCase())) 
        setProducts(filteredProducts)    
      } else {
        setError("Error fetching products.")
      }
      setIsFetching(false)
      setSearchInputValue("")
    }
    fetchProductsBySearchInputValue()    
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true)

      const {data, error} = await apiClient.fetchProductList()      
      if (error) {
        setError(error)
      }
      if (data?.products) {
        const filteredProducts = data.products.filter(product => {
          if (activeCategory === "All Categories") { 
            return true
          } 
          return product.category === activeCategory.toLowerCase()   
        })        
        setProducts(filteredProducts)    
      } else {
        setError("Error fetching products.")
      }
      setIsFetching(false)
    }

    fetchProducts()
  }, [activeCategory])
  useEffect(() => {
    const fetchAuthedUser = async () => {
      setIsFetching(true)
      
      const {data, error} = await apiClient.fetchUserFromToken()      
      if (error) {
        setError(error)
      }
      if (data?.user) {
        setUser(data.user)        
      } else {
        setError("Error fetching user.")
      }      
      setIsFetching(false)
    }

    const token = localStorage.getItem(apiClient.getTokenKey())    
    if (token) {
      apiClient.setToken(token)
      fetchAuthedUser()
    }
    
  }, [])
  const handleLogout = async () => {    
    await apiClient.logOutUser()
    setUser(null)
    setOrders([])    
    setError(null)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                error={error}
                products={products}
                isFetching={isFetching}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
                addToCart={handleOnAddToCart}
                removeFromCart={handleOnRemoveFromCart}
                getQuantityOfItemInCart={handleGetItemQuantity}
                handleLogout={handleLogout}  
                searchProduct={handleOnProductSearch}              
              />
            }
          />             
          <Route path="/store/:productId" element={  
            <ProductDetail 
              user={user}               
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchInputValue={searchInputValue}
              handleOnSearchInputChange={handleOnSearchInputChange}
              addToCart={handleOnAddToCart}
              removeFromCart={handleOnRemoveFromCart}
              getQuantityOfItemInCart={handleGetItemQuantity}
              handleLogout={handleLogout}
              searchProduct={handleOnProductSearch}
            />
          } />          
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Register user={user} setUser={setUser} />} />
          <Route
            path="/orders"
            element={
              <Orders
                user={user}
                error={error}                
                setUser={setUser}
                products={products}
                orders={orders}
                setOrders = {setOrders}
                isFetching={isFetching}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
                handleLogout={handleLogout}
                searchProduct={handleOnProductSearch}
              />
            }
          />
          <Route
            path="/shopping-cart"
            element={
              <ShoppingCart
                user={user}
                cart={cart}
                error={error}
                setUser={setUser}
                products={products}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
                addToCart={handleOnAddToCart}
                removeFromCart={handleOnRemoveFromCart}
                getQuantityOfItemInCart={handleGetItemQuantity}
                getTotalItemsInCart={handleGetTotalCartItems}
                isCheckingOut={isCheckingOut}
                handleOnCheckout={handleOnCheckout}
                handleLogout={handleLogout}
                searchProduct={handleOnProductSearch}
              />
            }
          />
          <Route
            path="*"
            element={
              <NotFound
                user={user}
                error={error}
                products={products}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
                handleLogout={handleLogout}
                searchProduct={handleOnProductSearch}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
