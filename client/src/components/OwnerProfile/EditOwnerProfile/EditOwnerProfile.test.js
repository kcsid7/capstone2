import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import EditOwnerProfile from "./EditOwnerProfile";


// Smoke Test
test("Renders without crashing", () => {
    render(<BrowserRouter><EditOwnerProfile /></BrowserRouter>)
})


test("Count Button snapshot", () => {
    const { asFragment } = render(<BrowserRouter><EditOwnerProfile /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})