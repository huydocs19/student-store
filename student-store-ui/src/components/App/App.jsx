import * as React from "react"
import axios from "axios"
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import Hero from "../Hero/Hero"
import SubNavBar from "../SubNavBar/SubNavBar"
import Orders from "../Orders/Orders"
import "./App.css"
import OrderDetail from "../OrderDetail/OrderDetail"

const baseURL = "http://localhost:3001/store";
export default function App() {
  const [products, setProducts] = React.useState([])
  const [allProducts, setAllProducts] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState({type: "", message:""})
  const [isOpen, setIsOpen] = React.useState(false)
  const [shoppingCart, setShoppingCart] = React.useState({totalPrice: 0, products: []})
  const [checkoutForm, setCheckoutForm] = React.useState({name: "", email: ""})
  const [receiptLines, setReceiptLines] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState("")  
  React.useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true) 
      axios.get(baseURL)
      .then((response) => {               
          if (response?.data?.products?.length > 0) {
            setProducts(response.data.products)
            setAllProducts(response.data.products) 
            setError({type: "", message:""})        
          } else {
            setError({type: "NO_PRODUCTS_ERROR", message:"No Products Available"})
          }
          setIsFetching(false)         
        })
        .catch(function (error) {
          setError({type: "NO_PRODUCTS_ERROR", message:"No Products Available"})
          setIsFetching(false)
        });
    }
    fetchProducts()
  }, []);

  const handleOnToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleAddItemToCart = (productId) => {    
    const product = products.find(element => element.id === productId)     
    if (product) {
      const item = shoppingCart.products?.find(element => element.itemId === productId)
      const newTotalPrice = shoppingCart.totalPrice + product.price  
      if (item) {      
        const updatedProducts = shoppingCart.products?.map(element => {          
          if (element.itemId === productId) {
            return {...element, quantity: element.quantity + 1}
          }
          return element
        })        
        setShoppingCart({totalPrice: newTotalPrice, products: updatedProducts})     
        
      } else {        
        const newItem = {
          itemId: productId,          
          quantity: 1
        }
        const newProducts = [...shoppingCart.products, newItem]
        setShoppingCart({totalPrice: newTotalPrice, products: newProducts})        
      }
     
    }
  }
  const handleRemoveItemFromCart = (productId) => {
    const product = products.find(element => element.id === productId)
    if (product) {
      const item = shoppingCart.products?.find(element=> element.itemId === productId)      
      if (item) {
        const newTotalPrice = shoppingCart.totalPrice - product.price      
        let updatedProducts
        if (item.quantity <= 1) {
          updatedProducts = shoppingCart.products?.filter(element => element.itemId !== productId)
        } else {
          updatedProducts = shoppingCart.products?.map(element => {          
            if (element.itemId === productId) {
              return {...element, quantity: element.quantity - 1}
            }
            return element
          })        
        }
        
        setShoppingCart({totalPrice: newTotalPrice, products: updatedProducts})     
        
      }
    }
  }
  const handleOnCheckoutFormChange = (name, value) => {
    setCheckoutForm({...checkoutForm, [name]: value})
  }
  const handleOnSubmitCheckoutForm = (event) => {    
    if (!shoppingCart.products || shoppingCart.products.length < 1) {      
      setError({type: "NO_CART_ERROR", message:"No cart or items in cart found to checkout."})
    } else if (!checkoutForm.name || !checkoutForm.email) {
      
      setError({type: "NO_USER_INFO_ERROR", message:"User info must include an email and name."})
    } else {
      axios.post(baseURL, {
        user: {
          name: checkoutForm.name,
          email: checkoutForm.email
        },
        shoppingCart: shoppingCart.products
      }).then((response) => {        
        setShoppingCart({totalPrice: 0, products: []})
        setCheckoutForm({name: "", email: ""})
        if (error.type === "NO_CART_ERROR" || error.type === "NO_USER_INFO_ERROR") {
          setError({type: "", message:""})
        } 
        if (response?.data?.purchase?.receipt?.lines) {
          setReceiptLines(curr => response.data.purchase.receipt.lines)
          if (error.type === "NO_RECEIPT_ERROR") {
            setError({type: "", message:""})
          }       
        } else {
          setError({type: "NO_RECEIPT_ERROR", message:"No Receipt Available"})
        }
      }).catch(function (error) {
        setError({type: "FORM_SUBMIT_ERROR", message:"Cannot Submit Your Order"});
      });
    }
    
    
  }
  const handleCategoryChange = (category) => {
    if (category === "all") {      
      setProducts(allProducts)
      if (allProducts.length < 1) {
        setError({type: "NO_PRODUCTS_ERROR", message:"No Products Available"})
      } else if (error.type === "NO_PRODUCTS_ERROR") {
        setError({type: "", message:""})
      }
    } else {
      const updatedProducts = allProducts.filter(element => element.category === category)
      if (updatedProducts.length < 1) {
        setError({type: "NO_PRODUCTS_ERROR", message:"No Products Available"})
      } else if (error.type === "NO_PRODUCTS_ERROR") {
        setError({type: "", message:""})
      }
      setProducts(updatedProducts)
    }    
  }
  const handleProductSearch = () => {
    const updatedProducts = allProducts.filter(element => element.name.toLowerCase().includes(searchTerm.toLowerCase()))
    if (updatedProducts.length < 1) {
      setError({type: "NO_PRODUCTS_ERROR", message:"No Products Available"})
    } else if (error.type === "NO_PRODUCTS_ERROR") {
      setError({type: "", message:""})
    }
    setProducts(updatedProducts)
    setSearchTerm("")
  }
  const handleOnSearchTermChange = (text) => {
    setSearchTerm(text)
  }
  

  return (
    <div className="app">      
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}  
          <Sidebar setError={setError} setIsOpen={setIsOpen} setReceiptLines={setReceiptLines} error={error} receiptLines={receiptLines} products={products} checkoutForm={checkoutForm} shoppingCart={shoppingCart} isOpen={isOpen} onToggle={handleOnToggle} onCheckoutFormChange={handleOnCheckoutFormChange} onSubmitCheckoutForm={handleOnSubmitCheckoutForm} />
          <Navbar />          
          <Routes>
            <Route path="/" element={
              <div>
                <Hero/>
                <SubNavBar onToggle={handleOnToggle} searchTerm={searchTerm} onSearchTermChange={handleOnSearchTermChange} searchProduct={handleProductSearch} changeCategory={handleCategoryChange}/>               
                <Home error={error} isFetching={isFetching} shoppingCart={shoppingCart} products={products} addItemToCart={handleAddItemToCart} removeItemFromCart={handleRemoveItemFromCart}/>
              </div>            
            } />
            <Route path="/products/:productId" element={
              <div>
                <Hero/>
                <SubNavBar onToggle={handleOnToggle} searchTerm={searchTerm} onSearchTermChange={handleOnSearchTermChange} searchProduct={handleProductSearch} changeCategory={handleCategoryChange}/>
                <ProductDetail shoppingCart={shoppingCart} addItemToCart={handleAddItemToCart} removeItemFromCart={handleRemoveItemFromCart}/>
              </div>            
            } /> 
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            <Route path="*" element={<NotFound/>}/>          
          </Routes>                     
        </main>
      </BrowserRouter>
    </div>
  )
}
