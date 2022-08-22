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

import { deleteFromCart, removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart, removeCartToken, getCartFromToken } from "../../utils/cart"
import "./App.css"

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [searchInputValue, setSearchInputValue] = useState("")
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [errors, setErrors] = useState({}) 
  const [isOpen, setIsOpen] = useState(false)

  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item))
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item))
  const handleOnDeleteFromCart = (item) => setCart(deleteFromCart(cart, item))
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item)
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart)

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value)
  }

  const handleOnCheckout = async () => {
    setIsCheckingOut(true)

    const {data, error} = await apiClient.createOrder({ order: cart })
    if (error) {
      setErrors((e) => ({ ...e, checkout: error }))
    }    
    if (data?.order) {     
      setOrders((o) => [...data.order, ...o]) 
      setIsCheckingOut(false)
      setIsOpen(false)
      setCart({})
      removeCartToken()
      return data.order    
    } else {
      setErrors((e) => ({ ...e, checkout: "Error checking out."}))
    }
    setIsCheckingOut(false)    
  }
  const handleOnProductSearch = () => { 
    const fetchProductsBySearchInputValue = async () => {
      setIsFetching(true)

      const {data, error} = await apiClient.fetchProductList()      
      if (error) {
        setErrors((e) => ({ ...e, productSearch: error }))
      }
      if (data?.products) {             
        const filteredProducts = data.products.filter(product => product.name.toLowerCase().includes(searchInputValue.toLowerCase())) 
        setProducts(filteredProducts)
        setActiveCategory("")    
      } else {
        setErrors((e) => ({ ...e, productSearch: "Error fetching products." }))
      }
      setIsFetching(false)
      setSearchInputValue("")
    }
    fetchProductsBySearchInputValue()    
  }
  const updateProduct = ({ productId, productUpdate }) => {
    setProducts((oldProducts) => {
      return oldProducts.map((product) => {
        if (product.id === Number(productId)) {
          return { ...product, ...productUpdate }
        }

        return product
      })
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true)

      const {data, error} = await apiClient.fetchProductList()      
      if (error) {
        setErrors((e) => ({ ...e, products: error }))
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
        setErrors((e) => ({ ...e, products: "Error fetching products." }))
      }
      setIsFetching(false)
    }   
    if (activeCategory) {
      fetchProducts()
    }     
  }, [activeCategory])
  useEffect(() => {
    const fetchAuthedUser = async () => {
      setIsFetching(true)
      
      const {data, error} = await apiClient.fetchUserFromToken()      
      if (error) {
        setErrors((e) => ({ ...e, user: error }))
      }
      if (data?.user) {
        setUser(data.user)        
      } else {
        setErrors((e) => ({ ...e, user: "Error fetching user." }))
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
    const fetchOrders = async () => {
      setIsFetching(true)      
      const {data, error} = await apiClient.fetchOrderList()     
      if (error) {
        setErrors((e) => ({ ...e, orders: error }))
      }
      if (data?.orders) {         
        setOrders(data.orders)    
      } else {
        setErrors((e) => ({ ...e, orders: "Error fetching orders." }))
      }
      setIsFetching(false)
    }       
    if (user?.username) { 
      fetchOrders()
    }
    
  }, [user])
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
    setErrors({})
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
                updateProduct={updateProduct}
                errors={errors}
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
              updateProduct = {updateProduct}                
              addToCart={handleOnAddToCart}
              removeFromCart={handleOnRemoveFromCart}
              getQuantityOfItemInCart={handleGetItemQuantity}
              handleLogout={handleLogout}              
            />
          } />          
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Register user={user} setUser={setUser} />} />
          <Route
            path="/orders"
            element={
              <Orders
                user={user} 
                isFetching={isFetching} 
                errors={errors}              
                orders={orders}                            
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
                addToCart={handleOnAddToCart}
                removeFromCart={handleOnRemoveFromCart}
                deleteFromCart={handleOnDeleteFromCart}
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
              <NotFound/>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
