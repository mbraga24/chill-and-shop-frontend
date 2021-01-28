import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Grid, Card, Icon, Button } from 'semantic-ui-react'

import { deleteOrder } from '../../api';
import { REMOVE_ORDER, SET_BANNER } from '../../store/type';
import './Styles.scss';

const OrderItem = ({ order, currentUser, handleBanner }) => {

  console.log("OrderItem", order)
  const [ open, setOpen ] = useState(false);
  const [ loader, setLoader ] = useState(false);
  const { product } = order
  const sellerName = `${product.seller.first_name} ${product.seller.last_name}`
  
  const dispatch = useDispatch()

  const removeFromCart = () => {
    setLoader(true)
    deleteOrder(order.id, localStorage.token)
    .then(data => {
      const { order, confirmation } = data;
      setTimeout(() => {
        dispatch({ type: REMOVE_ORDER, payload: order.id })
        handleBanner()
        dispatch({ type: SET_BANNER, payload: confirmation });
        setLoader(false)
        setOpen(false)
      }, [2000])
    })
  }
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
              Price: ${order.unit_price}
            </Card.Description>
            <Card.Description>
              Total Price: ${order.total_price}
            </Card.Description>
            <Card.Description>
              Qty: {order.quantity}
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
            <Card.Content textAlign='center' extra>
              <Modal
                closeIcon
                size="mini"
                dimmer={"inverted"}
                open={open}
                trigger={
                  <Button inverted color="red" icon onClick={() => setOpen(true)}>
                    <Icon name='cancel' />
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
              <Button inverted disabled color="blue" icon>
                <Icon name='add' />
              </Button>
              <Button inverted disabled color="orange" icon>
                <Icon name='minus' />
              </Button>
            </Card.Content>
          }
        </Card>
      </Grid.Column>
  )
}

export default OrderItem;