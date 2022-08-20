import {NavBar, SubNavBar, Footer} from "components"
import "./NotFound.css"

export default function NotFound({ 
  user, 
  activeCategory,
  setActiveCategory,
  handleOnSearchInputChange,
  searchInputValue,
  handleLogout,  
  searchProduct,
}) {
  return (
    <div className="not-found">
      <NavBar user={user} handleLogout={handleLogout}/>
      <SubNavBar        
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        handleOnSearchInputChange={handleOnSearchInputChange}
        searchInputValue={searchInputValue}        
        searchProduct={searchProduct}
      />
      <div className="cta">
        <h1>404</h1>
        <p>That page does not exist</p>
      </div>

      <Footer />
    </div>
  )
}
