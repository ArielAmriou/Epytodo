const jwt = require('jsonwebtoken');
function validateJwt(token) {
    if (!token)
        return false
    const toParse = "bearer token="
    const parsedToken = token.substring(toParse.length, token.length)

    try {
        jwt.verify(parsedToken, process.env.SECRET)
    } catch(error) {
        return false
    }
    return true
}

module.exports = validateJwt;