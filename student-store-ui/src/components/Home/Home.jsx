import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  SubNavBar,
  Hero,
  ProductGrid,
  About,
  Contact,
  Footer,
  NavBar,
  Sidebar,  
} from "components"
import "./Home.css"

export default function Home({
  user,
  errors,
  updateProduct,
  isFetching,
  isCheckingOut,
  isOpen,
  setIsOpen,
  products,
  activeCategory,
  setActiveCategory,
  handleOnSearchInputChange,
  searchInputValue,
  cart,
  addToCart,
  removeFromCart,
  getQuantityOfItemInCart,
  handleLogout,  
  searchProduct,
  handleOnCheckout,
}) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [location.hash])  

  return (
    <div className="Home">  
      <Sidebar user={user} 
      errors={errors}
      products={products} 
      cart={cart}       
      isOpen={isOpen}
      isCheckingOut={isCheckingOut} 
      setIsOpen={setIsOpen}
      getQuantityOfItemInCart={getQuantityOfItemInCart}
      handleOnCheckout={handleOnCheckout}/>    
     
      <NavBar user={user} handleLogout={handleLogout}/>
      <Hero />
      <SubNavBar        
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        handleOnSearchInputChange={handleOnSearchInputChange}
        searchInputValue={searchInputValue}        
        searchProduct={searchProduct}
      />            
      <ProductGrid
        user={user}
        errors={errors}
        updateProduct = {updateProduct}
        products={products}
        isFetching={isFetching}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getQuantityOfItemInCart={getQuantityOfItemInCart}
      />
      <About />
      <Contact />
      <Footer />
      
    </div>
  )
}