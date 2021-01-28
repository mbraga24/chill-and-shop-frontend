import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Grid, Card, Icon, Button, Dropdown } from 'semantic-ui-react'
import { deleteProduct, createOrder } from '../../api';
import { REMOVE_PRODUCT, SET_BANNER, ADD_ORDER, UPDATE_TOTAL_ORDER } from '../../store/type';
import ProductForm from '../productForm/ProductForm'

import './Styles.scss';

const CardProduct = ({ thisProduct, selected = false, soldOut = false, quantityOptions, currentUser, handleBanner }) => {

  let isAvailable = soldOut || selected ? true : false;
  let cartButtonOptions = soldOut ? "Sold out" : selected ? "Added to cart" : <Icon name='shopping cart' />;
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ openUpdate, setOpenUpdate ] = useState(false);
  const [ notShopper, setNotShopper ] = useState(false);
  const [ loader, setLoader ] = useState(false);
  const { seller } = thisProduct

  const dispatch = useDispatch()

  useEffect(() => {
    setNotShopper(seller.email !== currentUser.email)
  }, [notShopper])

  const addToCart = (item) => {
    createOrder(item, localStorage.token)
    .then(newOrder => {
      const { orderItem, orderTotal, confirmation } = newOrder;
      handleBanner();
      dispatch({ type: ADD_ORDER, payload: orderItem });
      dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
      dispatch({ type: SET_BANNER, payload: confirmation });
    })
  }

  const handleDelete = () => {
    setLoader(true)
    deleteProduct(thisProduct.id, localStorage.token)
    .then(data => {
      const { product, confirmation } = data;
      dispatch({ type: REMOVE_PRODUCT, payload: product })
      dispatch({ type: SET_BANNER, payload: confirmation });
      setTimeout(() => {
        handleBanner()
        setLoader(false)
        setOpenDelete(false)
      }, [1000])
    })
  }

    return (
      <Grid.Column className="cardItem" id="cardContainer">
        <Card className="cardItem__card">
          <div  role="img" 
                aria-label={thisProduct.title}
                title={thisProduct.title}
                className="cardItem__image" 
                style={{backgroundImage: `url(${thisProduct.image_url})` }} />
          <Card.Content>
            <Card.Header>{thisProduct.title}</Card.Header>
            <Card.Description>
              Price: ${thisProduct.price}
            </Card.Description>
            <Card.Description>
              Qty: {thisProduct.quantity}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div floated='left'>
              <Icon name='user' />
              {seller.first_name} {seller.last_name}
            </div>
            <div>
            { 
              notShopper && 
              <>
                <Dropdown 
                  disabled={isAvailable}
                  compact
                  selection 
                  placeholder='Quantity' 
                  options={quantityOptions} 
                />
                <Button floated='right' color="blue" disabled={isAvailable} icon onClick={() => addToCart(thisProduct)}>
                  {cartButtonOptions}
                </Button>
              </>
            }
            </div>
          </Card.Content>
          {
            currentUser && !notShopper && 
            <Card.Content textAlign='center' extra>
              <Modal
                closeIcon
                size="mini"
                dimmer={"inverted"}
                open={openDelete}
                trigger={
                  <Button inverted color="red" icon>
                    <Icon name='trash' />
                  </Button>
                }
                onClose={() => setOpenDelete(false)}
                onOpen={() => setOpenDelete(true)}
              >
                <Header icon='trash' content='Please confirm' />
                <Modal.Content>
                  <p>
                    Are you sure you want to delete this product?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  {
                  !loader && 
                  <Button color='red' onClick={() => setOpenDelete(false)}>
                    <Icon name='remove' /> No
                  </Button>
                  }
                  <Button color='green' loading={loader} onClick={handleDelete}>
                    <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
              <Modal
                closeIcon
                size="small"
                dimmer={"inverted"}
                open={openUpdate}
                trigger={
                  <Button inverted color="green" icon>
                    <Icon name='edit' />
                  </Button>
                }
                onClose={() => setOpenUpdate(false)}
                onOpen={() => setOpenUpdate(true)}
              >
                <Header icon='edit' content='Update Product' />
                <Modal.Content>
                  <ProductForm showAction={false} product={thisProduct}/>
                </Modal.Content>
              </Modal>
            </Card.Content>
          }
        </Card>
      </Grid.Column>
  )
}

export default CardProduct;