import {ProductCard} from "components"
import "./ProductGrid.css"

export default function ProductGrid({ 
   user,
   errors,
   updateProduct,
   isFetching,
   addToCart, 
   removeFromCart, 
   getQuantityOfItemInCart, 
   products = [] 
  }) {
  return (
    <div id="Buy" className="product-grid">
      <div className="content">
        <h3>Best Selling Products</h3>
        {isFetching ? 
          <div className="card">
            <p>Loading...</p>
          </div>:
          errors.user? <span className="error">{errors.user}</span>:
          errors.products? <span className="error">{errors.products}</span>:
          errors.productSearch? <span className="error">{errors.productSearch}</span>:
          <div className="grid">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                user={user}
                updateProduct={updateProduct}
                product={product}
                quantity={getQuantityOfItemInCart(product)}
                addToCart={() => addToCart(product)}
                removeFromCart={() => removeFromCart(product)}
                showDescription={false}
              />
            ))}
            {!products?.length ? (
              <div className="card">
                <p>No products available</p>
              </div>
            ) : null}
          </div>
      }
        
      </div>
    </div>
  )
}