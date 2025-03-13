import { jsx as _jsx } from "react/jsx-runtime";
export default function Limit({ limit, setLimit }) {
    return (_jsx("select", { value: limit, onChange: (e) => setLimit(Number(e.target.value)), className: "px-3 py-1 border rounded-md bg-white text-stone-800 border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500", "aria-label": "Items per page", children: [10, 20, 30, 40].map((value) => (_jsx("option", { value: value, children: value }, value))) }));
}
