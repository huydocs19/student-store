const express = require("express")
const Store = require("../models/store")
const Rating = require("../models/rating")
const security = require("../middleware/security")
const { NotFoundError } = require("../utils/errors")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
      const products = await Store.listProducts()
      res.status(200).json({ products })
    } catch (err) {
      next(err)
    }
})

router.get("/:productId", async (req, res, next) => {
    try {
      const productId = req.params.productId
      const product = await Store.fetchProductById(productId)
      if (!product || product.length < 1) {
        throw new NotFoundError("Product not found")
      }
      res.status(200).json({ product })
    } catch (err) {
      next(err)
    }
  })
router.post(
  "/:productId/ratings",
  security.requireAuthenticatedUser,  
  async (req, res, next) => {
    try {
      // create a new rating for a product
      const { productId } = req.params
      const { user } = res.locals
      const rating = await Rating.createRatingForProduct({ rating: req.body.rating, user, productId })      
      return res.status(201).json({ rating })
    } catch (err) {
      next(err)
    }
  }
)


module.exports = router