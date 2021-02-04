import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Card, Image, Grid, Header, Icon, Divider } from 'semantic-ui-react'
import './Styles.scss';

const YourBusiness = props => {

  const currentUser = useSelector(state => state.app.currentUser)
  
  return (
    <Container className="yourBusiness">
      <Header as='h1' textAlign="center" color="blue" className="yourBusiness__Header">Your Business</Header>
      <Divider />
    </Container>
    );
}

export default withRouter(YourBusiness);