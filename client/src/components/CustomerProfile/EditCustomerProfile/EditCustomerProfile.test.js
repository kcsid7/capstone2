import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import EditCustomerProfile from "./EditCustomerProfile";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><EditCustomerProfile /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><EditCustomerProfile /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})