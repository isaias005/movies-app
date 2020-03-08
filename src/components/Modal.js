import React from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const Modal = ({ children, handleClose }) => {
  return (
    <div className="modal overflow-y--auto">
      <div className="modal-main overflow-y--auto">
        {children}
        <div className="form-group flex-row horizontal--center">
          <button className="button" onClick={handleClose}><Icon path={mdiClose} size={1} className="icon--left" />Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
