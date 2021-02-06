import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStoreAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import './Styles.scss';

const HomepageHeading = ({ headers, currentUser }) => {

  const iconStore = <FontAwesomeIcon icon={faStoreAlt} size="1x" />
  const iconDoor = <FontAwesomeIcon icon={faDoorOpen} size="1x" />

  return(
    <div text className="homepageHeading">
      <h1 className="homepageHeading__mainHeader">{headers.header}</h1>
      <h2 className="homepageHeading__callAction">{headers.callAction}</h2>
      {
      !currentUser &&
        <div>
          <Button as={Link} to="/signup" primary size='huge'>
            {headers.buttonOne} {iconStore}
          </Button>
          <Button as={Link} to="/login" positive size='huge'>
            {headers.buttonTwo} {iconDoor}
          </Button>
        </div>
      }
    </div>
  )
}

export default HomepageHeading;