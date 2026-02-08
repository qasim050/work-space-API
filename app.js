require("dotenv").config()
require("express-async-errors")
const express = require("express")
const connectDB = require("./db/connect")

//routes
const {spaceRouter,userRouter,authRouter,sessionRouter} = require("./routes")

//Middlewares
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFound = require("./middleware/not-found")
const {authMiddleware,authoriz} = require("./middleware/authentication")
const ROLES = require("./config/constants")

const app = express()

// docs

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 

app.use(express.json())

app.use("/api/v1/session",authMiddleware,authoriz([ROLES.MANAGER,ROLES.ADMIN]),sessionRouter)
app.use("/api/v1/space",authMiddleware,authoriz([ROLES.ADMIN,ROLES.MANAGER]),spaceRouter)
app.use("/api/v1/user",authMiddleware,userRouter)
app.use("/api/v1/auth",authRouter)
app.use(errorHandlerMiddleware)
app.use(notFound)



const port = process.env.PORT

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>{
            console.log(`server is listen on port ${port}... `)
        } ) 
    } catch (error) {
        console.log(error)
    }

}
start()