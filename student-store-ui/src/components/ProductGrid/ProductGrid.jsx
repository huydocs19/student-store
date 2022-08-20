import {ProductCard} from "components"
import "./ProductGrid.css"

export default function ProductGrid({ addToCart, removeFromCart, getQuantityOfItemInCart, products = [] }) {
  return (
    <div id="Buy" className="product-grid">
      <div className="content">
        <h3>Best Selling Products</h3>
        <div className="grid">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
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
      </div>
    </div>
  )
}