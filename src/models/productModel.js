
module.exports = (sequelize, type)=>{
    const ProductModel = sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, prix: {
            type: type.INTEGER,
        },
        label: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        
        path: {
            type: type.STRING,
            allowNull: true 
        },
        enabled: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })
    return ProductModel
}