import {createProduct,getSellerProduct} from '../services/product.api.js'
import {useDispatch} from 'react-redux'
import { setSellerProducts } from '../state/product.slice.js'     //have to store product in this action


export const useProduct=()=>{

    const dispatch=useDispatch()
    async function handleCreateProduct(formData){
        const data=await createProduct(formData)          //in this we are storing nothing
        return data.product
    }

    async function handlegetSellerProduct(){
        const data=await getSellerProduct()         //but in this we are storing products in a state so to store in that state we have to modify the state
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    return {handleCreateProduct,handlegetSellerProduct}
}