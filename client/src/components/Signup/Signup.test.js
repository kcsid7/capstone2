import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import Signup from "./Signup";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><Signup /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><Signup /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})