import express from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js'
import { createProduct, getAllProducts, getSellerProduct, getProductDetails } from '../controllers/product.controller.js'
import multer, { memoryStorage } from 'multer'
import { createProductValidator } from '../validator/product.validator.js'


const upload = multer({
    storage: memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024   //5MB
    }
})

const router = express.Router()

router.post('/', authenticateSeller, upload.array('images', 7), createProductValidator, createProduct)

router.get("/seller", authenticateSeller, getSellerProduct)


router.get('/', getAllProducts)


router.get('/detail/:id', getProductDetails)



export default router