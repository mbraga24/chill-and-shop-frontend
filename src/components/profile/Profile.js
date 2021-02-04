import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Card, Image, Grid, Header, Icon, Divider } from 'semantic-ui-react'
import './Styles.scss';

const Profile = props => {

  const currentUser = useSelector(state => state.app.currentUser)
  
  return (
    <Container className="Profile">
        <Header as='h1' textAlign="center" color="blue" className="Profile__Header">Profile</Header>
        <Divider />
        <Grid stackable columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Grid divided>
                <Grid.Row stretched>
                  <Grid.Column>
                    <div className="Profile__AlignImage Circular">
                      <Image className="Profile__CircularImage" src={`./images/default-profile.jpg`} size='small' circular />
                    </div>
                    <Card centered>
                      <Card.Content>
                        <Card.Header textAlign="center">Details</Card.Header>
                        <Card.Description>
                          <div className="description">First Name: {currentUser.first_name} </div>
                          <div className="description">Last Name: {currentUser.last_name} </div>
                          <div className="description">Account Type: {currentUser.type} </div>
                          <div className="description">Email: {currentUser.email} </div>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content as={Link} to={`/inventory`}>
                          <Icon name='th' size="large"  />
                          Inventory
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
}

export default withRouter(Profile);