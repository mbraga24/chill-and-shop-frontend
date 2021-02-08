import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Divider, Button } from 'semantic-ui-react';
import OrderItem from '../orderItem/OrderItem';
import { placeOrder, deleteOrderItem, updateOrderItem } from '../../api';
import { REMOVE_ORDER, SET_ORDERS, UPDATE_TOTAL_ORDER, SET_BANNER, UPDATE_ORDER } from '../../store/type';

import './Styles.scss';

const Cart = ({ history, handleBanner }) => {
  
  let cartBody;
  const orders = useSelector(state => state.order.orders);
  const totalOrder = useSelector(state => state.order.totalOrder);
  const currentUser = useSelector(state => state.app.currentUser);

  const [ loader, setLoader ] = useState(false);
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

  const removeFromCart = (productId) => {
    console.log("REMOVE FROM CART", productId)
    // setLoader(true)
    // deleteOrderItem(productId)
    // .then(data => {
    //   const { orderItem, orderTotal, confirmation } = data;
    //   setTimeout(() => {
    //     handleBanner();
    //     dispatch({ type: REMOVE_ORDER, payload: orderItem.id });
    //     dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
    //     dispatch({ type: SET_BANNER, payload: confirmation });
    //     setOpenDelete(false);
    //     setLoader(false);
    //   }, [1500])
    // })
  }

  const updateCart = (value, productId) => {
    
    console.log("UPDATE CART")
    console.log("value", value)
    console.log("productId", productId)
    // updateOrderItem(orderProduct.id, value)
    // .then(data => {
    //   const { orderItem, orderTotal, confirmation } = data;
    //   handleBanner();
    //   dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
    //   dispatch({ type: UPDATE_ORDER, payload: orderItem });
    //   dispatch({ type: SET_BANNER, payload: confirmation });
    // })
  };

  const displayOrders = () => {
    return orders.map(product => (
      <Grid.Column key={`${product.id}`}>
        {/* <OrderItem 
          product={product} 
          soldOut={isSoldOut(product)}
          quantityOptions={checkProductQuantity(product.product.quantity)}
          currentUser={currentUser} 
          handleBanner={handleBanner}/> */}

        <CardProduct 
          key={`${product.title}-${product.id}`} 
          thisProduct={product} 
          currentUser={currentUser}
          loader={loader}
          removeFunction={removeFromCart}
          updateFunction={updateCart}
          placeOrder={true}
          />
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