import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Food from './Food';
import Login from './Login';
import Order from './order'
import Ingredient from './Ingredient';
import Discount from './Discount'
import Bill from './Bill'
import Profile from './Profile';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Food" element={<Food/>}/>
                <Route path="/Order" element={<Order/>}/>
                <Route path="/Ingredient" element={<Ingredient/>}/>
                <Route path="/Discount" element={<Discount/>}/>
                <Route path="/Bill" element={<Bill/>}/>
                <Route path="/Profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
