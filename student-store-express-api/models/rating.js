const db = require("../db")
const { BadRequestError } = require("../utils/errors")
const Store = require("./store")
class Rating {
  static async createRatingForProduct({ rating, user, productId }) {
    if (!Number(rating) || Number(rating) <= 0 || Number(rating) > 5) {
      throw new BadRequestError(`Invalid rating provided. Must be an integer between 1-10.`)
    }
    if (!user || !user?.username) {
        throw new BadRequestError("No user provided")
    }
    const existingProduct = await Store.fetchProductById(productId)
    if (!existingProduct) {
        throw new BadRequestError(`Product does not exist`)
    }
    // check if user has already added a rating for this product
    // if they have, throw an error
    const existingRating = await Rating.fetchRatingForProductByUser({ user, productId })
    if (existingRating) {
      throw new BadRequestError(`Users aren't allowed to leave multiple ratings for a single product.`)
    }
    // otherwise insert a new record into the database
    const results = await db.query(
      `
        INSERT INTO ratings (rating, customer_id, product_id)
        VALUES ($1, (SELECT id FROM users WHERE username = $2), $3)
        RETURNING rating, 
            $2 AS username,
            customer_id AS "customerId", 
            product_id AS "productId", 
            created_at AS "createdAt";
      `,
      [rating, user.username, productId]
    )

    return results.rows[0]
  }

  static async fetchRatingForProductByUser({ user, productId }) {
    // fetch a user's rating of a product, if one exists
    const results = await db.query(
      `
        SELECT rating, 
            customer_id AS "customerId",
            $1 AS username, 
            product_id AS "productId", 
            created_at AS "createdAt"
        FROM ratings
        WHERE customer_id = (SELECT id FROM users WHERE username = $1) AND product_id = $2;
      `,
      [user.username, productId]
    )

    return results.rows[0]
  }
}

module.exports = Rating