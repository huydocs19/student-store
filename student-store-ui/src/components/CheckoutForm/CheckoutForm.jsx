import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm(props) {
  return (
    <div className="checkout-form">
        <h3>Payment Info <span className="button"><i className="material-icons md-48">monetization_on</i></span>
        </h3>
        <div className="input-field">
            <label className="label">Name</label>
            <div className="control ">
                <input name="name" className="checkout-form-input" type="text" placeholder="Student Name" value={props.checkoutForm.name} onChange={(event) => props.onCheckoutFormChange(event.target.name, event.target.value)}/>
            </div>
        </div>
        <div className="input-field">
            <label className="label">Email</label>
            <div className="control">
                <input name="email" className="checkout-form-input" type="email" placeholder="student@codepath.org" value={props.checkoutForm.email} onChange={(event) => props.onCheckoutFormChange(event.target.name, event.target.value)}/>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="checkbox">
                    <input name="termsAndConditions" type="checkbox"/><span className="label">I agree to the <a href="#terms-and-conditions">terms and conditions</a></span>
                </label>
            </div>
        </div>
        <p className="is-danger">{(props.error.type == "NO_CART_ERROR" || props.error.type == "NO_USER_INFO_ERROR") && props.error.message}</p>
        <div className="field">
            <div className="control">
                <button className="button checkout-button" onClick={props.onSubmitCheckoutForm}>Checkout</button>
            </div>
        </div>
    </div>
  )
}