import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import * as S from "UI/modal/styles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  const modalElement = document.querySelector("#modal");

  return (
    modalElement &&
    createPortal(
      <S.ModalModel onClick={onClose}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          {children}
        </S.ModalContainer>
      </S.ModalModel>,
      modalElement
    )
  );
};

export default Modal;
