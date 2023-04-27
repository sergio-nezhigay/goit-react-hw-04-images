import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { OverlayStyle, ModalStyle } from './Modal.styled';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <OverlayStyle onClick={() => onClose()}>
      <ModalStyle className="modal-content">{children}</ModalStyle>
    </OverlayStyle>,
    document.getElementById('modal-root')
  );
}
