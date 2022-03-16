import React from "react";
import { createPortal } from "react-dom";
import "../css/modal.css";

const Modal = ({ open, onClose, children }) => {
  return !open
    ? null
    : createPortal(
        <div className="modal_background" onClick={onClose}>
          <div className="modal_window" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.querySelector("#modal")
      );
};

export default Modal;
