import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HomepageHeading from '../homepageHeading/HomepageHeading';
import { Sidebar, Segment, Button, Menu, Container, Icon } from 'semantic-ui-react';
import './Styles.scss';

const MobileContainer = ({ Media, handleBanner, runAlert, credentialsAlert, alertStatus, setFixed}) => {
  
  const [ sidebarOpened, setSidebarOpened ] = useState(false)
  const currentUser = useSelector(state => state.app.currentUser)
  let headers = {}
  headers.header = "HmShop";
  headers.callAction = "Build, shop, manage, and more. From anywhere.";
  headers.buttonOne = "Create store";
  headers.buttonTwo = "Check your store";

  const handleSidebarHide = () => { setSidebarOpened(false) }
  const handleToggle = () => { setSidebarOpened(true) }

    return (
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      SHOP IN
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      SHOP UP
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
  
                <HomepageHeading headers={headers} currentUser={currentUser}/>
  
            </Segment>
              {/* SHIT NEEDS TO GO HERE */}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}


export default MobileContainer;