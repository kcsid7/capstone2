import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import TaxCalculator from "./TaxCalculator";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><TaxCalculator /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><TaxCalculator /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})