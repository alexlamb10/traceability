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


let people = []

app.post("/api/choices", (req, res) => {
    let {userName, usersChamp} = req.body
    

    try {
        if(userName !== '' && usersChamp !== ''){
                rollbar.log('User entered a champion')
                people.push(req.body)
                res.status(200).send(people)
        }else if(userName === ''){
            rollbar.error('No name provided')
            res.status(400).send('You must enter a name')
        } else if (usersChamp === ''){
            rollbar.error('No champion provided')
            res.status(400).send('You must enter a Champion')
        }
    } catch(err) {
        console.log(err)
    }
})

app.use(rollbar.errorHandler());

const port = process.env.PORT || 5055

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
