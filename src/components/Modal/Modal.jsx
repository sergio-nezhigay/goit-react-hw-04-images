import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayStyle, ModalStyle } from './Modal.styled';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    // no need, as on any click should be closed

    // if (event.target === event.currentTarget) {
    //   this.props.onClose();
    // }

    this.props.onClose();
  };

  render() {
    return ReactDOM.createPortal(
      <OverlayStyle onClick={this.handleBackDropClick}>
        <ModalStyle className="modal-content">{this.props.children}</ModalStyle>
      </OverlayStyle>,
      document.getElementById('modal-root')
    );
  }
}

export default Modal;
