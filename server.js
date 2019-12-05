// IMPORT DEPENDENCIES
const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const MongoDBStore = require("connect-mongodb-session")(session)
const dbInit = require("./config/dbInit")
const flash = require("connect-flash")

// CONTROLLERS
const userRouter = require("./routes/user")

// APP INITIATION
const app = express()

// DATABASE INITIATION
dbInit()

// EXTENSION SETTINGS
const store = new MongoDBStore({
    uri:"mongodb://localhost/gawegawe-database",
    collection:"sessions"
  })

app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  secret:"A23423as$#$ASDASSD",
  resave:false,
  saveUninitialized:false,
  store:store
}))
// Must be set after session
app.use(flash())

// ROUTES
app.use("/user",userRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running!")
})