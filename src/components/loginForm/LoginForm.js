import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import useFormFields from '../../hooks/useFormFields';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { loginUser } from '../../api';
import { LOGGED_IN, SET_BANNER } from '../../store/type';
import './Styles.scss';

const LoginForm = ({ history, handleBanner, runAlert, credentialsAlert, alertStatus }) => {

  const iconDoor = <FontAwesomeIcon icon={faDoorOpen} size="2x" />
  const dispatch = useDispatch() 
  const [ fields, handleFields ] = useFormFields({
    email: "",
    password: ""
  })

  const handleSubmit = e => {
    e.preventDefault();

    loginUser(fields)
    .then(data => {
      if (data.error) {
        // console.log("LOGIN USER ERROR -->", data)
        const { error, header } = data;
        runAlert(header, error);
      } else {
        console.log("LOGIN USER", data)
        const { user, token, success } = data;
        localStorage.token = token;
        dispatch({ type: LOGGED_IN, payload: user });
        dispatch({ type: SET_BANNER, payload: success });
        handleBanner();
        history.push("/dashboard");
      }
    })
  }

  return (
    <Segment
      className="loginForm"
      textAlign='center'
      inverted
      style={{ minHeight: 700,  padding: '1em 0em' }}
      vertical
      >
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' className="loginForm__header" textAlign='center'>
            {iconDoor} Enter your store
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input 
                name="email"
                fluid 
                icon='user' 
                iconPosition='left' 
                placeholder='E-mail address' 
                onChange={handleFields}
              />
              <Form.Input
                name="password"
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={handleFields}
              />

              <Button color='blue' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          {alertStatus && credentialsAlert()}
          <Message>
            Don't have a store yet? <Link to="/signup">Sign Up</Link> or return <Link to="/">Home</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
export default withRouter(LoginForm);