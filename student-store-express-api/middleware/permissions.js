const Order = require("../models/order")
const { ForbiddenError } = require("../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the order.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the order to res.locals
 *
 */
const authedUserIsOrderOwner = async (req, res, next) => {  
  try {
    const { user } = res.locals     
    const { orderId } = req.params
    const orders = await Order.fetchOrderById(orderId)  
    
    orders.forEach((order) => {
        if (order.username !== user.username) {
            throw new ForbiddenError("User is not allowed to fetch other users' orders.")
        }
    })

    res.locals.order = orders

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
    authedUserIsOrderOwner    
}