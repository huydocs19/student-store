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
} from "components"
import "./Home.css"

export default function Home({
  user,
  isFetching,
  products,
  activeCategory,
  setActiveCategory,
  handleOnSearchInputChange,
  searchInputValue,
  addToCart,
  removeFromCart,
  getQuantityOfItemInCart,
  handleLogout,  
  searchProduct,
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