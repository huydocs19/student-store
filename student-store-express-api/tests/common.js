const { createUsers, jloToken, lebronToken, adminToken } = require("./createUsers")
const { createProducts } = require("./createProducts")
const { createOrders } = require("./createOrders")
const { createOrderDetails } = require("./createOrderDetails")
const { createRatings } = require("./createRatings")
const db = require("../db.js")

const testProductIds = []
const testOrderIds = []
const testOrderDetailIds = []
const testRatingIds = []
const testTokens = { jloToken, lebronToken, adminToken }

async function commonBeforeAll() {
  // delete all current test data
  await db.query(`DELETE FROM products`)
  await db.query(`DELETE FROM orders`)
  await db.query(`DELETE FROM order_details`)
  await db.query(`DELETE FROM users`)

  // insert fresh test data
  const userIds = await createUsers()
  const productIds = await createProducts()

  for (let i = 0; i < productIds.length; i++) {
    testProductIds.push(productIds[i])
  }

  const ordersIds = await createOrders(userIds)

  for (let i = 0; i < ordersIds.length; i++) {
    testOrderIds.push(ordersIds[i])
  }

  const orderDetailIds = await createOrderDetails(ordersIds, productIds)
  
  for (let i = 0; i < orderDetailIds.length; i++) {    
    testOrderDetailIds.push(orderDetailIds[i])
  }
  const ratingIds = await createRatings(userIds, productIds)
  for (let i = 0; i < ratingIds.length; i++) {    
    testRatingIds.push(ratingIds[i])
  }
}

async function commonBeforeEach() {
  await db.query("BEGIN")
}

async function commonAfterEach() {
  await db.query("ROLLBACK")
}

async function commonAfterAll() {
  await db.end()
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProductIds,
  testOrderIds,
  testOrderDetailIds,
  testTokens,
}