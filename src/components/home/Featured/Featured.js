import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InfiniteMarquee from "./InfiniteMarquee";
// Demo data
const demoData = [
    {
        id: 1,
        src: "https://tse1.mm.bing.net/th?id=OIP.4RFya1HIArbOoKomXixZwgHaEK&pid=Api&P=0&h=180",
        alt: "Economics Times",
    },
    {
        id: 2,
        src: "https://tse4.mm.bing.net/th?id=OIP.L-KZAIyHphVjl10qONJkRQHaCy&pid=Api&P=0&h=180",
        alt: "Entrackr",
    },
    {
        id: 3,
        src: "https://tse3.mm.bing.net/th?id=OIP.DQEec4LFcX7qwmnEm_qhBQHaD5&pid=Api&P=0&h=180",
        alt: "Entrepreneur",
    },
    {
        id: 4,
        src: "https://tse4.mm.bing.net/th?id=OIP.1bo3OYV6lGTqd231-INzAAHaE8&pid=Api&P=0&h=180",
        alt: "VCCircle",
    },
    {
        id: 5,
        src: "https://tse3.mm.bing.net/th?id=OIP.DQEec4LFcX7qwmnEm_qhBQHaD5&pid=Api&P=0&h=180",
        alt: "ABP",
    },
    {
        id: 6,
        src: "https://tse1.mm.bing.net/th?id=OIP.4RFya1HIArbOoKomXixZwgHaEK&pid=Api&P=0&h=180",
        alt: "Inc42",
    },
];
const Featured = () => {
    return (_jsxs("div", { className: " bg-stone-900  pt-[100px] pb-6 font-poppins bg-gradient-to-r bg-stone-900 text-white", children: [_jsxs("h2", { className: "w-full px-4 mb-3 text-2xl font-bold  md:text-4xl md:text-center", children: ["Our", _jsx("span", { className: "text-[#FFDC7D]", children: " Sponsors" })] }), _jsx(InfiniteMarquee, { children: demoData.map((item) => (_jsx("div", { className: "rounded-2xl hover:scale-110 transition-all duration-300 min-w-44 px-4 bg-gray-100 mx-2 flex items-center justify-center md:h-16 h-14 overflow-hidden box-border drop-shadow-[0px_0px_8px_rgba(255,255,255,0.8)]", children: _jsx("img", { src: item.src, alt: item.alt, className: "object-contain w-auto h-auto max-h-full min-w-full min-h-full" }) }, item.id))) })] }));
};
export default Featured;
