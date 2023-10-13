import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import FoodSearch from "./FoodSearch";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><FoodSearch /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><FoodSearch /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})