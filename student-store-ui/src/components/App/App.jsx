import * as React from "react"
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import "./App.css"

const baseURL = "https://codepath-store-api.herokuapp.com/store";
export default function App() {
  const [products, setProducts] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [shoppingCart, setShoppingCart] = React.useState({totalPrice: 0, products: []})
  const [checkoutForm, setCheckoutForm] = React.useState({studentName: "", studentEmail: ""})

  React.useEffect(() => {
    axios.get(baseURL)
    .then((response) => {        
      if (!response.data || response.data.products.length == 0) {
        setError("No Products To Display")
      } else {
        setProducts(response.data.products);
          
      }      
    })
    .catch(function (error) {
      setError("No Products To Display")
    });
  }, []);
  const handleOnToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleAddItemToCart = (productId) => {    
    const product = products.find(item => item.itemId == productId)
    if (product) {
      const item = shoppingCart.products.find(item => item.itemId == productId)
      const newTotalPrice = shoppingCart.totalPrice + product.price
      if (item) {      
        const updatedProducts = shoppingCart.products.map(item => {          
          if (item.itemId == productId) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        })        
        setShoppingCart({totalPrice: newTotalPrice, products: updatedProducts})     
        
      } else {        
        const newItem = {
          itemId: productId,
          name: product.name,
          price: product.price,
          quantity: 1
        }
        const newProducts = [...shoppingCart.products, newItem]
        setShoppingCart({totalPrice: newTotalPrice, products: newProducts})
      }
    }
  }
  const handleRemoveItemFromCart = (productId) => {
    const product = products.find(item => item.itemId == productId)
    if (product) {
      const item = shoppingCart.products.find(item => item.itemId == productId)      
      if (item) {
        const newTotalPrice = shoppingCart.totalPrice - product.price      
        let updatedProducts
        if (item.quantity <= 1) {
          updatedProducts = shoppingCart.products.filter(item => item.itemId != productId)
        } else {
          updatedProducts = shoppingCart.products.map(item => {          
            if (item.itemId == productId) {
              return {...item, quantity: item.quantity - 1}
            }
            return item
          })        
        }
        
        setShoppingCart({totalPrice: newTotalPrice, products: updatedProducts})     
        
      }
    }
  }
  const handleOnCheckoutFormChange = (name, value) => {
    setCheckoutForm({...checkoutForm, [name]: value})
  }
  const handleOnSubmitCheckoutForm = () => {
    axios.post('/store', {
      user: {
        name: checkoutForm.studentName,
        email: checkoutForm.studentEmail
      },
      shoppingCart: shoppingCart.products
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      setError("Cannot Submit Your Information")
    });
  }
  

  return (
    <div className="app">      
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Navbar />
          <Sidebar onToggle={handleOnToggle}/>
          <Routes>
            <Route path="/" element={<Home products={products} addItemToCart={handleAddItemToCart} removeItemFromCart={handleRemoveItemFromCart}/>} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>             
        </main>
      </BrowserRouter>
    </div>
  )
}
