const request = require("supertest")
const app = require("../app")

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testTokens, testProductIds } = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** POST /auth/token */

describe("Auth Routes", () => {
  describe("POST /auth/login/", function () {
    test("User can login successfully with valid credentials", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "lebron@james.io",
        password: "password1",
      })
      expect(res.body).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(Number),
          username: "lebron",
          name: "LeBron James",         
          email: "lebron@james.io",
          createdAt: expect.any(String),
          isAdmin: false,
        },
      })
    })

    test("Throws Unauthenticated error when user doesn't exist in db", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "somebody_else@users.io",
        password: "password",
      })
      expect(res.statusCode).toEqual(401)
    })

    test("Throws Unauthenticated error when user provides wrong password", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "lebron@james.io",
        password: "nope",
      })
      expect(res.statusCode).toEqual(401)
    })

    test("Throws Bad Request error when user doesn't provide password", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "lebron@james.io",
      })
      expect(res.statusCode).toEqual(400)
    })

    test("Throws Bad Request error when user doesn't provide email", async () => {
      const res = await request(app).post("/auth/login/").send({
        password: "password1",
      })
      expect(res.statusCode).toEqual(400)
    })
  })
  
  /************************************** POST /auth/register */
  describe("POST /auth/register/", () => {
    test("Allows user to register with valid credentials", async () => {
      const res = await request(app).post("/auth/register/").send({
        username: "new",
        name: "first last",
        password: "pw",
        email: "new@email.com",
      })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(Number),
          username: "new",
          name: "first last",
          email: "new@email.com",
          createdAt: expect.any(String),
          isAdmin: false,
        },
      })
    })

    test("Throws Bad Request error when user doesn't provide all fields", async () => {
      const res = await request(app).post("/auth/register/").send({
        username: "new",
      })
      expect(res.statusCode).toEqual(400)
    })
  })

  /************************************** GET /auth/me */
  describe("GET /auth/me/", () => {
    test("User can access their profile", async () => {
      const res = await request(app).get("/auth/me/").set("authorization", `Bearer ${testTokens.jloToken}`)            
      const { user, orders } = res.body
      expect(orders.length).toEqual(2)
      expect(user).toEqual(      
       {
          id: expect.any(Number),
          username: "jlo",
          name: "Jennifer Lopez",
          email: "jennifer@lopez.io",
          isAdmin: false,  
          createdAt: expect.any(String),
       }
      )
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
      const res = await request(app).get(`/auth/me/`)
      expect(res.statusCode).toEqual(401)
    })
  })

})