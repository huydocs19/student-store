import * as React from "react"
import CartTable from "../CardTable/CartTable"
import CheckoutForm from "../CheckoutForm/CheckoutForm"

export default function ShoppingCart(props) {
  return (
    <div className="shopping-cart">
        <div className="open">
            <h3>
                Shopping Cart <span className="button"><i className="material-icons md-48">add_shopping_cart</i></span>
            </h3>
            {props.shoppingCart.length > 0 ? <CartTable />: <div className="notification"><p>No items added to cart yet. Start shopping now!</p></div>}
            <CheckoutForm checkoutForm={props.checkoutForm} onCheckoutFormChange={props.onCheckoutFormChange} onSubmitCheckoutForm={props.onSubmitCheckoutForm}/>
        </div>
    </div>
  )
}