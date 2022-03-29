import { FC } from "react";
import { createPortal } from "react-dom";
import "../../css/modal.css"

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  return !open
    ? null
    : createPortal(
        <div className="modal_background" onClick={onClose}>
          <div className="modal_window" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.querySelector("#modal")!
      );
};

export default Modal;
