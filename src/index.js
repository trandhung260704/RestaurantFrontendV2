import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Food from './Food';
import Login from './Login';
import Order from './order';
import Ingredient from './Ingredient';
import Discount from './Discount';
import Bill from './Bill';
import Profile from './Profile';
import Customer from './customer';
import Employee from './employee';
import ManageOrder from './manageOrder';
import Statistics from './Statistics';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './register';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="324365349-cvf0lkg4h1150vqrsk89fi83mb6ger6f.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Food" element={<Food />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Ingredient" element={<Ingredient />} />
          <Route path="/Discount" element={<Discount />} />
          <Route path="/Bill" element={<Bill />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/manageOrder" element={<ManageOrder />} />
          <Route path="/Statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
