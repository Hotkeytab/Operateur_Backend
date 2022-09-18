import { Product } from '../../config/index'


/**
 * 
 * @param {Product} product 
 * @description update product if the object contain an id otherwise it create a new one
 */
 export const createProduct = async (product) => {
    if (product.id) {
        return Product.update(
            product,
            {
                where: {
                    id: product.id
                }
            }
        )
    } else {
        return Product.create(product)
    }
}



export const findProducts = async () => {
    return Product.findAll()
}