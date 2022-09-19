const { returnStatus } =  require("../../utils/ReturnStatus");
const { formatImage } =  require("../../utils/upload");
const { createProduct, findProducts } =  require("./productServices");



/**
 * @description get product list
 */
 export const getProducts = (req, res) => {
    findProducts()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}



export const upsertProduct = async (req, res) => {

    const product = JSON.parse(req.body.product);
    const file = req.files.find(obj => obj.fieldname === "file")
    const files = req.files
    if (!product.label) {
        returnStatus(res, 400, 0, undefined, "missing required information!")
    }
    else {
        if (file) {
            product.path = await formatImage(file, req.protocol, "products", true, true)
        }
        createProduct(product).then((data) => {
            
  
            returnStatus(res, 201, 1, data)
        }).catch((err) => {
            returnStatus(res, 400, 0, undefined, err.parent.code)
        })
    }
}