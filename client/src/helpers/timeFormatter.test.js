import timeFormatter from "./timeFormatter";


test("Time Formatter Test", () => {
    expect(timeFormatter("23:05:30")).toBe("11:05 PM");
    expect(timeFormatter("3:05:30")).toBe("3:05 AM");
    expect(timeFormatter("12:15:30")).toBe("12:15 PM");
    expect(timeFormatter("13:15:30")).toBe("1:15 PM");
    expect(timeFormatter("1:15:30")).toBe("1:15 AM");
    expect(timeFormatter("00:00:30")).toBe("12:00 AM");
})