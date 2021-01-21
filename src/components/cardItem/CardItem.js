import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Grid, Card, Icon, Button } from 'semantic-ui-react'
import { deleteProduct, createOrder } from '../../api';
import { REMOVE_PRODUCT, SET_BANNER, ADD_ORDER } from '../../store/type';
import ProductForm from '../productForm/ProductForm'

import './Styles.scss';

const CardItem = ({ item, currentUser, handleBanner }) => {

  const [ openDelete, setOpenDelete ] = useState(false);
  const [ openUpdate, setOpenUpdate ] = useState(false);
  const [ loader, setLoader ] = useState(false);
  const [ soldOut, setSoldOut ] = useState(false);
  const [ tempQuantity, setTempQuantity ] = useState(false);
  const { seller } = item
  const dispatch = useDispatch()

  useEffect(() => {
    setTempQuantity(item.quantity)
    setSoldOut(item.quantity === 0)
  }, [soldOut, tempQuantity])

  const addToCart = (item) => {
    setTempQuantity(prevState => tempQuantity - 1)
    createOrder(item.id, localStorage.token)
    .then(newOrder => {
      const { order } = newOrder
      dispatch({ type: ADD_ORDER, payload: order });
    })
    handleBanner()
    dispatch({ type: SET_BANNER, payload: "Item added to your cart!" });
  }

  const handleDelete = () => {
    setLoader(true)
    deleteProduct(item.id, localStorage.token)
    .then(data => {
      const { product, confirmation } = data;
      setTimeout(() => {
        handleBanner()
        dispatch({ type: REMOVE_PRODUCT, payload: product })
        dispatch({ type: SET_BANNER, payload: confirmation });
        setOpenDelete(false)
        setLoader(false)
      }, [1200])
    })
  }

  const isSeller = () => {
    return seller.email === currentUser.email
  }

    return (

      <Grid.Column className="cardItem" id="cardContainer">
        <Card className="cardItem__card">
          <div  role="img" 
                aria-label={item.name}
                title={item.name}
                className="cardItem__image" 
                style={{backgroundImage: `url(../images/placeholder-product.png)` }} />
          <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Description>
              Price: ${item.price}
            </Card.Description>
            <Card.Description>
              Qty: {tempQuantity}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div floated='left'>
              <Icon name='user' />
              {seller.first_name} {seller.last_name}
              { !isSeller() &&
                <Button floated='right' color="blue" disabled={soldOut} icon onClick={() => addToCart(item)}>
                  <Icon name='shopping cart' />
                </Button>
              }
            </div>
          </Card.Content>
          {
            currentUser && isSeller() && 
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
                  <ProductForm showAction={false} product={item}/>
                </Modal.Content>
              </Modal>
            </Card.Content>
          }
        </Card>
      </Grid.Column>
  )
}

export default CardItem;