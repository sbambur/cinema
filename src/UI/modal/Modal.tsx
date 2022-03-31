import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import "../../css/modal.css";

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
      <div className="modal_background" onClick={onClose}>
        <div className="modal_window" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      modalElement
    )
  );
};

export default Modal;
