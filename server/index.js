require("dotenv").config({ path: __dirname + "/../.env" })
const express = require("express")
const session = require("express-session")
const massive = require("massive")
const app = express()

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

//Controllers
const authCtrl = require("./controllers/authController")
const dateCtrl = require('./controllers/dateController')

//Middleware
const authMid = require("./middleware/authMiddleware")
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)

//Database connection
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db)
  console.log("Database connected")
  const io = require("socket.io")(
    app.listen(SERVER_PORT, () =>
      console.log(`Server listening on ${SERVER_PORT}`)
    )
  )
  app.set("io", io)
  //Socket connection
  io.on("connection", (socket) => {
    console.log("User connected")
    socket.on('disconnect', () => console.log("User disconnected"))
  })
})

//Endpoints
//Auth Endpoints
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.get("/auth/user", authMid.usersOnly, authCtrl.getUser)

//Calendar Endpoints
app.get('/api/dates', dateCtrl.getDates)
app.post('/api/dates', dateCtrl.updateDates)
