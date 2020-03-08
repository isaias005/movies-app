import React from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { useSpring, animated } from 'react-spring';

const Modal = ({ children, handleClose }) => {
  const props = useSpring({
    from: { transform: 'translate(-50%, -50%) scale(0)', },
    to: { transform: 'translate(-50%, -50%) scale(1)' }
  })
  return (
    <div className="modal overflow-y--auto">
      <animated.div className="modal-main" style={props}>
        {children}
        <div className="form-group flex-row horizontal--center">
          <button className="button" onClick={handleClose}><Icon path={mdiClose} size={1} className="icon--left" />Cerrar</button>
        </div>
      </animated.div>
    </div>
  );
}

export default Modal;
