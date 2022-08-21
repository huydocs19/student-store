export default function Cart({setIsOpen}) {
  return (
    <div className="cart-icons">
        <span className="cart-icon icon button" onClick={() => setIsOpen(true)}>
            <i className="material-icons md-48">add_shopping_cart</i>
        </span>        
    </div>
  )
}