import React from 'react';
// import { useSelector } from 'react-redux';
import { Image, Card, Button, Divider } from 'semantic-ui-react'
import './Styles.scss';

const OrderItemCard = ({ sales = true, archive = false }) => {

  // const currentUser = useSelector(state => state.app.currentUser)
  
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
              !sales ?
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
          <Card.Content className={"buttonContainer" + (sales ? "--seller" : "")}>
            {
            archive ?
              null :
              <Button fluid color={`${sales ? "orange" : "red"}`} size="small" className="orderItemCard__button"> 
                {sales ? "Shipped" : "Cancel"}
              </Button>
            }
            {
              !sales &&
              <>
                <Button fluid color="blue" size="small" className="orderItemCard__button" disabled> 
                  Leave Seller Feedback
                </Button> 
                <Button fluid color="olive" size="small" className="orderItemCard__button" disabled> 
                  Buy it again
                </Button> 
              </>
            }
          </Card.Content>
        </div>
      </Card>
  )
}

export default OrderItemCard;