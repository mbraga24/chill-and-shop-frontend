import React, { useState } from 'react';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'

import './Styles.scss';

const Dashboard = () => {

  const [ activeItem, setActiveItem ] = useState("")
  const  handleItemClick = (e, { name }) => setActiveItem(name)

    return (
      <Container className="dashboard">
        <h1>Dashboard</h1>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='history'
                active={activeItem === 'history'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='finance'
                active={activeItem === 'finance'}
                onClick={handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
  )
}

export default Dashboard;