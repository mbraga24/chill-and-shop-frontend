import React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Visibility } from 'semantic-ui-react';
import HomepageHeading from '../homepageHeading/HomepageHeading';

import './Styles.scss';

const Home = ({ setFixed }) => {

  const currentUser = useSelector(state => state.app.currentUser)
  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)
  let headers = {}

  headers.header = "HmShop";
  headers.callAction = "Build, shop, manage, and more. From anywhere.";
  headers.buttonOne = "Create store";
  headers.buttonTwo = "Check your store";

    return (
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
        className="home"
      >
        <Segment
          className={`home__segment ${currentUser ? "home__userActive" : "home__userInactive"}`}
          textAlign='center'
          inverted={!currentUser}
          style={{ minHeight: 700,  padding: '1em 0em' }}
          vertical
        >
          <HomepageHeading headers={headers} currentUser={currentUser}/>
        </Segment>
      </Visibility>
  )
}

export default Home;