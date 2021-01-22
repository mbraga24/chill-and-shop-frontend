import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Inventory from './components/inventory/Inventory';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import Home from './components/home/Home';
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import 'semantic-ui-css/semantic.min.css'

import { LOGGED_IN, SET_ORDERS, SET_PRODUCTS, SET_BANNER } from './store/type';
import { autologin, getProducts, getOrders } from './api'
import { Header, Message, List } from 'semantic-ui-react';
import './styles/App.scss';

const App = () => {

  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ fixed, setFixed ] = useState(false)
  const [ header, setHeader ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState([]);
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const currentUser = useSelector(state => state.app.currentUser)
  const messageBanner = useSelector(state => state.app.messageBanner)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.token) {
      autologin(localStorage.token)
      .then(data => {
        if (!data.error) {
          console.log("AUTOLOGIN", data)
          dispatch({ type: LOGGED_IN, payload: data.user })
        }
      })
    }
  },[dispatch])

  useEffect(() => {
    getProducts(localStorage.token)
    .then(products => {
      console.log("PRODUCTS", products)
      dispatch({ type: SET_PRODUCTS, payload: products })
    })
  },[dispatch])

  // useEffect(() => {
  //   currentUser && getOrders(localStorage.token)
  //   .then(data => {
  //     const { orders } = data
  //     dispatch({ type: SET_ORDERS, payload: orders })
  //   })
  // },[dispatch, currentUser])


  const displayAlert = errors => {
    return errors.map((e, i) => (
      <List.Item key={e}>{e}</List.Item>
    ));
  }

  const credentialsAlert = () => {
    return <Message warning attached='bottom'>
      { 
        alertStatus && 
        <div>
          <Header as='h5' dividing>
            {header}
          </Header>
          <List bulleted style={{ textAlign: "left" }}>
            { displayAlert(errorMsg) }
          </List>
        </div>
      }
    </Message>
  }

  const runAlert = (header, error) => {
    setHeader(header);
    setErrorMsg(error);
    setAlertStatus(true);
    resetAlert();
  }

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false);
    }, 5000);
  }

  const handleDismiss = () => {
    setAlertStatus(false);
  }

  const handleBanner = () => {
    console.log("HANDLE BANNER")
    setAlertStatus(true);
    resetAlert();
    dispatch({ type: SET_BANNER, payload: "" });
  }

  return (
    <div className="App">
      <Navbar fixed={fixed} />
      { (currentUser && alertStatus) &&
        <Message attached='bottom' size="large" onDismiss={handleDismiss}>
          <Message.Content className="App__banner">
            <Message.Header>{messageBanner}</Message.Header>
          </Message.Content>
        </Message>
      }
      <Switch>
        {
          currentUser ?
          <React.Fragment>
            <Route path="/dashboard" render={ () => <Dashboard /> } />
            <Route path="/inventory" render={ () => <Inventory handleBanner={handleBanner} /> } />
            <Route path="/products" render={ () => <Products handleBanner={handleBanner} /> } />
            <Route path="/cart" render={ () => <Cart handleBanner={handleBanner}/> } />
          </React.Fragment> :
          <React.Fragment>
            <Route path="/" exact render={ () => <Home setFixed={setFixed}/> } />
            <Route path="/login" render={ () => <LoginForm 
                                                    handleBanner={handleBanner} 
                                                    runAlert={runAlert}
                                                    credentialsAlert={credentialsAlert}
                                                    alertStatus={alertStatus}/> } />
            <Route path="/signup" render={ () => <SignupForm 
                                                    handleBanner={handleBanner}
                                                    runAlert={runAlert}
                                                    credentialsAlert={credentialsAlert}
                                                    alertStatus={alertStatus} /> } />
          </React.Fragment>
        }
      </Switch>
    </div>
  );
}

export default App;
