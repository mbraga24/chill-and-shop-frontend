import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Card, Image, Grid, Header, Icon, Divider } from 'semantic-ui-react'
import OrderItemCard from '../orderItemCard/OrderItemCard';
import './Styles.scss';

const YourOrders = props => {

  const currentUser = useSelector(state => state.app.currentUser)

  return (
    <Container className="yourOrders">
      <Header as='h1' textAlign="center" color="blue" className="yourOrders__Header">Your Orders</Header>
      <Divider />
      <Grid className="yourOrders__grid">
        <Grid.Row>
          <Grid.Column>
            <OrderItemCard/>
            <OrderItemCard/>
            <OrderItemCard/>
            <OrderItemCard/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
}

export default withRouter(YourOrders);