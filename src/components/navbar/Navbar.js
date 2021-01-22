import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Menu, Container, Icon } from 'semantic-ui-react';

import { LOGGED_IN } from '../../store/type';
import './Styles.scss';

const Navbar = ({ history, fixed }) => {
  
  const dispatch = useDispatch();
  const pathName = history.location.pathname.split("/")[1]
  const currentUser = useSelector(state => state.app.currentUser);
  const orders = useSelector(state => state.order.orders);
  const [ activeItem, setActiveItem ] = useState(pathName)
  const [ seller, setSeller ] = useState(false)
  const handleItemClick = (e, { name }) => { setActiveItem(name) }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.type === "Seller") {
        setSeller(true);
      } else {
        setSeller(false);
      }
    }
  }, [currentUser])

  useEffect(() => {
    setActiveItem(pathName)
  }, [pathName])

  const handleLogout = () => {
    dispatch({ type: LOGGED_IN, payload: null });
    localStorage.removeItem("token");
    history.push("/");
  }

  
  
  return (
    <Menu
      fixed={fixed ? 'top' : null}
      inverted={!currentUser}
      pointing={!fixed}
      secondary={!fixed}
      className={`${currentUser ? "activeUser" : "inactiveUser" } navbar`}
      size='large'
    >
      <Container>
        <>
          <Menu.Item 
            as={Link} 
            to={currentUser ? "/dashboard" : "/"}
            name={currentUser ? "dashboard" : "/"}
            active={activeItem === (currentUser ? "dashboard" : "")}
            onClick={handleItemClick}>{currentUser ? "Dashboard" : "Home"}</Menu.Item>
        </>

        {
          currentUser && 
          <>
          <Menu.Item 
              as={Link}
              to="/products"
              name="products"
              active={activeItem === 'products'}
              onClick={handleItemClick}>Products</Menu.Item>
            {
            seller && 
              <Menu.Item 
                as={Link}
                to="/inventory"
                name="inventory"
                active={activeItem === 'inventory'}
                onClick={handleItemClick}>Inventory</Menu.Item>
            }
          </>
        }
        <Menu.Item position='right'>
          {
            !currentUser ?
            <Button as={Link} to="/login" inverted={!currentUser} primary={currentUser}>
              Log in
            </Button> :
            <Button as={Link} to="/cart" icon animated='vertical' inverted secondary={true} labelPosition='left'>
              <Icon name='shop' />
              {orders.length}
            </Button>
          }
            <Button 
              as={Link} 
              to={`${currentUser ? "/" : "/signup"}`} 
              color={`${currentUser ? "purple" : null}`} 
              inverted={true} 
              secondary={currentUser}
              onClick={currentUser ? handleLogout : null}
              className="navbar__multifunctionBtn"> 
                {currentUser ? "Log out" : "Sign Up"}
              </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
export default withRouter(Navbar);