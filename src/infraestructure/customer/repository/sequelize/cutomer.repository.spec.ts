import { Address } from './../../../../domain/customer/value-object/address';
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import { Customer } from '../../../../domain/customer/entity/customer';


describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })


    afterEach(async () => {
        await sequelize.close();
    })


    it("should create customer", async () => {

        const customerRepository = new CustomerRepository();
        const address = new Address("Street1", "District1", "City1", "State1", "123");
        const customer = new Customer("1", "Customer1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive()
        })
    })


    it("should update customer", async () => {

        const customerRepository = new CustomerRepository();
        const address = new Address("Street1", "District1", "City1", "State1", "123");
        const customer = new Customer("1", "Customer1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        customer.changeName("Customer2");
        customer.changeAddress( new Address("Street2", "District2", "City2", "State2", "456"));

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zipCode,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive()
        })

    })


    it("should find customer", async () => {

        const customerRepository = new CustomerRepository();
        const address = new Address("Street1", "District1", "City1", "State1", "123");
        const customer = new Customer("1", "Customer1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerFound = await customerRepository.find("1");

        expect(customerFound).toStrictEqual(customer);

    })


    it("should throw an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();
        await expect(async ()=> {
           await customerRepository.find("1")
        }).rejects.toThrow("Customer not found");
    })


    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const address1 = new Address("Street1", "District1", "City1", "State1", "123");
        const customer1 = new Customer("1", "Customer1");

        customer1.changeAddress(address1);

        customer1.addRewardPoints(100);

        const address2 = new Address("Street2", "District2", "City2", "State2", "456");
        const customer2 = new Customer("2", "Customer2");
        customer2.changeAddress(address2);
        customer2.addRewardPoints(200);
        customer2.activate();


        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const expectedCustomers = [customer1, customer2];

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
        
    })
})