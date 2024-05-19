import Notification from "./notification";


describe("Unit test for Notifications", ()=> {
    it("should create errors", () => {

        const notification = new Notification();
        const error = {
            message: "Error1",
            context: "customer"
        }
        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: Error1,");

        const error2 = {
            message: "Error2",
            context: "customer"
        }

        notification.addError(error2);

        expect(notification.messages("customer")).toBe("customer: Error1,customer: Error2,");

        const error3 = {
            message: "Error3",
            context: "order"
        }

        notification.addError(error3);

        expect(notification.messages("customer")).toBe("customer: Error1,customer: Error2,");

        expect(notification.messages()).toBe("customer: Error1,customer: Error2,order: Error3,");
    })


    it("should test if notification has at least one error", ()=> {
        const notification = new Notification();
        const error = {
            message: "Error1",
            context: "customer"
        }
        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    })


    it("should get All error props", ()=> {
        const notification = new Notification();
        const error = {
            message: "Error1",
            context: "customer"
        }
        notification.addError(error);

        expect(notification.errors).toEqual([error]);
    })
})