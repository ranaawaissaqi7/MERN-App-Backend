require("dotenv").config();
const express = require("express");
const app = express()
const cors = require("cors")
const routes = require("./routes/Routes")
const dbConnect = require("./connectionDB/ConnectionDB")
const errorHandler = require("./middlewares/ErrorHandler")
const PORT = process.env.PORT;


dbConnect();

// middelware
app.use(express.json());

app.use(cors())

// reqiures routes
app.use(routes)

app.use(errorHandler)

// listen App
app.listen(PORT, () => {
    console.log(`Server is Started on PORT ${PORT}`)
})

