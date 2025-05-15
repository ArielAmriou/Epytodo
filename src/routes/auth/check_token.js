const jwt = require('jsonwebtoken');
function validateJwt(token) {
    if (!token)
        return false
    const parsedToken = token.replace("token=", "")
    try {
        jwt.verify(parsedToken, process.env.SECRET)
    } catch(error) {
        return false
    }
    return true
}

module.exports = validateJwt;