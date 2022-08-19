const db = require("../db")

class Store {
  static async listProducts() {
      const result = await db.query(`
        SELECT id, name, category, description, image, price
        FROM products;
      `)
  
      return result.rows
    }
  
  static async fetchProductById(productId) {
      const result = await db.query(`
          SELECT id, name, category, description, image, price
          FROM products
          WHERE id = $1;
      `, [productId])
      return result.rows[0]
  }       
}

module.exports = Store