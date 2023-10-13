import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import { TextEncoder, TextDecoder} from "util";


import App from './App';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

test('renders App properly', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
});



