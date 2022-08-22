const db = require("../db")

const createOrders = async (userIds) => {
  const userId = userIds[0]
  
  await db.query(
    `
    INSERT INTO orders (customer_id)
    VALUES ($1), ($2);    
    `,
    [userId, userId]
  )

  const results = await db.query(`SELECT id FROM orders ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
  createOrders,
}