import * as React from "react"
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

export default function App() {
  const [products, setProducts] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = userState("")
  const [isOpen, setIsOpen] = useState(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [checkoutForm, setCheckoutForm] = useState({})
  return (
    <div className="app">      
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>             
        </main>
      </BrowserRouter>
    </div>
  )
}
