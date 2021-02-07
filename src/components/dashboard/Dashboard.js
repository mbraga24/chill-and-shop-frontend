import React, { useState } from 'react';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'
import YourProfile from '../yourProfile/YourProfile';
import YourOrders from '../yourOrders/YourOrders';
import YourSales from '../yourSales/YourSales';
import YourBusiness from '../yourBusiness/YourBusiness';

import './Styles.scss';

const Dashboard = () => {

  const [ activeItem, setActiveItem ] = useState("")
  const  handleItemClick = (e, { name }) => setActiveItem(name) 
  
  const displayTabComponent = () => {
    switch(activeItem) {
      case "profile":
        return <YourProfile/>
      case "sales":
        return <YourSales />
      case "business":
        return <YourBusiness/>
      case "orders":
        return <YourOrders/>
      default:
        return <YourProfile/>
    }
  }

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
                name='orders'
                active={activeItem === 'orders'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='business'
                active={activeItem === 'business'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='sales'
                active={activeItem === 'sales'}
                onClick={handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment> 
              {displayTabComponent()}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
  )
}

export default Dashboard;