import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
// import axios from "axios";

import Restaurant from "./Restaurant";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><Restaurant /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><Restaurant /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})