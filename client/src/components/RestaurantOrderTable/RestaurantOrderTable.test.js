import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import RestaurantOrderTable from "./RestaurantOrderTable";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><RestaurantOrderTable /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><RestaurantOrderTable /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})