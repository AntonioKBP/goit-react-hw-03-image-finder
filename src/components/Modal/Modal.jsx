import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import { Component } from 'react';
import { ModalOverlay, ModalWindow, ModalBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDrop = e => {
    console.log(e.target);
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { onClose, children } = this.props;
    return createPortal(
      <>
        <ModalOverlay onclick={this.handleBackDrop}>
          <ModalBtn type="button" onClick={onClose}>
            x
          </ModalBtn>
          <ModalWindow>{children}</ModalWindow>
        </ModalOverlay>
      </>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};
