import React, { useRef } from "react";
import ReactDOM from "react-dom";

interface ModalWrapperProps {
  children: React.ReactNode;
  open: boolean;
  setOpenModal: (open: boolean) => void;
  outsideClickClose?: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  open,
  setOpenModal,
  outsideClickClose = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target && outsideClickClose) {
      setOpenModal(false);
    }
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="bg-black p-2 bg-opacity-30 backdrop-blur-lg h-full w-full fixed z-[1000] top-0 left-0">
      <div
        ref={modalRef}
        onClick={closeModal}
        className="flex h-full w-full justify-center items-center bg-transparent"
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ModalWrapper;
