import { useNavigate } from "react-router-dom"
import { formatPrice } from "../../utils/format"
import { calculateItemSubtotal, calculateTaxesAndFees, calculateTotal} from "../../utils/calculations"

export default function CartTable({
  user, 
  isCheckingOut,
  errors,
  products, 
  cart, 
  getQuantityOfItemInCart,
  handleOnCheckout
}) {
  const navigate = useNavigate()

  const productMapping = products.reduce((acc, product) => {
    acc[product.id] = product
    return acc
  }, {})

  const cartMapping = Object.keys(cart).reduce((acc, id) => {
    acc[id] = productMapping[id]
    return acc
  }, {})

  const subTotal = Object.values(cartMapping).reduce((acc, product) => {
    return acc + calculateItemSubtotal(product.price, getQuantityOfItemInCart(product))
  }, 0)

  const onCheckoutSubmit = async () => {
    const order = await handleOnCheckout()
    if (order) {
      navigate("/orders")
    }
  }

  const cartHasItems = Boolean(Object.keys(cartMapping).length)
  return (
    <div className="cart-table">
      <div className="header">
        <div className="header-row">
            <span className="flex-2">Name</span>
            <span className="center">Quantity</span>
            <span className="center">Unit Price</span>
            <span className="center">Cost</span>
        </div>
        {!cartHasItems ? (
              <div className="card">
                <p>Nothing in your cart yet.</p>
              </div>
            ) : null}
            {Object.values(cartMapping).map((product, idx) => {
              let quantity = getQuantityOfItemInCart(product) 
              return (
              <div className="product-row" key={idx}>                
              <span className="flex-2 cart-product-name">{product.name}</span>
              <span className="center cart-product-quantity">{quantity}</span>
              <span className="center cart-product-price">{formatPrice(product.price)}</span>
              <span className="center cart-product-subtotal">{formatPrice(product.price * quantity)}</span>
          </div>
            )})}        
      </div>
      {cartHasItems ? (
          <div className="receipt">
            <div className="receipt-subtotal">
              <span className="label">Subtotal</span>
              <span className="center subtotal">{formatPrice(subTotal)}</span>
            </div>
            <div className="receipt-taxes">
              <span className="label">Taxes and Fees</span>
              <span className="center">{formatPrice(calculateTaxesAndFees(subTotal))}</span>
            </div>
            <div className="receipt-total">
              <span className="label">Total</span>
              <span className="center total-price">{formatPrice(calculateTotal(subTotal))}</span>
            </div>
          </div>
        ) : null}

        {errors.checkout && <span className="error">Error: {errors.checkout}</span>}
        <div className="checkout">
          {user?.email ? (
            <button onClick={onCheckoutSubmit}>{isCheckingOut? "Checking out...": "Checkout"}</button>
          ) : (
            <button className="is-disabled" disabled>
              Sign In To Checkout
            </button>
          )}
        </div>      
    </div>
  )
}