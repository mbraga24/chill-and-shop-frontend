import React from 'react';
import { useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import HomepageHeading from '../homepageHeading/HomepageHeading';

import './Styles.scss';

const Home = () => {

  const currentUser = useSelector(state => state.app.currentUser)
  let headers = {
    header: "Chill&Shop",
    callAction: "Build, shop, manage, and more. From anywhere.",
    buttonOne: "Create store",
    buttonTwo: "Check your store"
  }

    return (
      <div className="home">
        <Segment
          className={`home__segment ${currentUser ? "home__userActive" : "home__userInactive"}`}
          textAlign='center'
          inverted={!currentUser}
          vertical
        >
          <HomepageHeading headers={headers} currentUser={currentUser}/>
        </Segment>
      </div>
  )
}

export default Home;