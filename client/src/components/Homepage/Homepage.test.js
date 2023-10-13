import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import Homepage from "./Homepage";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><Homepage /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><Homepage /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})