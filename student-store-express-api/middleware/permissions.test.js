const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testOrderIds,
    testProductIds,
  } = require("../tests/common")
  const { ForbiddenError } = require("..//utils/errors")
  const Store = require("../models/store")
  const permissions = require("./permissions")
  
  beforeAll(commonBeforeAll)
  beforeEach(commonBeforeEach)
  afterEach(commonAfterEach)
  afterAll(commonAfterAll)
  
  
  describe("OrderPermissions", () => {
    describe("Test authedUserIsOrderOwner", () => {
      test("Attaches order to res.local if authed user is order owner", async () => {
        expect.assertions(3)
        const testOrderId = testOrderIds[0]
        const testProductId = testProductIds[0]
        const req = { params: { orderId: testOrderId } }
        const res = { locals: { user: { username: "jlo" } } }
        const next = (err) => expect(err).toBeFalsy()
        await permissions.authedUserIsOrderOwner(req, res, next)
  
        const { order } = res.locals
        expect(order).toBeTruthy()
        const product = await Store.fetchProductById(testProductId)
        expect(order).toEqual([
            {
                orderId: testOrderId,
                customerId: expect.any(Number),
                username: "jlo",
                quantity: 1,
                name: product.name,
                price: product.price
            }
        ])  
      })
  
      test("Throws error if authed user doesn't own order", async () => {
        expect.assertions(2)
        const testOrderId = testOrderIds[0]
  
        const req = { params: { orderId: testOrderId } }
        const res = { locals: { user: { username: "lebron" } } }
        const next = (err) => expect(err instanceof ForbiddenError).toBeTruthy()
        await permissions.authedUserIsOrderOwner(req, res, next)
  
        const { order } = res.locals
        expect(order).toBeFalsy()
      })
    })
  })