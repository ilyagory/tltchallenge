const express = require('express')

const handlers = require('./handlers')
const config = require('./config.json')
const {auth: mwAuth} = require('./middlewares')

const app = express()

app.use(express.json())

app.post('/', mwAuth, handlers.generateHtml)
app.all('*', handlers.catchAll)

app.listen(config.app.port, () => console.log(`HTML Generator is listening on :${config.app.port}\n`))