import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import EditMenuItemButton from "./EditMenuItemButton";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><EditMenuItemButton /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><EditMenuItemButton /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})