import getCurrentDateAndTime from "./getCurrentDateAndTime";


test("Get Current Date and Time", () => {
    const curDateAndTime = getCurrentDateAndTime();
    expect(getCurrentDateAndTime()).toEqual(expect.any(Array));
    expect(curDateAndTime.length).toEqual(2);
})