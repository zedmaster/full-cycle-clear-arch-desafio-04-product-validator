import Product from "./product";


describe("Product unit tests", () => {

    it("should throw an error when id is undefined", () => {
        expect(() => {
            const product = new Product("", "Product1", 100);
        }).toThrowError("Id is required");
    })


    it("should throw an error when name is undefined", () => {
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrowError("Name is required");
    })
  

    it("should throw an error when prive is invalid", () => {
        expect(() => {
            const product = new Product("1", "Product1", -1);
        }).toThrowError("Price must be greater than 0");
    })


    it("should change name", () => {
        const product = new Product("1", "Product1", 100);
        product.changeName("Product2");
        expect(product.name).toBe("Product2");
    
    })


    it("should change price", () => {
        const product = new Product("1", "Product1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);    
    })
})