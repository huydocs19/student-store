const db = require("../db")

const createRatings = async (userIds, productIds) => {
  const firstUserId = userIds[0]
  const firstRating = 4
  const secondUserId = userIds[1]
  const secondRating = 5
  const productId = productIds[0]
  
  await db.query(
    `
      INSERT INTO ratings (rating, customer_id, product_id)
      VALUES ($1, $2, $3),
      ($4, $5, $6);
    `,
    [firstRating, firstUserId, productId, secondRating, secondUserId, productId]
  )

  const results = await db.query(`SELECT customer_id AS "customerId", product_id AS "productId" FROM ratings ORDER BY customer_id, product_id ASC`)
  return results.rows
}

module.exports = {
  createRatings,
}