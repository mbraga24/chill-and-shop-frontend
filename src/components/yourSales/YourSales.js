import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Card, Image, Grid, Header, Icon, Divider } from 'semantic-ui-react'
import OrderItemCard from '../orderItemCard/OrderItemCard';
import './Styles.scss';

const YourSales = props => {

  const currentUser = useSelector(state => state.app.currentUser)
  
  return (
    <Container className="yourSales">
        <Header as='h1' textAlign="center" color="blue" className="yourSales__Header">Your Sales</Header>
        <Divider />
        <Header as='h2' textAlign="left" color="blue" className="yourSales__Header">Prepare for shipping</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <OrderItemCard/>
              <OrderItemCard/>
              <OrderItemCard/>
              <OrderItemCard/>
            </Grid.Column>
          </Grid.Row>
          <Header as='h2' textAlign="left" color="blue" className="yourSales__Header">Shipped Orders</Header>
          <Grid.Row>
            <Grid.Column>
              <OrderItemCard/>
              <OrderItemCard/>
              <OrderItemCard/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Container>
    );
}

export default withRouter(YourSales);