import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Divider, Button } from 'semantic-ui-react';
import CardProduct from '../cardProduct/CardProduct';
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
    setLoader(true)
    deleteOrderItem(productId)
    .then(data => {
      const { orderItem, orderTotal, confirmation } = data;
      setTimeout(() => {
        handleBanner();
        dispatch({ type: REMOVE_ORDER, payload: orderItem.id });
        dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
        dispatch({ type: SET_BANNER, payload: confirmation });
        setLoader(false);
      }, [1500])
    })
  }

  const updateCart = (value, orderItemId) => {
    updateOrderItem(orderItemId, value)
    .then(data => {
      const { orderItem, orderTotal, confirmation } = data;
      handleBanner();
      dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
      dispatch({ type: UPDATE_ORDER, payload: orderItem });
      dispatch({ type: SET_BANNER, payload: confirmation });
    })
  };

  const displayOrders = () => {
    return orders.map(orderItem => (
      <CardProduct 
        key={`${orderItem.title}-${orderItem.id}`} 
        productData={ { product: orderItem.product, orderItem } } 
        currentUser={currentUser}
        removeFunction={removeFromCart}
        updateFunction={updateCart}
        loader={loader}
        quantityOptions={checkProductQuantity(orderItem.product.quantity)}
        soldOut={isSoldOut(orderItem.product)}
        inShoppingCart={true}
        />
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
        <div className="cart__gridGallery">
          {cartBody}
        </div>
        <Divider/>
        <div className="cart__orderOverview">
          <h2>Total: {totalOrder}</h2>
          <Button inverted color="orange" onClick={handlePlaceOrder}>Place your order</Button>
        </div>
      </Container>
    )
}

export default withRouter(Cart);