import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import RestaurantOrderDetailsEdit from "./RestaurantOrderDetailsEdit";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><RestaurantOrderDetailsEdit /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><RestaurantOrderDetailsEdit /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})