import dateFormatter from "./dateFormatter";

test("Date Formatter", () => {
    expect(dateFormatter("January 1 2022")).toBe("1-1-2022");
    expect(dateFormatter("11/12/2020")).toBe("11-12-2020");
    expect(dateFormatter("2023 December 01")).toBe("12-1-2023");
})