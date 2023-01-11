import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
export const ModalWindow = styled.div`
  max-width: calc(100vw - 128px);
  max-height: calc(100vh - 64px);
`;
export const ModalImage = styled.img`
  max-width: 800px;
  max-height: 600px;
  border-radius: 4px;
`;

export const ModalBtn = styled.button`
  position: absolute;
  top: 110px;
  right: 32px;
  background-color: 'aqua';
  transition: transform 250ms;
  border-radius: 50%;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: 'red';
  }
`;
