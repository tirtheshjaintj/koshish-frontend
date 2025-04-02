import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import ReactDOM from "react-dom";
const ModalWrapper = ({ children, open }) => {
    const modalRef = useRef(null);
    const closeModal = (e) => {
        console.log(e);
    };
    if (!open)
        return null;
    return ReactDOM.createPortal(_jsx("div", { className: "bg-black p-2 bg-opacity-30 backdrop-blur-lg h-full w-full fixed z-[1000] top-0 left-0", children: _jsx("div", { ref: modalRef, onClick: closeModal, className: "flex h-full w-full justify-center items-center bg-transparent", children: children }) }), document.getElementById("modal-root"));
};
export default ModalWrapper;
