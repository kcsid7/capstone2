import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import CountButton from "./CountButton";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><CountButton /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><CountButton /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})