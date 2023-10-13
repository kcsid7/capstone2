import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import RestaurantEdit from "./RestaurantEdit";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><RestaurantEdit /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><RestaurantEdit /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})