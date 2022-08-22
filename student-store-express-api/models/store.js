const db = require("../db")

class Store {
  static async listProducts() {
      const result = await db.query(`
        SELECT products.id, products.name, COALESCE(AVG(ratings.rating), 0) AS "rating", products.category, products.description, products.image, products.price        
        FROM products
        LEFT JOIN ratings ON ratings.product_id = products.id
        GROUP BY products.id, products.name, products.category, products.description, products.image, products.price;
      `)
  
      return result.rows
    }
  
  static async fetchProductById(productId) {
      const result = await db.query(`
          SELECT products.id, products.name, COALESCE(AVG(ratings.rating), 0) AS "rating", products.category, products.description, products.image, products.price
          FROM products
          LEFT JOIN ratings ON ratings.product_id = products.id
          WHERE id = $1
          GROUP BY products.id, products.name, products.category, products.description, products.image, products.price;
      `, [productId])
      return result.rows[0]
  }       
}

module.exports = Store