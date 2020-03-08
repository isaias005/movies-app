import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { withAuth } from '../../hoc/Auth';

const UserProfile = ({ auth, setLoading }) => {
  const [userEmail, setUserEmail] = useState(auth.currentUser.email);
  const [userName, setUserName] = useState(auth.currentUser.name);
  const [userPhoto, setUserPhoto] = useState(auth.currentUser.photo);

  const handleUpdate = () => {
    setLoading(true);

    if (!userEmail || !userName || !userPhoto) {
      console.log("Rellena todos los campos");
      setLoading(false);
      return false;
    }

    if (!(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/.test(userPhoto))) {
      console.log("Inserta un URL de foto valido");
      setLoading(false);
      return false;
    }

    auth.updateCurrentUser(userEmail, userName, userPhoto)
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }
  return (
    <div className="content-container text--white">
      <h1 className="text--center">Perfil</h1>
      <div className="user-info login-form margin--auto">
        <div className="form-group flex-column">
          <img src={userPhoto} alt="Usuario" className="profile-image icon--right" />
          <label htmlFor="userPhoto">Foto</label>
          <input className="input text--white" type="text" name="userPhoto" value={userPhoto} onChange={(e) => setUserPhoto(e.target.value)} />
        </div>
        <div className="form-group flex-column">
          <label htmlFor="userEmail">Email</label>
          <input className="input text--white" type="text" name="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        </div>
        <div className="form-group flex-column">
          <label htmlFor="userName">Nombre</label>
          <input className="input text--white" type="text" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="form-group flex-column vertical--center">
          <button className="button" onClick={handleUpdate}><Icon path={mdiContentSave} size={1} className="icon--left icon--accent" />Guardar</button>
        </div>
      </div>
    </div >
  );
}

export default withAuth(UserProfile);
