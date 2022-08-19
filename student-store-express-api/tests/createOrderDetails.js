const db = require("../db")

const createOrderDetails = async (orderIds, productIds) => {
  const defaultProductId = productIds[0]
  orderIds.forEach(async (orderId, idx) => {
    let productId = defaultProductId
    if (idx >= 0 && idx < productIds.length) {
        productId = productIds[idx]
    }
    await db.query(
        `
        INSERT INTO order_details (order_id, product_id, discount)
        VALUES ($1, $2, $3);    
        `,
        [orderId, productId, 0]
    )
  })
  const results = await db.query(`SELECT order_id, product_id FROM order_details ORDER BY order_id ASC, product_id ASC`)

  const ids = results.rows.map((row) => ({orderId: row.order_id, productId: row.product_id}))
  return ids
}

module.exports = {
  createOrderDetails,
}