import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import PageNotFound from "./PageNotFound";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><PageNotFound /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><PageNotFound /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})