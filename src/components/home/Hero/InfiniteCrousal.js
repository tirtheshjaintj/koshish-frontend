import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import VerticalMarquee from "./VerticalMarquee";
import img1 from "/images/img1.jpg";
import img2 from "/images/img2.jpg";
import img3 from "/images/img3.jpg";
import img4 from "/images/img4.jpg";
import img5 from "/images/img5.jpg";
import img6 from "/images/img6.jpg";
import img7 from "/images/img7.jpg";
import img8 from "/images/img8.jpg";
import img9 from "/images/img9.jpg";
import img10 from "/images/img10.jpg";
import img11 from "/images/img11.jpg";
export default function InfiniteCarousel() {
    return (_jsxs("div", { className: "relative min-w-sm hidden lg:grid grid-cols-2 gap-7 lg:min-w-md xl:min-w-lg h-full", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" }), _jsx("div", { className: "absolute -bottom-1 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" }), _jsx(VerticalMarquee, { speed: "30s", children: [img1, img2, img3, img4, img5, img6].map((item, idx) => (_jsx("div", { className: "flex items-center rounded-2xl overflow-clip justify-center", children: _jsx("img", { src: item, alt: "img", width: 300, height: 180, className: "object-cover" }) }, idx))) }), _jsx(VerticalMarquee, { speed: "30s", reverse: true, children: [img7, img8, img9, img10, img11].map((item, idx) => (_jsx("div", { className: "flex items-center rounded-2xl overflow-clip justify-center  ", children: _jsx("img", { src: item, alt: "img", width: 300, height: 200, className: "object-cover" }) }, idx))) })] }));
}
