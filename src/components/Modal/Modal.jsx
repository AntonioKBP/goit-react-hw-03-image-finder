import { createPortal } from 'react-dom';
import { Component } from 'react';
import {
  ModalOverlay,
  ModalWindow,
  ModalImage,
  ModalBtn,
} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    // window.addEventListener('keydown');
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
    return createPortal(
      <>
        <ModalOverlay onclick={this.handleBackDrop}>
          <ModalWindow>
            <ModalImage src="" alt="" />
            <ModalBtn />
          </ModalWindow>
        </ModalOverlay>
      </>,
      modalRoot
    );
  }
}
