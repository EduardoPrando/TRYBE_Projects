import React, { useState } from 'react';
import ClipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const FIVE_SEC = 5000;

export default function ShareBtn() {
  const history = useHistory();
  const { pathname } = history.location;

  const [copy, setCopy] = useState(false);

  function copyUrl(e) {
    e.preventDefault();
    ClipboardCopy(`http://localhost:3000${pathname}`);
    setCopy(true);
    setTimeout(() => setCopy(false), FIVE_SEC);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyUrl }
      >
        <img src={ shareIcon } alt="Compatilhar" width="30px" />
      </button>
      { copy ? <p>Link copiado!</p> : '' }
    </div>
  );
}
