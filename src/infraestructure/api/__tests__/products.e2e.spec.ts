import {app, sequelize} from '../express';
import request from 'supertest';


describe("E2E test for products", ()=> {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    
    })    


    afterAll(async () => {
        await sequelize.close();
    })


    it("should create product", async ()=> {

        const response = await request(app).post("/product").send({
            name: "Product1",
            price: 100.0
        })
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Product1');
        expect(response.body.price).toBe(100.0);
    });


    it("should not create product", async ()=> {
        const response = await request(app).post("/product").send({
            name: "Product1"
        })
        
        expect(response.status).toBe(500);
    });


    it("should list all products", async ()=> {
        const product1 = {
            name: "Product1",
            price: 100.0
        }
        const product2 = {
            name: "Product2",
            price: 200.0
        }


        const response1 = await request(app).post("/product").send(product1);
        expect(response1.status).toBe(200)

        const response2 = await request(app).post("/product").send(product2);
        expect(response2.status).toBe(200)

        const response = await request(app).get("/product").send();

        expect(response.status).toBe(200);

        expect(response.body.products).toHaveLength(2);
        expect(response.body.products[0].name).toBe('Product1');
        expect(response.body.products[0].price).toBe(100.0);

        expect(response.body.products[1].name).toBe('Product2');
        expect(response.body.products[1].price).toBe(200.0);
    });
})