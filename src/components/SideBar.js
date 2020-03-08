import React from 'react';
import { Icon } from '@mdi/react';
import { mdiFace, mdiAlertDecagram, mdiHeart, mdiLogout } from '@mdi/js';
import { NavLink, useHistory } from 'react-router-dom';
import { withAuth } from '../hoc/Auth/context';

const SideBar = ({ auth, setLoading }) => {
  const history = useHistory();

  const onLogout = () => {
    setLoading(true);
    auth.logout()
      .then(res => {
        setLoading(false);
        history.push("/");
        return res;
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
  }

  if (!auth.currentUser) {
    return false;
  }

  return (
    <div className="side-bar text--light">
      <div className="container">
        <div className="flex-column navigation">
          <NavLink to="./user-profile" className="navigation__item" activeClassName="navigation__item--selected">
            <span className="flex-row vertical--center">
              <Icon path={mdiFace} size={1} className="icon--left icon--accent" />Perfil</span>
          </NavLink>
          <NavLink to="./movies" className="navigation__item" activeClassName="navigation__item--selected">
            <span className="flex-row vertical--center">
              <Icon path={mdiAlertDecagram} size={1} className="icon--left icon--accent" />Nuevos Lanzamientos</span>
          </NavLink>
          <NavLink to="./favorites" className="navigation__item" activeClassName="navigation__item--selected">
            <span className="flex-row vertical--center">
              <Icon path={mdiHeart} size={1} className="icon--left" />Favoritos</span>
          </NavLink>
          <button className="navigation__item" onClick={onLogout}>
            <span className="flex-row vertical--center">
              <Icon path={mdiLogout} size={1} className="icon--left" />Cerrar Sesion</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SideBar);
