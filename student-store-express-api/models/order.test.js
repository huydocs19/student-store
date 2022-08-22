const {BadRequestError} = require("../utils/errors")
const Order = require("./order")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testOrderIds,
  testProductIds,
} = require("../tests/common")
const Store = require("./store")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("Order", () => {
    describe("Test createOrder", () => {
      test("Can create a new order with valid params", async () => {
        const user = { username: "jlo" }
        const order = {}
        order[testProductIds[0]] = 2
        const product = await Store.fetchProductById(testProductIds[0])
        const orderDetails = await Order.createOrder({order, user})
        expect(orderDetails.length).toEqual(1)
  
        expect(orderDetails).toEqual([{
          orderId: expect.any(Number),
          customerId: expect.any(Number),
          username: "jlo",
          quantity: 2,
          name: product.name,
          price: product.price
        }])
      })
  
      test("Throws error with invalid order", async () => {
        const user = { username: "jlo" }
        const order = {}
        try {
          await Order.createOrder({ order, user })
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
        }
      })
      test("Throws error with invalid user", async () => {
        const user = {}
        const order = {}
        order[testProductIds[0]] = 2        
        try {
          await Order.createOrder({ order, user })
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
        }
      })
    })
    describe("Test listOrdersForUser", () => {
      test("Fetches all of the authenticated users' orders", async () => {
        const user = { username: "jlo" }        
        const firstProduct = await Store.fetchProductById(testProductIds[0])
        const secondProduct = await Store.fetchProductById(testProductIds[1])
        const orderDetails = await Order.listOrdersForUser(user)
        expect(orderDetails.length).toEqual(2)
        expect(orderDetails[0].customerId === orderDetails[1].customerId)
        orderDetails.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  
        expect(orderDetails).toEqual([{
          orderId: expect.any(Number),
          customerId: expect.any(Number),
          username: "jlo",
          quantity: 1,
          name: secondProduct.name,
          price: secondProduct.price
        },
        {
          orderId: expect.any(Number),
          customerId: expect.any(Number),
          username: "jlo",
          quantity: 1,
          name: firstProduct.name,
          price: firstProduct.price
        }
      ])        
      })
  
      test("Returns empty array when user hasn't ordered anything", async () => {
        const user = { username: "lebron" }
        
        const orderDetails = await Order.listOrdersForUser(user)
        expect(orderDetails).toHaveLength(0)
      })
    })
    describe("Test fetchOrderById", () => {
      test("Fetches order by id", async () => {            
        const product = await Store.fetchProductById(testProductIds[0])        
        const orderDetails = await Order.fetchOrderById(testOrderIds[0])
        expect(orderDetails.length).toEqual(1)

        expect(orderDetails[0]).toEqual({
          orderId: expect.any(Number),
          customerId: expect.any(Number),
          username: "jlo",
          quantity: 1,
          name: product.name,
          price: product.price
        })        
      })
  
      test("Returns empty array when order id does not exist", async () => {
        const orderDetails = await Order.fetchOrderById(-1000)
        expect(orderDetails).toHaveLength(0)
      })
    })
  })