const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
  testProductIds,
  testOrderIds,
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** GET orders/ */
describe("GET /orders/", () => {
    test("Authed user can fetch all orders they've made", async () => {
      const orderRes = await request(app).get(`/orders`).set("authorization", `Bearer ${testTokens.jloToken}`)
  
      expect(orderRes.statusCode).toEqual(200)
  
      const { orders } = orderRes.body
      expect(orders.length).toEqual(2)
      
      const firstProductRes = await request(app).get(`/store/${testProductIds[0]}`)
      const firstProduct = firstProductRes.body.product
      const secondProductRes = await request(app).get(`/store/${testProductIds[1]}`)
      const secondProduct = secondProductRes.body.product
      orders.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      expect(orders).toEqual([{
        orderId: expect.any(Number),
        customerId: expect.any(Number),
        username: "jlo",
        quantity: 1,
        name: secondProduct.name,
        price: secondProduct.price
      }, {
        orderId: expect.any(Number),
        customerId: expect.any(Number),
        username: "jlo",
        quantity: 1,
        name: firstProduct.name,
        price: firstProduct.price
      }])    
    })
  
    test("Throws Unauthorized error when user is unauthenticated", async () => {
      const res = await request(app).get(`/orders/`)
      expect(res.statusCode).toEqual(401)
    })
    test("Returns empty array when user hasn't ordered anything", async () => {
      const orderRes = await request(app).get(`/orders`).set("authorization", `Bearer ${testTokens.lebronToken}`)
  
      expect(orderRes.statusCode).toEqual(200)
  
      const { orders } = orderRes.body
      expect(orders.length).toEqual(0)
    })
  })  
/************************************** POST orders/ */
describe("POST /orders/", () => {
    test("Authed user can create a new order", async () => {
      const productObj = {}
      productObj[testProductIds[0]] = 1      
      const orderRes = await request(app).post(`/orders`)      
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({order: productObj})
  
      expect(orderRes.statusCode).toEqual(201)
  
      const { order } = orderRes.body
      expect(order.length).toEqual(1)
      
      const firstProductRes = await request(app).get(`/store/${testProductIds[0]}`)
      const firstProduct = firstProductRes.body.product     
      expect(order).toEqual([{
        orderId: expect.any(Number),
        customerId: expect.any(Number),
        username: "jlo",
        quantity: 1,
        name: firstProduct.name,
        price: firstProduct.price
      }])     
    })
  
    test("Throws Unauthorized error when user is unauthenticated", async () => {
      const productObj = {}
      productObj[testProductIds[0]] = 1
      const res = await request(app).post(`/orders/`).send({order: productObj})
      expect(res.statusCode).toEqual(401)
    })
    test("Throws BadRequest error when order is empty", async () => {      
      const res = await request(app).post(`/orders/`).send({order: {}})
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      expect(res.statusCode).toEqual(400)
    })
  })
/************************************** GET orders/:orderId */
describe("GET /orders/:orderId", () => {
  test("Authed user can fetch order by id", async () => {       
    const orderRes = await request(app).get(`/orders/${testOrderIds[0]}`)      
    .set("authorization", `Bearer ${testTokens.jloToken}`)    

    expect(orderRes.statusCode).toEqual(200)

    const { order } = orderRes.body
    expect(order.length).toEqual(1)
    
    const firstProductRes = await request(app).get(`/store/${testProductIds[0]}`)
    const firstProduct = firstProductRes.body.product     
    expect(order).toEqual([{
      orderId: expect.any(Number),
      customerId: expect.any(Number),
      username: "jlo",
      quantity: 1,
      name: firstProduct.name,
      price: firstProduct.price
    }])     
  })
  test("Authenticated user who is not order owner receives 403 Forbidden Error", async () => {
    const res = await request(app).get(`/orders/${testOrderIds[0]}`)
    .set("authorization", `Bearer ${testTokens.lebronToken}`)
    expect(res.statusCode).toEqual(403)
  })
  test("Throw NotFound Error when the order does not exisst", async () => {
    const res = await request(app).get(`/orders/-1000`)
    .set("authorization", `Bearer ${testTokens.jloToken}`)
    expect(res.statusCode).toEqual(404)
  })
  test("Throws Unauthorized error when user is unauthenticated", async () => {
    const res = await request(app).get(`/orders/${testOrderIds[0]}`)
    expect(res.statusCode).toEqual(401)
  })
})