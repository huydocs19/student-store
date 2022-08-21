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

import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart, removeCartToken, getCartFromToken } from "../../utils/cart"
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
  const [isOpen, setIsOpen] = useState(false)

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
      removeCartToken()
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
  useEffect(() => {
    const localCart = getCartFromToken()
    if (localCart && Object.keys(localCart).length > 0) {      
      setCart(localCart)
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
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isCheckingOut={isCheckingOut}
                products={products}
                isFetching={isFetching}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
                cart={cart}
                addToCart={handleOnAddToCart}
                removeFromCart={handleOnRemoveFromCart}
                getQuantityOfItemInCart={handleGetItemQuantity}
                handleLogout={handleLogout}  
                searchProduct={handleOnProductSearch}  
                handleOnCheckout={handleOnCheckout}            
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
                orders={orders}
                setOrders = {setOrders}                
                handleLogout={handleLogout}                
              />
            }
          />          
          <Route
            path="/shopping-cart"
            element={
              <ShoppingCart
                user={user}
                cart={cart}
                setCart={setCart}   
                addToCart={handleOnAddToCart}
                removeFromCart={handleOnRemoveFromCart}
                isCheckingOut={isCheckingOut}
                getQuantityOfItemInCart={handleGetItemQuantity}
                getTotalItemsInCart={handleGetTotalCartItems}                
                handleOnCheckout={handleOnCheckout}
                handleLogout={handleLogout}                
              />
            }
          />
          <Route
            path="*"
            element={
              <NotFound
                user={user}                
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
