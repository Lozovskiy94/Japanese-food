import Header from './components/Layout/Header'
import React, { useState } from 'react'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';


function App() {

  const [cartIsVisible, setCartIsVisible] = useState(false)
  
  const showCartHandler = () => {
    setCartIsVisible(true)
  }

  const hideCartHandler = () => {
    setCartIsVisible(false)
  }
  
  return (

    <CartContextProvider>
      {cartIsVisible && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
