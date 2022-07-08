import * as React from "react"

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export default function CartTable(props) {
  const tax = props.shoppingCart.totalPrice * 0.875 
  return (
    <div className="cart-table">
      <div className="header">
        <div className="header-row">
            <span className="flex-2">Name</span>
            <span className="center">Quantity</span>
            <span className="center">Unit Price</span>
            <span className="center">Cost</span>
        </div>
        {props.shoppingCart.products.map((item, idx) => {
          let product = props.products.find(element => element.id == item.itemId)          
          return (            
            <div className="product-row" key={idx}>                
                <span className="flex-2 cart-product-name">{product.name}</span>
                <span className="center cart-product-quantity">{item.quantity}</span>
                <span className="center cart-product-price">{formatter.format(product.price)}</span>
                <span className="center cart-product-subtotal">{formatter.format(product.price * item.quantity)}</span>
            </div>
        )})}
      </div>
      <div className="receipt">
            <div className="receipt-subtotal">
                <span className="label">Subtotal</span>
                <span></span><span></span>
                <span className="center subtotal">{formatter.format(props.shoppingCart.totalPrice)}</span>
                </div>
            <div className="receipt-taxes">
                <span className="label">Taxes and Fees</span>
                <span></span><span></span>
                <span className="center">{formatter.format(tax)}</span>
            </div>
            <div className="receipt-total">
                <span className="label">Total</span>
                <span></span><span></span>
                <span className="center total-price">{formatter.format(props.shoppingCart.totalPrice + tax)}</span>
            </div>
        </div>
    </div>
  )
}