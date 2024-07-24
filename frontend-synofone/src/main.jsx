import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// import css
import './css/style.css';
import './css/mobile.css';

// react router 
import { BrowserRouter } from 'react-router-dom';

// react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
