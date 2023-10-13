import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import RestaurantEditForm from "./RestaurantEditForm";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><RestaurantEditForm /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><RestaurantEditForm /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})