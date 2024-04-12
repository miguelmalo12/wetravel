import "./Modal.scss";
import closeIcon from "../../assets/icons/cross.svg";

import { ButtonPrimary } from "../Button/Button";

import { ring } from 'ldrs';
ring.register();

const Modal = ({ textContent, buttonText, onButtonClick, onCloseClick, isDeleting }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img
          src={closeIcon}
          alt="Close icon"
          className="modal-content__close"
          onClick={onCloseClick}
        />
        <p>{textContent}</p>
        <ButtonPrimary 
          text={isDeleting ? "Deleting..." : buttonText} 
          onClick={onButtonClick} 
        />
      </div>
    </div>
  );
};

export default Modal;
