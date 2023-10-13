import restaurantAPI from "./restaurantAPI";
import { ownerInfo } from "./authInfo";

// ownerAPI Test

describe("Get Restaurant Info", () => {
    test("Get All Restaurants", async () => {
        const result = await restaurantAPI.getAllRestaurants();
        expect(result).toEqual(expect.any(Array));
    })
    
    test("Get a Particular Restaurant's Info", async function() {
        const result = await restaurantAPI.getRestaurant(3);
        expect(result).toEqual(expect.any(Object));
        expect(result.name).toEqual(expect.any(String));
        expect(result).toHaveProperty('menu');
    })

})


describe("Food Search Test", () => {
    test("Food Search - Pizza", async () => {
        const result = await restaurantAPI.queryMenuItem("Pizza");
        expect(result).toEqual(expect.any(Array));
    })
})