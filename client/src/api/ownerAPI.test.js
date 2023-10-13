import ownerAPI from "./ownerAPI";
import { ownerInfo } from "./authInfo";

// ownerAPI Test

describe("Owner Info - Success", () => {
    test("API Test - owner Login", async () => {
        const {owner, authToken} = await ownerAPI.loginOwner(ownerInfo);
        expect(owner).toEqual(expect.any(Object));
        expect(authToken).toEqual(expect.any(String));
    })
    
    
    test("API Test - get owner info", async () => {
        const {owner, authToken} = await ownerAPI.loginOwner(ownerInfo);
        ownerAPI.token = authToken;
        const result = await ownerAPI.getOwner(ownerInfo.username);
        expect(result).toEqual(expect.any(Object));
        expect(result.restaurants).toEqual(expect.any(Array));
    })
})