import {body,validationResult} from 'express-validator'

function validateRequest(req,res,next){
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({message:"Validatuon error",errors:errors})
    }

    next()
}


export const createProductValidator=[
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isNumeric().withMessage("Price amount must be in number"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),
    validateRequest
]