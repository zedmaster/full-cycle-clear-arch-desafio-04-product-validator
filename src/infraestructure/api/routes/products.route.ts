import express, {Request, Response} from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create-product.usecase';
import ListProductsUseCase from '../../../usecase/product/list/list-products.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';


export const productRoute = express.Router();

productRoute.post("/", async (request: Request, response: Response)=> {

    const usecase = new CreateProductUseCase(new ProductRepository());
    try{

        const productDTO = {
            name : request.body.name,
            price: request.body.price
        }
    
        const output = await usecase.execute(productDTO);
        response.send(output);

    } catch(err){        
        response.status(500).send(err);
    }

})


productRoute.get("/", async (request: Request, response: Response)=> {

    const usecase = new ListProductsUseCase(new ProductRepository());

    try{
        const output = await usecase.execute({});
        response.send(output);
    } catch(err){
        response.status(500).send

    }

})