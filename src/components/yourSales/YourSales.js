import React from 'react';
// import { useSelector } from 'react-redux';
import { Container, Grid, Header, Divider } from 'semantic-ui-react'
import CardOrder from '../cardOrder/CardOrder';
import './Styles.scss';

const YourSales = props => {

  // const currentUser = useSelector(state => state.app.currentUser)
  
  const renderIncomingOrders = () => {
    return [1,2,3].map(oder => {
      return <CardOrder sales={true}/> 
    })
  }

  const renderShippedOrders = () => {
    return [1,2,3].map(oder => {
      return <CardOrder archive={true}/> 
    })
  }

  return (
    <Container className="yourSales">
        <Header as='h1' textAlign="center" color="blue" className="yourSales__Header">Your Sales</Header>
        <Divider />
        <Header as='h2' textAlign="left" color="blue" className="yourSales__Header">Prepare for shipping</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              {renderIncomingOrders()}
            </Grid.Column>
          </Grid.Row>
          <Header as='h2' textAlign="left" color="blue" className="yourSales__Header">Shipped Orders</Header>
          <Grid.Row>
            <Grid.Column>
              {renderShippedOrders()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Container>
    );
}

export default YourSales;