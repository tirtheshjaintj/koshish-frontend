import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Pagination({ currentPage, totalPages, setPage, }) {
    return (_jsxs("div", { className: "flex items-center gap-3 text-stone-800 font-medium", children: [_jsx("button", { onClick: () => setPage(currentPage - 1), disabled: currentPage === 1, className: `px-3 py-1 rounded-md border transition ${currentPage === 1
                    ? "border-stone-300 text-stone-400 cursor-not-allowed"
                    : "border-red-500 hover:bg-red-100"}`, children: "\u2190" }), _jsxs("span", { className: "px-4 py-1 bg-white\r\n       border-red-800 border-[1px] rounded-md", children: [currentPage, " of ", totalPages] }), _jsx("button", { onClick: () => setPage(currentPage + 1), disabled: currentPage === totalPages, className: `px-3 py-1 rounded-md border transition ${currentPage === totalPages
                    ? "border-stone-300 text-stone-400 cursor-not-allowed"
                    : "border-red-500 hover:bg-red-100"}`, children: "\u2192" })] }));
}
