const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { validateFields } = require("./validate")

const generateToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn: "24h" })

const createUserJwt = (creds) => {
  validateFields({ required: ["username"], obj: creds, location: "token generation" })

  const payload = {
    username: creds.username,
    isAdmin: creds.isAdmin || false,
  }

  return generateToken(payload)
}

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch (err) {
    return {}
  }
}

module.exports = {
  generateToken,
  validateToken,
  createUserJwt,
}