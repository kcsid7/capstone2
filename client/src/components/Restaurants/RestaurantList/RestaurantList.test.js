import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import RestaurantList from "./RestaurantList";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><RestaurantList /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><RestaurantList /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})