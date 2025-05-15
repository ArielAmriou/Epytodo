const jwt = require('jsonwebtoken');
function validateJwt(token) {
    if (!token)
        return false
    const parsedToken = token.replace("token=", "")
    console.log(parsedToken)
    try {
        jwt.verify(parsedToken, process.env.SECRET)
    } catch(error) {
        return false
    }
    return true
}

module.exports = validateJwt;