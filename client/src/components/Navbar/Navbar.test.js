import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import Navbar from "./Navbar";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><Navbar /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><Navbar /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})