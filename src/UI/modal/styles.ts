import styled, { keyframes } from "styled-components";
import { baseTheme } from "styles/theme";

const appearance = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalModel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #353535b7;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${baseTheme.order.modal};
  animation: ${appearance} ${baseTheme.durations.ms200}ms ease-out;
`;

export const ModalContainer = styled.div`
  background: ${baseTheme.colors.primary};
  box-shadow: ${baseTheme.shadow};
  padding: 25px 40px;
  border-radius: ${baseTheme.borderRadius};
  width: ${baseTheme.sizes.modal.width}px;
`;

export const ModalInput = styled.input`
  display: block;
  border-radius: ${baseTheme.borderRadius};
  border: none;
  outline: none;
  padding: 8px;
  margin: 7px 0;
`;

export const ModalSelect = styled.select`
  display: block;
  border-radius: ${baseTheme.borderRadius};
  border: none;
  outline: none;
  padding: 8px;
  margin: 7px 0;
`;

export const ErrorMessage = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  margin-bottom: 10px;
  color: ${baseTheme.colors.danger};
`;
