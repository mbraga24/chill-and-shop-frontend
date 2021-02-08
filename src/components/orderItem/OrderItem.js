import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Grid, Card, Icon, Button, Dropdown, Divider } from 'semantic-ui-react'
import { deleteOrderItem, updateOrderItem } from '../../api';
import { REMOVE_ORDER, UPDATE_TOTAL_ORDER, SET_BANNER, UPDATE_ORDER } from '../../store/type';
import ModalQuestion from '../modalQuestion/ModalQuestion';
import './Styles.scss';

const OrderItem = ({ orderProduct, soldOut = false, quantityOptions = 0, currentUser, handleBanner }) => {

  const [ openDelete, setOpenDelete ] = useState(false);
  const [ loader, setLoader ] = useState(false);
  const { product } = orderProduct;
  const sellerName = `${product.seller.first_name} ${product.seller.last_name}`;
  const dispatch = useDispatch();

  const updateCart = (e, {value}) => {
    updateOrderItem(orderProduct.id, value)
    .then(data => {
      const { orderItem, orderTotal, confirmation } = data;
      handleBanner();
      dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
      dispatch({ type: UPDATE_ORDER, payload: orderItem });
      dispatch({ type: SET_BANNER, payload: confirmation });
    })
  };

  const removeFromCart = () => {
    setLoader(true)
    deleteOrderItem(orderProduct.id)
    .then(data => {
      const { orderItem, orderTotal, confirmation } = data;
      setTimeout(() => {
        handleBanner();
        dispatch({ type: REMOVE_ORDER, payload: orderItem.id });
        dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
        dispatch({ type: SET_BANNER, payload: confirmation });
        setOpenDelete(false);
        setLoader(false);
      }, [1500])
    })
  }
  
    return (
      <Grid.Column className="orderItem">
        <Card>
          <img src={`${product.image_url}`} alt={product.title} className="orderItem__image" />
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
                  onChange={updateCart}
                />
              </div>
            </Card.Description>
            <Divider/>
            <Card.Description>
              Total for this order: ${orderProduct.total_price}
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
              <ModalQuestion deleteAction={true} cartAction={true} performAction={removeFromCart} openModal={openDelete} setOpenModal={setOpenDelete} loader={loader}/>
            </Card.Content>
          }
        </Card>
      </Grid.Column>
  )
}

export default OrderItem;