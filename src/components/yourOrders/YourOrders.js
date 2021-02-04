import React from 'react';
// import { useSelector } from 'react-redux';
import { Container, Grid, Header, Divider } from 'semantic-ui-react'
import OrderItemCard from '../orderItemCard/OrderItemCard';
import './Styles.scss';

const YourOrders = ({ fullscreen = false }) => {

  // const currentUser = useSelector(state => state.app.currentUser)

  const renderYourOrders = () => {
    return [1,2,3].map(oder => {
      return <OrderItemCard sales={false}/> 
    })
  }

  return (
    <Container className={"yourOrders" + (fullscreen ? "--ordersPage" : "")}>
      <Header as='h1' textAlign="center" color="blue" className="yourOrders__Header">Your Orders</Header>
      <Divider />
      <Grid className="yourOrders__grid">
        <Grid.Row>
          <Grid.Column>
            {renderYourOrders()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
}

export default YourOrders;