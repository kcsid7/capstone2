import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import TipCalculator from "./TipCalculator";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><TipCalculator /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><TipCalculator /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})