import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import OwnerProfile from "./OwnerProfile";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><OwnerProfile /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><OwnerProfile /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})