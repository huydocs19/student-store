const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { NotFoundError } = require("./utils/errors")
const storeRouter = require("./routes/store")
const security = require("./middleware/security")
const authRoutes = require("./routes/auth")
const storeRoutes = require("./routes/store")
const orderRoutes = require("./routes/orders")

const app = express()

// log requests info
app.use(morgan("tiny"))
// parse incoming requests with JSON payloads
app.use(express.json())
// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors())

// extract user from jwt token sent in authorization header
// attach credentials to res.locals.user
app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)
app.use("/store", storeRoutes)
app.use("/orders", orderRoutes)

app.get("/", (req, res, next) => {
    res.status(200).json({message: "Welcome to CodePath Student Store"})
})

/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
return next(new NotFoundError())
})
  
/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message

    return res.status(status).json({
        error: { message, status },
    })
})
  

module.exports = app