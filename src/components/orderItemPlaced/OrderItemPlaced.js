import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Image, Header, Grid, Card, Icon, Button, Dropdown, Divider } from 'semantic-ui-react'
import './Styles.scss';

const OrderItemPlaced = () => {

  const currentUser = useSelector(state => state.app.currentUser)
  const [ productPhoto, setProductPhoto ] = useState(false)
  const [ details, setDetails ] = useState(false)
  
    return (
        <Card className="orderItemPlaced">
          <Card.Content>
            <Card.Header>Product Title</Card.Header>
            {/* <Image src='./images/placeholder-product.png' circular size='tiny' verticalAlign='top' /> */}
            <Card.Description>
              Price: $12.99
            </Card.Description>
            <Card.Description>
              <div>
                Orders Placed: 2
              </div>
            </Card.Description>
            <Divider/>
            <Card.Description>
              Total for this order: $25.98
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Modal
              size="mini"
              open={details}
              onClose={() => setDetails(false)}
              onOpen={() => setDetails(true)}
              trigger={
                <Button color="blue" size="small"> 
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
                <Button color="blue" size="small">
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
            <Button color="blue" size="small"> 
              Shipped
            </Button>
          </Card.Content>
        </Card>
  )
}

export default OrderItemPlaced;