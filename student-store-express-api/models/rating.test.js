const {BadRequestError} = require("../utils/errors")
const Rating = require("./rating")
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

describe("Order", () => {
    describe("Test createOrder", () => {
      test("Can create a new order with valid params", async () => {
        const user = { username: "serena" } 
        const rating = 2              
        const productId = testProductIds[0]
        const userRating = await Rating.createRatingForProduct({rating, user, productId})
          
        expect(userRating).toEqual({
          rating: 2,
          customerId: expect.any(Number),
          username: "serena",
          productId: productId,
          createdAt: expect.any(Date)          
        })
      })
      test("Throws error if user has already added a rating for the product", async () => {
        const user = { username: "jlo" }
        const rating = 2              
        const productId = testProductIds[0]        
        try {
          await Rating.createRatingForProduct({rating, user, productId})
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
        }
      })
  
      test("Throws error with invalid rating", async () => {
        const user = { username: "serena" } 
        let rating = -10             
        const productId = testProductIds[0]   
        try {
          await Rating.createRatingForProduct({rating, user, productId})
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
        }
        rating = 10
        try {
            await Rating.createRatingForProduct({rating, user, productId})
          } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
          }
      })
      test("Throws error with invalid user", async () => {
        const user = {} 
        let rating = 5             
        const productId = testProductIds[0]   
        try {
          await Rating.createRatingForProduct({rating, user, productId})
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
        }
      })
      test("Throws error with invalid product id", async () => {
        const user = {username: "serena"} 
        let rating = 5             
        const productId = -1000
        try {
          await Rating.createRatingForProduct({rating, user, productId})
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
        }
      })
    })    
    describe("Test fetchRatingForProductByUser", () => {
      test("Fetches rating for product by user", async () => {            
        const user = {username: "jlo"}               
        const productId = testProductIds[0]
        const userRating = await Rating.fetchRatingForProductByUser({user, productId})
       
        expect(userRating).toEqual({
            rating: 4,
            customerId: expect.any(Number),
            username: "jlo",
            productId: productId,
            createdAt: expect.any(Date)
        })        
      })
  
      test("Returns nothing when user is not valid", async () => {
        const user = {}               
        const productId = testProductIds[0]
        const userRating = await Rating.fetchRatingForProductByUser({user, productId})
        expect(userRating).toBeFalsy()
      })
      
      test("Returns nothing when product id is not valid", async () => {
        const user = {}               
        const productId = -1000
        const userRating = await Rating.fetchRatingForProductByUser({user, productId})
        expect(userRating).toBeFalsy()
      })
    })
  })