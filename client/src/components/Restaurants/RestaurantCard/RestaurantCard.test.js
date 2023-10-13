import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import RestaruantCard from "./TaxCalculator";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><RestaruantCard /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><RestaruantCard /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})