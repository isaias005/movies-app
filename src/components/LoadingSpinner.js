import React from 'react';
import Icon from '@mdi/react';
import { mdiMovieRoll } from '@mdi/js';

const LoadingSpinner = () => {
  return (
    <div className="flex-column vertical--center horizontal--center loading-spinner">
      <Icon path={mdiMovieRoll} size={8} spin/>
    </div>
  );
}

export default LoadingSpinner;
