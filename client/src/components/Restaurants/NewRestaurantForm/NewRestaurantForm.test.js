import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import NewRestaurantForm from "./NewRestaurantForm";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><NewRestaurantForm /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><NewRestaurantForm /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})