import ReactDOM from "react-dom";
import "./Modal-window.scss";
import { useState } from "react";

export type ModalProps = {
  onCloseModal?: () => void;
  visible: boolean;
  children?: React.ReactNode;
  modalContent?: React.ReactNode;
};

const ModalWindow = (props: ModalProps) => {
  const {
    children,
    onCloseModal,
    visible,
    modalContent = `Something happend...`,
  } = props;
  const [isVisible, setIsVisible] = useState<boolean>(visible);
  const onClose = () => {
    onCloseModal && onCloseModal();
    setIsVisible(false);
  };
  const modal = () => {
    return (
      <div className="modal-layout">
        <div className="modal-window">
          <div className="close-wrapper">
            <div className="close-icon" onClick={onClose}>
              X
            </div>
          </div>
          {
            <div className="content">
              {children || <div>{modalContent}</div>}
            </div>
          }
        </div>
      </div>
    );
  };
  const root = document.getElementById("root");

  return isVisible && root ? ReactDOM.createPortal(modal(), root) : children;
};

export default ModalWindow;
