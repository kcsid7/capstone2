import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import SignupOwner from "./SignupOwner";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><SignupOwner /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><SignupOwner /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})