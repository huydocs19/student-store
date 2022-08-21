const db = require("../db")

class Store {
  static async listProducts() {
      const result = await db.query(`
        SELECT id, name, COALESCE(AVG(ratings.rating), 0) AS "rating", category, description, image, price        
        FROM products
        LEFT JOIN ratings ON ratings.product_id = products.id
        GROUP BY products.id;
      `)
  
      return result.rows
    }
  
  static async fetchProductById(productId) {
      const result = await db.query(`
          SELECT id, name, COALESCE(AVG(ratings.rating), 0) AS "rating", category, description, image, price
          FROM products
          LEFT JOIN ratings ON ratings.product_id = products.id
          WHERE id = $1
          GROUP BY products.id;
      `, [productId])
      return result.rows[0]
  }       
}

module.exports = Store