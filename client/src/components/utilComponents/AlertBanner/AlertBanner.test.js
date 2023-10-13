import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import AlertBanner from './AlertBanner';


test("Renders the Alert Banner properly", () => {
    render(<BrowserRouter><AlertBanner /></BrowserRouter>);
})


test("Alert banner snapshot", () => {
    const { asFragment } = render(<BrowserRouter><AlertBanner /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})