import customerAPI from "./customerAPI";
import { customerInfo } from "./authInfo";
import { AxiosError } from "axios";

// customerAPI Test

describe("Customer Info - Success", () => {
    test("API Test - customer Login", async () => {
        const {customer, authToken} = await customerAPI.loginCustomer(customerInfo);
        expect(customer).toEqual(expect.any(Object));
        expect(authToken).toEqual(expect.any(String));
    })
    
    
    test("API Test - get customer info", async () => {
        const {customer, authToken} = await customerAPI.loginCustomer(customerInfo);
        customerAPI.token = authToken;
        const result = await customerAPI.getCustomer(customerInfo.username);
        expect(result).toEqual(expect.any(Object));
        expect(result.orders).toEqual(expect.any(Array));
    })
})
