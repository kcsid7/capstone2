import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import RestaurantOrderDetails from "./RestaurantOrderDetails";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><RestaurantOrderDetails /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><RestaurantOrderDetails /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})