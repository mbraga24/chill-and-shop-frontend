import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Image, Header, Grid, Card, Icon, Button, Dropdown, Divider } from 'semantic-ui-react'
import './Styles.scss';

const OrderItemCard = ({ action }) => {

  const currentUser = useSelector(state => state.app.currentUser)
  const [ productPhoto, setProductPhoto ] = useState(false)
  const [ details, setDetails ] = useState(false)
  
    return (
        <Card fluid className="orderItemCard">
          <div className="orderItemCard__wrapper">
            <Card.Content className="orderItemCard__productDetails">
              <div className="orderItemCard__main">
                <Card.Header className="orderItemCard__title">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Card.Header>
                <Image className="orderItemCard__image" src='./images/placeholder-product.png' size='small' verticalAlign='top' />
              </div>
              <div className="orderItemCard__additional">
                {
                  true ?
                <Card.Description className="orderItemCard__description">
                  <span alt="product description">
                    {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nisi quidem in minus assumenda nisi quidem in minus assumenda nisi quidem in minus assumenda in minus assumenda in minus assumenda rerum ut natus est hic enim deleniti temporibus molestiae obcaecati dolore dolores modi quis explicabo in minus assumenda in minus assumenda in minus assumenda in minus assumenda in minus assumenda. 60 words*/}
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nisi quidem in minus assumenda nisi quidem in minus assumenda nisi quidem in minus assumenda in minus assumenda in minus assumenda assumenda assumenda {/* 32 words */}
                  </span>
                </Card.Description>
                :
                <Card.Description className="orderItemCard__description">
                  <div alt="price">
                    Price: $12.99
                  </div>
                  <div alt="orders placed">
                    Orders Placed: 2
                  </div>
                  <Divider/>
                  <div alt="total for this order">
                    Total for this order: $25.98
                  </div>
                </Card.Description>
                }
              </div>
            </Card.Content>
            <Card.Content className="orderItemCard__buttonContainer">
                <Modal
                  size="mini"
                  open={details}
                  onClose={() => setDetails(false)}
                  onOpen={() => setDetails(true)}
                  trigger={
                    <Button fluid color="blue" size="small" className="orderItemCard__button"> 
                      Details
                    </Button> }
                  >
                  <Modal.Header>Product Details</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>
                        This is just a simple product description with details such as color, size, conditon and etc.
                      </p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button positive  onClick={() => setDetails(false)}>
                      Got it!
                    </Button>
                  </Modal.Actions>
                </Modal>
                <Modal
                  size="mini"
                  open={productPhoto}
                  onClose={() => setProductPhoto(false)}
                  onOpen={() => setProductPhoto(true)}
                  trigger={
                    <Button fluid color="blue" size="small" className="orderItemCard__button">
                      Image
                    </Button> }
                  >
                  <Modal.Header>Product Photo</Modal.Header>
                  <Modal.Content image>
                    <Image size='medium' src='./images/placeholder-product.png' wrapped />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button positive  onClick={() => setProductPhoto(false)}>
                      Got it!
                    </Button>
                  </Modal.Actions>
                </Modal>
                <Button fluid color="blue" size="small" className="orderItemCard__button"> 
                  Shipped
                </Button>
            </Card.Content>
          </div>
        </Card>
  )
}

export default OrderItemCard;