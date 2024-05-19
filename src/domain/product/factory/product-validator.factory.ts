import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductValidatorYup from "../validator/product-validator.yup";

export class ProductValidatorFactory {

    public static create(): ValidatorInterface<Product> {
        return new ProductValidatorYup();
    }
}