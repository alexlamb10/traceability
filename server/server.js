const express = require("express")
const cors = require('cors')
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))

const port = process.env.PORT || 5055

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
