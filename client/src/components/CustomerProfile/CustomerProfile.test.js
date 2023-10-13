import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import CustomerProfile from "./CustomerProfile";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><CustomerProfile /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><CustomerProfile /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})