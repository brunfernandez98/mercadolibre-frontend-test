import React from "react";

import { FaTimes } from "react-icons/fa";

import "./Modal.scss";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const stopToPropagate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={stopToPropagate}>
        <FaTimes className="modal-close-button" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
