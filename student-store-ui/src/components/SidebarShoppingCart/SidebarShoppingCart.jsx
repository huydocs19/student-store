import {Cart, CartTable} from "components"
import "./SidebarShoppingCart.css"

export default function SidebarShoppingCart({
    user,
    products,
    cart,     
    isOpen, 
    setIsOpen,
    getQuantityOfItemInCart,
    handleOnCheckout,
}) {
    const cartHasItems = Boolean(Object.keys(cart).length)
    return (
      <div className="sidebar-shopping-cart">
          {isOpen ?
            <div className="open">
              <h3>
                  Shopping Cart <span className="button"><i className="material-icons md-48">add_shopping_cart</i></span>
              </h3>            
              {cartHasItems ? 
              <CartTable 
              user={user} products={products} cart={cart} getQuantityOfItemInCart={getQuantityOfItemInCart} handleOnCheckout={handleOnCheckout}
              />: 
              <div className="notification">No items added to cart yet. Start shopping now!</div>
              }              
            </div> : 
            <Cart setIsOpen={setIsOpen}/>
          }
         
      </div>
    )
  }