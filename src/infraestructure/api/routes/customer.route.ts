import express, {Request, Response} from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create-customer.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list-customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';


export const customerRoute = express.Router();

customerRoute.post("/", async (request: Request, response: Response)=> {

    const usecase = new CreateCustomerUseCase(new CustomerRepository());

    try{

        const customerDto = {
            name : request.body.name,
            address: {
                street: request.body.address.street,
                number: request.body.address.number,
                city: request.body.address.city,
                state: request.body.address.state,
                zipCode: request.body.address.zipCode
            }
        }
    
        const output = await usecase.execute(customerDto);
        response.send(output);
    } catch(err){
        response.status(500).send(err);
    }
})


customerRoute.get("/", async (req: Request, res: Response)=> {

    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try{
        const output = await usecase.execute({});
        res.send(output);
    } catch(err){
        res.status(500).send(err);
    }
})