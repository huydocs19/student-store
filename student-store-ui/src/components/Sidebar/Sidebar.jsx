import { SidebarShoppingCart } from "components"
import "./Sidebar.css"

export default function Sidebar({
  user,
  products,
  cart,     
  isOpen, 
  setIsOpen,
  getQuantityOfItemInCart,
  handleOnCheckout,
}) {
  return (
    <section className={`sidebar ${isOpen ? "open": "closed"}`}>
      <div className="wrapper">
        <button className={`toggle-button button ${isOpen ? "open": "closed"}`} onClick={() => setIsOpen(!isOpen)}>
          <i className="material-icons md-48">arrow_forward</i>
        </button>
        <SidebarShoppingCart user={user} products={products} isOpen={isOpen} setIsOpen={setIsOpen} cart={cart} getQuantityOfItemInCart={getQuantityOfItemInCart} handleOnCheckout={handleOnCheckout}/>
      </div>
    </section>
  )
}
