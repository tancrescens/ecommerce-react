import React, { useState } from 'react'
import './styles.css';
import Navbar from "./Components/Navbar.jsx"
import HomePage from './Pages/HomePage.jsx';
import Footer from './Components/Footer.jsx'

export default function App() {

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
      <HomePage />
      <Footer/>
    </>
  )
}
