import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Divider, Button } from 'semantic-ui-react';
import { SET_BANNER, REMOVE_ORDER } from '../../store/type';
import OrderItem from '../orderItem/OrderItem';
import { placeOrder } from '../../api';

import './Styles.scss';

const Cart = ({ history, handleBanner }) => {
  
  let cartBody;
  const orders = useSelector(state => state.order.orders);
  const currentUser = useSelector(state => state.app.currentUser);
  const [ emptyCart, setEmptyCart ] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    setEmptyCart(orders.length === 0)
  }, [emptyCart, orders.length])


  const collectOrders = () => {
    return orders.map(order => order.id)
  }

  const handlePlaceOrder = () => {
    const orders = collectOrders()
    placeOrder(orders, localStorage.token)
    .then(data => {
      const { orders } = data
      for (let order of orders) {
        dispatch({ type: REMOVE_ORDER, payload: order })
      }
      handleBanner()
      dispatch({ type: SET_BANNER, payload: "Order completed! Thank you for shopping." })
      history.push('/dashboard')
    })
  }

  const collectPrices = () => {
    return orders.map(order => parseFloat(order.product.price))
  }

  const totalOrders = () => {
    return collectPrices().reduce((a,b) => a + b, 0)
  }

  const displayOrders = () => {
    return orders.map(order => (
      <Grid.Column key={`${order.product.name}-${order.product.price}`}>
        <OrderItem order={order} currentUser={currentUser} handleBanner={handleBanner}/>
      </Grid.Column>
    ))
  }

  if (emptyCart) {
    cartBody = <h2 className="cart__text">Your cart is empty</h2>
  } else {
    cartBody = displayOrders()
  }

    return (
      <Container className="cart">
        <h1 className="cart__title">Cart</h1>
        <Divider/>
        <Grid className="cart__grid">
          <Grid.Row columns={4}>
            {cartBody}
          </Grid.Row>
        </Grid>
        <Divider/>
        <div className="cart__orderOverview">
          <h2>Total: {totalOrders()}</h2>
          <Button inverted color="orange" onClick={handlePlaceOrder}>Place your order</Button>
        </div>
      </Container>
    )
}

export default withRouter(Cart);