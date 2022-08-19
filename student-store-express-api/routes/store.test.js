const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,  
  testProductIds,  
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
            "id": productId,
            "name": "Rice Krispies",
            "category": "food",
            "image": "https://upload.wikimedia.org/wikipedia/commons/c/cd/RKTsquares.jpg",
            "description": "Delicious corn-based rice grains melted together with marshmallows into a square-like shape.",
            "price": "99"
          }

          const productRes = await request(app).get(`/store/${productId}`)  
          expect(productRes.statusCode).toEqual(200)
          const { product } = productRes.body

        expect(product).toEqual(testProduct)
    })
    test("Throw NotFound Error when the product does not exisst", async () => {
      const res = await request(app).get(`/store/-1000`)      
      expect(res.statusCode).toEqual(404)
    })
  })