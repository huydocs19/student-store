const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,  
  testProductIds, 
  testTokens, 
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** GET /store/ */
describe("GET /store", () => {
    test("User can fetch all products", async () => {
      const productRes = await request(app).get(`/store`)  
      expect(productRes.statusCode).toEqual(200)
  
      const { products } = productRes.body
      expect(products.length).toEqual(16)

        products.forEach((product) => {
            expect(product).toEqual({
                id: expect.any(Number),
                name: expect.any(String),
                rating: expect.any(String),
                category: expect.any(String),                    
                image: expect.any(String),                    
                description: expect.any(String),
                price: expect.any(String),
                })
        })
    })
  })  
/************************************** GET /store/:productId */
describe("GET /store/:productId", () => {
    test("User can fetch product by id", async () => {
        const productId = testProductIds[0]
        const testProduct = {
            id: productId,
            name: "Rice Krispies",
            category: "food",
            rating: 4.5,
            image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/RKTsquares.jpg",
            description: "Delicious corn-based rice grains melted together with marshmallows into a square-like shape.",
            price: "99"
          }

        const productRes = await request(app).get(`/store/${productId}`)  
        expect(productRes.statusCode).toEqual(200)
        const { product } = productRes.body
        product.rating = Math.round((parseFloat(product.rating) + Number.EPSILON) * 100) / 100
        expect(product).toEqual(testProduct)
    })
    test("Throw NotFound Error when the product does not exisst", async () => {
      const res = await request(app).get(`/store/-1000`)      
      expect(res.statusCode).toEqual(404)
    })
  })
/************************************** POST /store/:productId/ratings */
describe("POST /store/:productId/ratings", () => {
  test("User can create a new order with valid params", async () => {                 
    const productId = testProductIds[0]
    const ratingRes = await request(app)
    .post(`/store/${productId}/ratings`).send({rating: 2})
    .set("authorization", `Bearer ${testTokens.adminToken}`)
    expect(ratingRes.statusCode).toEqual(201)    
    const {rating} = ratingRes.body        
    expect(rating).toEqual({
      rating: 2,
      customerId: expect.any(Number),
      username: "serena",
      productId: productId,
      createdAt: expect.any(String)          
    })
  })
  test("Throws BadRequest error if user has already added a rating for the product", async () => {
    const productId = testProductIds[0]  
    const productRes = await request(app)
    .post(`/store/${productId}/ratings`).send({rating: 2})
    .set("authorization", `Bearer ${testTokens.jloToken}`)
    expect(productRes.statusCode).toEqual(400)
  })

  test("Throws BadRequest error with invalid rating", async () => {
    const productId = testProductIds[0]  
    let productRes = await request(app)
    .post(`/store/${productId}/ratings`).send({rating: -10})
    .set("authorization", `Bearer ${testTokens.adminToken}`)
    expect(productRes.statusCode).toEqual(400)
    productRes = await request(app)
    .post(`/store/${productId}/ratings`).send({rating: 10})
    .set("authorization", `Bearer ${testTokens.adminToken}`)
    expect(productRes.statusCode).toEqual(400)
  })
  test("Throws UnAuthorized error with invalid user", async () => {
    const productId = testProductIds[0]  
    const productRes = await request(app)
    .post(`/store/${productId}/ratings`).send({rating: 2})    
    expect(productRes.statusCode).toEqual(401)    
  })
  test("Throws BadRequest error with invalid product id", async () => {
    const productId = -100  
    const productRes = await request(app)
    .post(`/store/${productId}/ratings`).send({rating: 2})
    .set("authorization", `Bearer ${testTokens.adminToken}`)
    expect(productRes.statusCode).toEqual(400)
  })
})