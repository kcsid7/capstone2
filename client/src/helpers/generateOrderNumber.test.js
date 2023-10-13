import generateOrderNumber from "./generateOrderNumber";



test("Order Number Generator", () => {
    expect(generateOrderNumber()).toEqual(expect.any(String));
})