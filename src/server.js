const express = require('express')
const cors = require('cors')
const http = require('http')
import './config/index'
import { swaggerSpec } from './config/swaggerConfig'
import swaggerUi from 'swagger-ui-express'

require('dotenv').config()
require('dotenv').config()
import basicAuth from 'express-basic-auth'




const app = express()
const server = http.createServer(app)


app.use(
    "/api-doc",
    basicAuth({
      users: { 'admin': process.env.SWAGGER_PASSWORD },
      challenge: true,
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  )


/**
* CORS config
*/
app.use(cors())

/**
 * enable json
 */
app.use(express.json())

/**
 * file prefix
 */
app.use('/static', express.static(process.env.NODE_ENV === "development" ? ('src/uploads') : ('../src/uploads')))


/********************************************************************* API's routes *********************************************************************/

/**
 * auth route
 */
 const authRoutes = require("./api/auth/authRoutes")
 app.use("/auth", authRoutes)


 /**
 * user route
 */
const userRoutes = require("./api/user/userRoutes")
app.use("/user", userRoutes)

/**
 * role route
 */
 const roleRoutes = require("./api/role/roleRoutes")
 app.use("/role", roleRoutes)
 
 /**
  * permission route
  */
 const permissionRoutes = require("./api/permissions/permissionRoutes")
 app.use("/permission", permissionRoutes)


 /**
 * product route
 */
const productRoutes = require("./api/product/productRoutes")
app.use("/product", productRoutes)





/**
* start server
*/
server.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening at http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
  })