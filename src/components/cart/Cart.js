import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Divider, Button } from 'semantic-ui-react';
import { SET_BANNER, SET_ORDERS, UPDATE_TOTAL_ORDER } from '../../store/type';
import OrderItem from '../orderItem/OrderItem';
import { placeOrder } from '../../api';

import './Styles.scss';

const Cart = ({ history, handleBanner }) => {
  
  let cartBody;
  const orders = useSelector(state => state.order.orders);
  const totalOrder = useSelector(state => state.order.totalOrder);
  const currentUser = useSelector(state => state.app.currentUser);

  const [ emptyCart, setEmptyCart ] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    setEmptyCart(orders.length === 0)
  }, [emptyCart, orders.length])

  const isSoldOut = product => {
    return product.quantity === 0
  }

  const checkProductQuantity = quantity => {
    let options = [];
    for (let qty = 1; qty <= quantity; qty++) {
      options.push({ key: qty, text: qty.toString(), value: qty });
    }
    return options;
  }

  const handlePlaceOrder = () => {
    placeOrder()
    .then(r => r.json())
    .then(data => {
      handleBanner()
      const { confirmation } = data
      if (data.error) {
        dispatch({ type: SET_BANNER, payload: confirmation })
      } else {
        dispatch({ type: SET_ORDERS, payload: [] })
        dispatch({ type: UPDATE_TOTAL_ORDER, payload: 0 })
        dispatch({ type: SET_BANNER, payload: confirmation })
      }
      history.push('/dashboard')
    })
  }

  const displayOrders = () => {
    return orders.map(orderProduct => (
      <Grid.Column key={`${orderProduct.id}`}>
        <OrderItem 
          orderProduct={orderProduct} 
          soldOut={isSoldOut(orderProduct)}
          quantityOptions={checkProductQuantity(orderProduct.product.quantity)}
          currentUser={currentUser} 
          handleBanner={handleBanner}/>
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
          <h2>Total: {totalOrder}</h2>
          <Button inverted color="orange" onClick={handlePlaceOrder}>Place your order</Button>
        </div>
      </Container>
    )
}

export default withRouter(Cart);