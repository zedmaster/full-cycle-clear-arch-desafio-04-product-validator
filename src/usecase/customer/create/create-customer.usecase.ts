import { Address } from '../../../domain/customer/value-object/address';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create.customer.dto';
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { v4 } from 'uuid';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';

export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const address = new Address(input.address.street, input.address.number, input.address.city, input.address.state, input.address.zipCode)
        const customer = CustomerFactory.createWithAddress(input.name, address);

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                state: customer.address.state,
                zipCode: customer.address.zipCode
            }
        }
    }
}