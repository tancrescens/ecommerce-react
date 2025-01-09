import React, { useState } from 'react'
import { Switch, Route, Link } from 'wouter';
import './styles.css';
import Navbar from "./Components/Navbar.jsx"
import HomePage from './Pages/HomePage.jsx';
import Footer from './Components/Footer.jsx'
import ProductsPage from './Pages/ProductPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';

export default function App() {

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
      <Footer />
    </>
  )
}
