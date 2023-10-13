import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import FoodSearchMenuItem from './FoodSearchMenuItem';


test("Renders the Food Search Menu Item properly", () => {
    render(<BrowserRouter><FoodSearchMenuItem /></BrowserRouter>);
})


test("FoodSearchMenuItem snapshot", () => {
    const { asFragment } = render(<BrowserRouter><FoodSearchMenuItem /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})