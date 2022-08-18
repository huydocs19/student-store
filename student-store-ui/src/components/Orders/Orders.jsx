import * as React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import "./Orders.css"

const dateFormatter = new Intl.DateTimeFormat("en-US", {})
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
export default function Orders() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [orders, setOrders] = React.useState([]) 
  const [searchTerm, setSearchTerm] = React.useState("") 
  const [error, setError] = React.useState({type: "", message: ""})
  const [filteredOrders, setFilteredOrders] = React.useState([])
  React.useEffect(() => {    
    const fetchOrders = async () => {
      setIsLoading(true)
      axios.get('http://localhost:3001/store/orders')
        .then(function (response) {
          const orders = response?.data?.purchases          
          if (orders) {
            setOrders(orders) 
            setFilteredOrders(orders)
            setError({type: "", message: ""})
          } else {
            setError({type: "NO_ORDERS_ERROR", message: "No orders available"})
          }
          setIsLoading(false)          
      }).catch(function (error) {        
        setError({type: "NO_ORDERS_ERROR", message: "No orders available"})
        setIsLoading(false)
      })
    }    
    fetchOrders()   
    
  }, []); 
  const handleOrderSearch = () => {
    const filterOrders = orders.filter(element => element.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filterOrders.length < 1) {
      setError({type: "NO_ORDERS_ERROR", message: "No orders available"})
    } else {
      setError({type: "", message: ""})
    }
    setFilteredOrders(filterOrders)
    setSearchTerm("")
  }
  const handleOnSearchTermChange = (text) => {
    setSearchTerm(text)
  } 
  return (
    <div className="orders">        
        {isLoading?<h1>Loading...</h1>: 
            error.type === "NO_ORDERS_ERROR"? <h2 className="error">{error.message}</h2>:
            <OrderTable orders={filteredOrders} searchTerm={searchTerm} searchOrder={handleOrderSearch} onSearchTermChange={handleOnSearchTermChange}/>
        }
    </div>
  )
}
export function OrderTable(props) {
    return ( 
        <div className="order-table">
            <div className="search-bar">
                    <input type="text" name="search" placeholder="Search Order By Email" value={props.searchTerm} onChange={(event) => props.onSearchTermChange(event.target?.value)}/>
                    <div onClick={props.searchOrder}><i className="material-icons">search</i></div>
            </div>
            <h2>Orders</h2>
            <div className="table">
                <div className="table-header table-row">
                    <span className="col x10">ID</span>
                    <span className="col x20">Name</span>
                    <span className="col x30">Email</span>
                    <span className="col x20">Total Cost</span>
                    <span className="col x20">Date</span>
                </div>
                {props.orders?.map((item, idx) => (
                <OrderRow order={item} key={idx}/>
                ))}
            </div> 
            
        </div>       
         
    )
}
export function OrderRow(props) {
    const formatDate = (date) => {
        const d = date ? new Date(date) : null
        return d instanceof Date ? dateFormatter.format(d) : ""
    }
    return ( 
        <Link className="table-row order-row" to={`/orders/${props.order?.id}`}>
            <span className="col x10">{props.order?.id}</span>
            <span className="col x20">{props.order?.name}</span>
            <span className="col x30">{props.order?.email}</span>
            <span className="col x20">{formatter.format(props.order?.total)}</span>
            <span className="col x20">{formatDate(props.order?.createdAt)}</span>
        </Link> 
         
    )
}