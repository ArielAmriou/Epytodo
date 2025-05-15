const jwt = require('jsonwebtoken');
function validateJwt(token) {
    if (!token)
        return false
    try {
        jwt.verify(token, process.env.SECRET)
    } catch(error) {
        return false
    }
    return true
}

module.exports = validateJwt;