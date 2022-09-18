import Sequelize from 'sequelize'
import UserModel from '../models/userModel'
import ProductModel from '../models/productModel'
import PermissionModel from '../models/PermissionModel'
import RoleModel from '../models/RoleModel'
import OrderModel from "../models/Order"
import OrderDetailModel from "../models/OrderDetail"
import OrderPictureModel from "../models/OrderPicture"




export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.APP_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

export const Order = OrderModel(sequelize, Sequelize)
export const OrderDetail = OrderDetailModel(sequelize, Sequelize)
export const OrderPicture = OrderPictureModel(sequelize, Sequelize)    
export const Product = ProductModel(sequelize, Sequelize)
export const User = UserModel(sequelize, Sequelize)
export const Role = RoleModel(sequelize, Sequelize)
export const Permission = PermissionModel(sequelize, Sequelize)
//export const ProductPicture = ProductPictureModel(sequelize, Sequelize)

/**
 * role has many users and user have one role
 */
 Role.hasMany(User)
 User.belongsTo(Role)
 
 /**
  * role has many permission and permission have one role
  */
 Role.hasMany(Permission)
 Permission.belongsTo(Role)

 /**
* Order have one Store
* Order have one User
*/
Order.belongsTo(User)


/**
* Order have one Store
* Order have one User
* Order has many OrderDetail
*/
OrderDetail.belongsTo(Product)
OrderDetail.belongsTo(Order)
Order.hasMany(OrderDetail)



/**
* OrderPicture have one Order
* Order has many OrderPicture
*/
OrderPicture.belongsTo(Order)
Order.hasMany(OrderPicture)
 

//db.products.hasMany(ProductPicture)


sequelize.sync({ alter: 'update' })
  .then(() => {
    console.log(`Database & tables updated!`)
  }).catch((err) => {
    console.log(err)
  })


