import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import Login from "./Login";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><Login /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><Login /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})