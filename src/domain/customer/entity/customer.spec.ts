import { Address } from '../value-object/address';
import { Customer } from './customer';


describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => new Customer("", "John")).toThrowError("Customer: Id is required");
    })


    it("should add reward points", () => {
        const customer = new Customer("1", "John");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })

    it("should throw error when name is empty", () => {
        expect(() => new Customer("1", "")).toThrowError("Customer: Name is required");
    })

    it("should change name", () => {
        let customer = new Customer("1", "John");
        customer.changeName("Bond");
        expect(customer.name).toBe("Bond");
    })


    it("should activate a customer", () => {
        let customer = new Customer("1", "John");
        const address = new Address("Street1", "1", "CWB", "PR", "123");
        customer.changeAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);
        
    })

    
    it("should deactivate a customer", () => {
        let customer = new Customer("1", "John");
        
        customer.deactivate();

        expect(customer.isActive()).toBe(false);        
    })


    it("should throw an error when activate a customer without an address", () => {
        let customer = new Customer("1", "John");
        expect(()=> customer.activate()).toThrowError("Address is mandatory to activate a customer");
        
    })
})