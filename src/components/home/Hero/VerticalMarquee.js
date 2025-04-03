import { jsx as _jsx } from "react/jsx-runtime";
export default function VerticalMarquee({ children, speed = '40s', reverse = false, }) {
    return (_jsx("div", { className: "relative overflow-hidden h-full flex flex-col items-center", children: _jsx("div", { className: `flex flex-col items-center gap-6 animate-vertical-marquee ${reverse ? 'animate-vertical-reverse' : ''}`, style: { animationDuration: speed }, children: children }) }));
}
