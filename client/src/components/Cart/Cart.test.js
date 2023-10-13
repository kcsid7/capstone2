import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import Cart from "./Cart";


// Smoke Test

test("Renders without crashing", () => {
    render(<BrowserRouter><Cart /></BrowserRouter>)
    debug();
})