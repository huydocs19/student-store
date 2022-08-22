import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
import { Footer, NavBar } from "components"
import codepath from "../../assets/codepath.svg"
import { formatPrice } from "../../utils/format"
import { calculateItemSubtotal, calculateTaxesAndFees, calculateTotal } from "../../utils/calculations"
import "./ShoppingCart.css"

export default function ShoppingCart({
  user, 
  cart,  
  getTotalItemsInCart, 
  addToCart,
  removeFromCart,
  deleteFromCart,
  getQuantityOfItemInCart,
  handleLogout,
  handleOnCheckout,  
}) {
  const [cartMapping, setCartMapping] = useState({}) 
  const [isFetching, setIsFetching] = useState(false)
  const [subTotal, setSubTotal] = useState(0)
  const navigate = useNavigate() 
  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true)

      const {data} = await apiClient.fetchProductList()  
      if (data?.products) { 
        const pMapping = data.products.reduce((acc, product) => {
          acc[product.id] = product
          return acc
        }, {})        
        const cMapping = Object.keys(cart).reduce((acc, id) => {
          acc[id] = pMapping[id]
          return acc
        }, {})
        const total = Object.values(cMapping).reduce((acc, product) => {    
          return acc + calculateItemSubtotal(product.price, getQuantityOfItemInCart(product))
        }, 0)
        setCartMapping(cMapping)  
        setSubTotal(total)       
      } 
      setIsFetching(false)
    }    
    fetchProducts()
  }, [cart, getQuantityOfItemInCart])
  
  const onCheckoutSubmit = async () => {
    const order = await handleOnCheckout()
    if (order) {
      navigate("/orders")
    }
  }

  const cartHasItems = Boolean(Object.keys(cartMapping).length)

  return (
    <div className="shopping-cart">
      <NavBar user={user} handleLogout={handleLogout}/>      
      <div className="banner">
        <div className="content">
          <h2>Cart - ({getTotalItemsInCart()}) items</h2>
        </div>
      </div>

      <div className="content">
        <div className="cart-items"> 
        {isFetching ? 
          <div className="card">
            <p>Loading...</p>
          </div>:
          <div className="items-list">
            {!cartHasItems ? (
              <div className="card">
                <p>Nothing in your cart yet.</p>
              </div>
            ) : null}
            {Object.values(cartMapping).map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={getQuantityOfItemInCart(product)}
                addToCart={() => addToCart(product)}
                removeFromCart={() => removeFromCart(product)}
                deleteFromCart={() => deleteFromCart(product)}
              />
            ))}
          </div>    
        }
        </div>

        {cartHasItems ? (
          <div className="receipt">
            <div className="receipt-subtotal">
              <span className="label">Subtotal</span>
              <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="receipt-taxes">
              <span className="label">Taxes and Fees</span>
              <span>{formatPrice(calculateTaxesAndFees(subTotal))}</span>
            </div>
            <div className="receipt-total">
              <span className="label">Total</span>
              <span>{formatPrice(calculateTotal(subTotal))}</span>
            </div>
          </div>
        ) : null}

        <div className="checkout">
          {user?.email ? (
            <button onClick={onCheckoutSubmit}>Checkout</button>
          ) : (
            <button className="is-disabled" disabled>
              Sign In To Checkout
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

const CartItem = ({ product, quantity, addToCart, removeFromCart, deleteFromCart }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <div className="item">
          <img className="image" src={product.image || codepath} alt="product cover" />
          <div className="name-and-price">
            <p className="name">{product.name}</p>
            <p className="price">{formatPrice(product.price)}</p>
          </div>

          <div className="actions">
            <div className="buttons">
              <button onClick={addToCart}>
                <i className="material-icons">add</i>
              </button>
              <span>{quantity}</span>
              <button onClick={removeFromCart}>
                <i className="material-icons">remove</i>
              </button>
            </div>

            <div className="trash">
              <button onClick={deleteFromCart}>
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="item-subtotals">
        <div className="subtotals">
          <span>{formatPrice(quantity * product.price)}</span>
        </div>
      </div>
    </div>
  )
}