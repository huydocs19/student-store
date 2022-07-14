const express = require("express")
const Store = require("../models/store")
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

router.post("/", async (req, res, next) => {
    try {
        const order = req.body        
        const newPurchase = await Store.createPurchaseOrder(order)        
        res.status(201).json({ purchase: newPurchase })
    } catch (err) { 
        next(err)
    }
})
router.get("/orders", async (req, res, next) => {
  try {
    const purchases = await Store.listPurchases()    
    res.status(200).json({ purchases })
  } catch (err) {     
    next(err)
  }
})
router.get("/orders/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Store.fetchPurchaseById(orderId)
    if (!order) {
      throw new NotFoundError("Order not found")
    }
    res.status(200).json({ order })
  } catch (err) {
    next(err)
  }
})

router.get("/:productId", async (req, res, next) => {
    try {
      const productId = req.params.productId
      const product = await Store.fetchProductById(productId)
      if (!product) {
        throw new NotFoundError("Product not found")
      }
      res.status(200).json({ product })
    } catch (err) {
      next(err)
    }
  })


module.exports = router