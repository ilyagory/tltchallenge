const config = require('../config.json')
const {catchAll} = require('../handlers')

module.exports = function (req, res, next) {
    const apiKey = req.get('x-api-key')

    if (apiKey === config.app.apiKey) {
        next()
    } else {
        catchAll.apply(this, arguments)
    }
}