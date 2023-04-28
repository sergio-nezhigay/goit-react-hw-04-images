import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { OverlayStyle, ModalStyle } from './Modal.styled';

export default function Modal({ onClose, children }) {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    <OverlayStyle onClick={() => onClose()}>
      <ModalStyle className="modal-content">{children}</ModalStyle>
    </OverlayStyle>,
    document.getElementById('modal-root')
  );
}
