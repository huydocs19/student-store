import * as React from "react"
import "./CheckoutInfo.css"

export default function CheckoutInfo(props) {
  const exitCheckoutInfo = () => {
    props.setReceiptLines([])
    if (props.error?.type == "FORM_SUBMIT_ERROR") {
      props.setError({type: "", message:""})
    }
  }
  return (
    <div className="checkout-success">
      <h3>
        Checkout Info <span className="icon button"><i className="material-icons md-48">fact_check</i></span>
      </h3>
      {props.error?.type == "FORM_SUBMIT_ERROR" || props.error?.type == "NO_RECEIPT_ERROR"?
        <p className="is-danger">{props.error?.message}</p>:
        props.receiptLines?.length > 0 ? 
          <div className="card">
            <header className="card-head">
              <h4 className="card-title">Receipt</h4>
            </header>
            <section className="card-body">
              <p className="header">{props.receiptLines[0]}</p>
              <ul className="purchase">
                {props.receiptLines?.map((line, idx) => (                  
                  idx > 0 && <li key={idx}>{line}</li>
                ))}
              </ul>
            </section>
            <footer className="card-foot">
              <button className="button is-success" onClick={() => {
                props.setIsOpen(false)
                exitCheckoutInfo()
              }}>Shop More</button>
              <button className="button" onClick={exitCheckoutInfo}>Exit</button>
            </footer>
          </div>:
          <div className="content">
            <p>A confirmation email will be sent to you so that you can confirm this order. Once you have confirmed the
    order, it will be delivered to your dorm room.</p>
          </div>
      }
      
      
    </div>
  )
}