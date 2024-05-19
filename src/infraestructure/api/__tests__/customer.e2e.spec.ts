import {app, sequelize} from '../express';
import request from 'supertest';


describe("E2E test for customer", ()=> {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    
    })    


    afterAll(async () => {
        await sequelize.close();
    })


    it("should create customer", async () => {
        const response = await request(app).post('/customer').send({
            name: "John",
            address: {
                street: "Street1",
                number: 1,
                city: "CWB",
                state: "PR",
                zipCode: "123"

            }
        })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'John');
        expect(response.body.address.street).toBe('Street1');
        expect(response.body.address.number).toBe(1);
        expect(response.body.address.city).toBe('CWB');
        expect(response.body.address.state).toBe('PR');
        expect(response.body.address.zipCode).toBe('123');
    })


    it("should not create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "Noel"
        })

        expect(response.status).toBe(500);
    })


    it("should list all customers", async ()=> {

        const customer1 = {
            name: "John",
            address: {
                street: "Street1",
                number: 1,
                city: "CWB",
                state: "PR",
                zipCode: "123"
            }
        }

        const customer2 = {
            name: "Si",
            address: {
                street: "Street2",
                number: 1,
                city: "CWB",
                state: "PR",
                zipCode: "456"
            }
        }

        const add1 = await request(app).post("/customer").send(customer1);
        expect(add1.status).toBe(200);

        const add2 = await request(app).post("/customer").send(customer2);
        expect(add2.status).toBe(200);


        const response = await request(app).get("/customer");

        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);

        expect(response.body.customers[0]).toHaveProperty('id');
        expect(response.body.customers[0].name).toBe('John');
        expect(response.body.customers[0].address.street).toBe('Street1');
        expect(response.body.customers[0].address.number).toBe("1");
        expect(response.body.customers[0].address.city).toBe('CWB');
        expect(response.body.customers[0].address.state).toBe('PR');

        expect(response.body.customers[1]).toHaveProperty('id');
        expect(response.body.customers[1].name).toBe('Si');
        expect(response.body.customers[1].address.street).toBe('Street2');
        expect(response.body.customers[1].address.number).toBe("1");
        expect(response.body.customers[1].address.city).toBe('CWB');
        expect(response.body.customers[1].address.state).toBe('PR');
    })   
})