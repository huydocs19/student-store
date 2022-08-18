import * as React from "react"
import axios from "axios";
import "./OrderDetail.css"
import { useParams } from "react-router-dom";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export default function OrderDetail(props) { 
    const [isLoading, setIsLoading] = React.useState(false)
    const [order, setOrder] = React.useState([])  
    const [error, setError] = React.useState({type: "", message: ""})
    const {orderId} = useParams()
    React.useEffect(() => {    
        const fetchOrderById = async () => {
          setIsLoading(true)
          axios.get(`http://localhost:3001/store/orders/${orderId}`)
            .then(function (response) {
              const order = response?.data?.order                      
              if (order) {
                setOrder(order)   
                setError({type: "", message: ""})
              } else {
                setError({type: "NO_ORDERS_ERROR", message: "Order is not available"})
              }
              setIsLoading(false)          
          }).catch(function (error) {        
            setError({type: "NO_ORDERS_ERROR", message: "Order is not available"})
            setIsLoading(false)
          })
        }    
        fetchOrderById() 
      }, [orderId]); 
    return (
        <div className="order-detail">
            {isLoading?<h1>Loading...</h1>: 
                error.type === "NO_ORDERS_ERROR"? <h2 className="error">{error.message}</h2>:
                <OrderDetailTable order={order}/>
            }
        </div>
    )
}
export function OrderDetailTable(props) {   
    let subTotal = 0 
    return (
      <div className="cart-table">
        <h1 className="order-id">Order #{props.order?.id}</h1>
        <div className="header">            
          <div className="header-row">
              <span className="flex-2">Name</span>
              <span className="center">Quantity</span>
              <span className="center">Unit Price</span>
              <span className="center">Cost</span>
          </div>
          {props.order?.receipt?.productRows?.map((item, idx) => { 
            subTotal += item.totalPrice
            return (

              <div className="product-row" key={idx}>                
                  <span className="flex-2 cart-product-name">{item.name}</span>
                  <span className="center cart-product-quantity">{item.quantity}</span>
                  <span className="center cart-product-price">{formatter.format(item.price)}</span>
                  <span className="center cart-product-subtotal">{formatter.format(item.totalPrice)}</span>
              </div>
          )})}
        </div>
        <div className="receipt">
              <div className="receipt-subtotal">
                  <span className="label">Subtotal</span>
                  <span></span><span></span>
                  <span className="center subtotal">{formatter.format(subTotal)}</span>
                  </div>
              <div className="receipt-taxes">
                  <span className="label">Taxes and Fees</span>
                  <span></span><span></span>
                  <span className="center">{formatter.format(subTotal * 0.0875)}</span>
              </div>
              <div className="receipt-total">
                  <span className="label">Total</span>
                  <span></span><span></span>
                  <span className="center total-price">{formatter.format(props.order?.total)}</span>
              </div>
          </div>
      </div>
    )
  }