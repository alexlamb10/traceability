const express = require("express")
const cors = require('cors')
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '996054aa80644c54829e2a3d26cfcfe7',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use(express.static(path.join(__dirname, "../public")))

const port = process.env.PORT || 5055

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
