import currencyFormatter from "./currencyFormatter";

test('currency formatter', () => {
    expect(currencyFormatter(10)).toBe("$10.00");
    expect(currencyFormatter(120.50)).toBe("$120.50");
});