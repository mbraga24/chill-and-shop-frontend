import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Grid, Card, Icon, Button, Dropdown, Divider } from 'semantic-ui-react'

import { deleteOrder } from '../../api';
import { REMOVE_ORDER, UPDATE_TOTAL_ORDER, SET_BANNER } from '../../store/type';
import './Styles.scss';

const OrderItem = ({ orderProduct, soldOut = false, quantityOptions = 0, currentUser, handleBanner }) => {

  const [ open, setOpen ] = useState(false);
  const [ loader, setLoader ] = useState(false);
  const [ quantity, setQuantity ] = useState(0);
  const { product } = orderProduct
  const sellerName = `${product.seller.first_name} ${product.seller.last_name}`
  const dispatch = useDispatch()

  const chooseQuantity = (e, {value}) => {setQuantity(value)};

  const removeFromCart = () => {
    setLoader(true)
    deleteOrder(orderProduct.id)
    .then(data => {
      console.log("REMOVE FROM CART", data)
      const { orderItem, orderTotal, confirmation } = data;
      setTimeout(() => {
        handleBanner()
        dispatch({ type: REMOVE_ORDER, payload: orderItem.id });
        dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
        dispatch({ type: SET_BANNER, payload: confirmation });
        setOpen(false)
        setLoader(false)
      }, [1500])
    })
  }

  console.log("soldOut", soldOut)
  console.log("quantityOptions", quantityOptions)
  
    return (
      <Grid.Column className="orderItem" id="cardContainer">
        <Card className="orderItem__card">
          <div  role="img" 
                aria-label={product.title}
                title={product.title}
                className="orderItem__image" 
                style={{backgroundImage: `url(${product.image_url})` }} />
          <Card.Content>
            <Card.Header>{product.title}</Card.Header>
            <Card.Description>
              Price: ${orderProduct.unit_price}
            </Card.Description>
            <Card.Description className="orderItem__quantityBlock">
              <div>
                Qty: {orderProduct.quantity}
              </div>
              <div>
                <Dropdown 
                  float="right"
                  name="quantity"
                  disabled={soldOut}
                  compact
                  selection 
                  placeholder='Update qty' 
                  options={quantityOptions} 
                  onChange={chooseQuantity}
                />
              </div>
            </Card.Description>
            <Divider/>
            <Card.Description>
              Total for this total: ${orderProduct.total_price}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div floated='left'>
              <Icon name='user' />
              {sellerName}
            </div>
          </Card.Content>
          {
            currentUser && 
            <Card.Content extra>
              <Modal
                closeIcon
                size="mini"
                dimmer={"inverted"}
                open={open}
                trigger={
                  <Button inverted color="red" icon onClick={() => setOpen(true)}>
                    <Icon name='remove' /> Remove order
                  </Button>
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              >
                <Header icon='trash' content='Please confirm' />
                <Modal.Content>
                  <p>
                    Are you sure you want to remove this item from your cart?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  {
                  !loader && 
                  <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                  </Button>
                  }
                  <Button color='green' loading={loader} onClick={removeFromCart}>
                    <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            </Card.Content>
          }
        </Card>
      </Grid.Column>
  )
}

export default OrderItem;