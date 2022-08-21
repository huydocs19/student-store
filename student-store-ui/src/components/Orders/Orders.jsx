import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import { Footer, NavBar } from "components"
import { formatPrice } from "../../utils/format"
import {
  calculateOrderSubtotal,
  calculateItemSubtotal,
  calculateTaxesAndFees,
  calculateTotal,
} from "../../utils/calculations"
import "./Orders.css"

const groupOrderDetailsByOrderId = (orderDetails) => {
  // get an array of unique order ids
  const orderIds = [...new Set(orderDetails.map((d) => d.orderId))]

  return orderIds.reduce((acc, orderId) => {
    acc[orderId] = orderDetails.filter((d) => d.orderId === orderId)
    return acc
  }, {})
}

export default function Orders({
  user,  
  orders,
  setOrders,
  handleLogout, 
}) {    
  const [isFetching, setIsFetching] = useState(false)
  const [hasOrders, setHasOrders] = useState(false)  
  useEffect(() => {
    const fetchOrders = async () => {
      setIsFetching(true)      
      const {data} = await apiClient.fetchOrderList()     
      
      if (data?.orders && data.orders.length > 1) { 
        const ordersMapping = groupOrderDetailsByOrderId(data.orders) 
        setHasOrders(Boolean(Object.keys(orders)?.length))
        setOrders(ordersMapping)    
      } 
      setIsFetching(false)
    }
    const token = localStorage.getItem(apiClient.getTokenKey())    
    if (token) {
      apiClient.setToken(token)
      if (!orders || orders.length < 1) {
        fetchOrders()
      }      
    }
    
  }, [orders, setOrders])
  

  return (
    <div className="orders">
      <NavBar user={user} handleLogout={handleLogout}/>      
      <div className="banner">
        <div className="content">
          <h2>Orders</h2>
        </div>
      </div>

      <div className="content">
      {isFetching ? 
          <div className="card">
            <p>Loading...</p>
          </div>:
        <div className="order-list">
          <div className="order-list-header">
            <span>Order</span>
            <span className="flex-2">Name</span>
            <span className="center">Quantity</span>
            <span className="center">Unit Price</span>
            <span className="center">Cost</span>
          </div>

          {Object.keys(orders)?.map((orderId) => (
            <OrderItem key={orderId} orderId={orderId} orderItems={orders[orderId]} />
          ))}

          {!hasOrders ? (
            <div className="order-item">
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : null}
        </div>
      }
      </div>

      <Footer />
    </div>
  )
}

const OrderItem = ({ orderItems, orderId }) => {
  const subTotal = calculateOrderSubtotal(orderItems)

  return (
    <div className="order-item" key={orderId}>
      <h3>Order #{orderId}</h3>
      <div className="order-details">
        {orderItems.map((item) => (
          <div key={`${orderId}-${item.name}`} className="line-item">
            <span className="flex-2">{item.name}</span>
            <span className="center">{item.quantity}</span>
            <span className="center">{formatPrice(item.price)}</span>
            <span className="center">{formatPrice(calculateItemSubtotal(item.price, item.quantity))}</span>
          </div>
        ))}
        <div className="receipt">
          <div className="receipt-subtotal">
            <span className="label">Subtotal</span>
            <span />
            <span />
            <span className="center">{formatPrice(subTotal)}</span>
          </div>
          <div className="receipt-taxes">
            <span className="label">Taxes and Fees</span>
            <span />
            <span />
            <span className="center">{formatPrice(calculateTaxesAndFees(subTotal))}</span>
          </div>
          <div className="receipt-total">
            <span className="label">Total</span>
            <span />
            <span />
            <span className="center">{formatPrice(calculateTotal(subTotal))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}