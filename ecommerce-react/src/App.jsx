import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'wouter';

import './styles.css';
import Navbar from "./Components/Navbar.jsx"
import HomePage from './Pages/HomePage.jsx';
import Footer from './Components/Footer.jsx'
import ProductsPage from './Pages/ProductPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import ShoppingCartPage from './Pages/ShoppingCartPage.jsx';
import { useFlashMessage } from "./FlashMessageStore.js";
import UserLogin from './Components/LoginComponent'
import Profile from './Pages/ProfilePage'

export default function App() {
  const { getMessage, clearMessage } = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }
      , 3000);

    return () => {
      clearTimeout(timer);
    };
  }
    , [flashMessage]);

  return (
    <>
      <Navbar />
      {flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`} role="alert">
          {flashMessage.message}
        </div>
      )}

      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/shoppingCart" component={ShoppingCartPage} />
        <Route path="/login" component={UserLogin}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
      <Footer />
    </>
  )
}
