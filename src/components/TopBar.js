import React from 'react';
import { Icon } from '@mdi/react';
import { mdiMovieRoll} from '@mdi/js';
import { Link, useLocation } from 'react-router-dom';
import { withAuth } from '../hoc/Auth/context';

const TopBar = ({ auth }) => {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/signup") {
    return false;
  }

  if (!auth.currentUser) {
    return false;
  }

  return (
    <div className="top-bar text--white container">
      <div className="flex-row vertical--center">
        <div className="top-bar__branding">
          <Link to="/">
            <span className="text--bold flex-row vertical--center">
              <Icon path={mdiMovieRoll} size={1.5} className="icon--left" />MOVIES APP</span>
          </Link>
        </div>
        <div className="top-bar__spacing"></div>
        <div className="top-bar__user flex-row vertical--center">
          <span>{auth.currentUser.name}</span>
          <img src={auth.currentUser.photo} alt="Usuario" className="user-image icon--right" />
        </div>
      </div>
    </div>
  );
}

export default withAuth(TopBar);
