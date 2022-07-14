const { BadRequestError } = require("../utils/errors")
const { storage } = require("../data/storage")

class Store {
    static async listProducts() {
        const products = storage.get("products").value()
        return products
    }
    static async listPurchases() {
        const purchases = storage.get("purchases").value()
        return purchases
    }
    static async fetchProductById(productId) {
        const product = storage
        .get("products")
        .find({ id: Number(productId) })
        .value()
        return product
    }   
    static async fetchPurchaseById(purchaseId) {
        const purchase = storage
        .get("purchases")
        .find({ id: Number(purchaseId) })
        .value()
        return purchase
    }   
    static async createPurchaseOrder(order) {        
        if (!order) {
          throw new BadRequestError(`No order sent.`)
        }
        const requiredFields = ["shoppingCart", "user"]
        requiredFields.forEach((field) => {
          if (!order[field]) {
            throw new BadRequestError(`Field: "${field}" is required in order`)
          }
        })
        if (!order.user.name || !order.user.email) {
            throw new BadRequestError("The name or email of the person placing the order is missing")
        }
        if (!Array.isArray(order.shoppingCart) || order.shoppingCart.length == 0) {
            throw new BadRequestError("No items added to cart yet")
        }
        let idSet = new Set()
        let total = 0
        const checkShoppingCart = async () => {
            order.shoppingCart.forEach(async (item) => {
            if (!item || !item.itemId || !item.quantity) {
                throw new BadRequestError("The quantity or itemId field is missing")
            }
            if (Number(item.quantity) <= 0) {
                throw new BadRequestError("The quantity should be postive")
            }
            const product = await Store.fetchProductById(item.itemId)
            if (!product) {
                throw new BadRequestError("The product does not exist")
            }
            total += product.price * item.quantity
            idSet.add(item.itemId)            
        })} 
        await checkShoppingCart() 
        if (idSet.size != order.shoppingCart.length) {
            throw new BadRequestError("There are duplicate items in the shopping cart")
        }

        const purchases = await Store.listPurchases()
        const purchaseId = purchases.length + 1
        const createdAt = new Date().toISOString()
        const receipt = await Store.getReceipt(order)
        
        const newPurchase = { id: purchaseId, email: order.user.email, name: order.user.name, order: order.shoppingCart, total: Math.round((total*1.0875 + Number.EPSILON) * 100) / 100, createdAt, receipt}
    
        storage.get("purchases").push(newPurchase).write()
    
        return newPurchase
      }
    static async getReceipt(order) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        const lines = [`Showing receipt for ${order.user.name} available at ${order.user.email}:`]
        const productRows = []
        const userInfo = order.user
        let subTotal = 0
        const contructReceipt = async () => {
            order.shoppingCart.forEach(async (item) => {
            const product = await Store.fetchProductById(item.itemId)
            const totalPrice = product.price * item.quantity
            lines.push(`${item.quantity} total ${product.name} purchased at a cost of ${formatter.format(product.price)} for a total cost of ${formatter.format(totalPrice)}.`)        
            const productRow = {...product, quantity: item.quantity, totalPrice}
            productRows.push(productRow)
            subTotal += product.price * item.quantity 
        }) }
        await contructReceipt()
        lines.push(`Before taxes, the subtotal was ${formatter.format(subTotal)}`)
        lines.push(`After taxes and fees were applied, the total comes out to ${formatter.format(subTotal*1.0875)}`)
        const receipt = {lines, productRows, userInfo}
        return receipt
    }
}

module.exports = Store