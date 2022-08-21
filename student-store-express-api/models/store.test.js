const Store = require("./store")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProductIds
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("Store", () => {
    /************************************** listProducts */
    describe("Test listProducts", () => {
        test("Can successfully list all products", async () => {
            const products = await Store.listProducts()
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
    /************************************** fetchProductById */
    describe("Test fetchProductById", () => {
        test("Can fetch product by id", async () => {
            const productId = testProductIds[0]
            const testProduct = {
                id: productId,
                name: "Rice Krispies",
                category: "food",
                rating: 4.50,
                image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/RKTsquares.jpg",
                description: "Delicious corn-based rice grains melted together with marshmallows into a square-like shape.",
                price: "99"
              }
            
            const product = await Store.fetchProductById(productId)            
            product.rating = Math.round((parseFloat(product.rating) + Number.EPSILON) * 100) / 100
            expect(product).toEqual(testProduct)
            
        })
        test("Returns nothing when product id does not exist", async () => {
          const product = await Store.fetchProductById(-1000)
          expect(product).toBeFalsy()
        })

    })      
  })