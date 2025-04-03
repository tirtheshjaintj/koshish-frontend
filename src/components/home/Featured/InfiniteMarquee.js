import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const InfiniteMarquee = ({ children, speed = '40s' }) => {
    return (_jsx("div", { className: "overflow-x-hidden py-4 whitespace-nowrap relative w-full", children: _jsxs("div", { className: "flex items-center md:gap-6 gap-4 w-max animate-marquee", style: { animationDuration: speed }, children: [children, children, children] }) }));
};
export default InfiniteMarquee;
