import React from 'react';
import { Icon } from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { Link } from 'react-router-dom';

const NotMatch = () => {
  return (
    <div className="not-match flex-column horizontal--center vertical--center">
      <h1 className="text--white"><span className="text--accent">Error 404</span> pagina no encontrada.</h1>
      <br />
      <Link className="button horizontal--center text--white" to="/"><Icon path={mdiArrowLeft} size={1} className="icon--left" />Volver</Link>
    </div>
  );
}

export default NotMatch;
