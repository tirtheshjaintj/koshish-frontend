import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
const StepCard = forwardRef(({ title, description, start, ends, currentTime }, ref) => {
    const isActive = currentTime >= start && currentTime <= ends;
    let progressLevel = 0;
    if (isActive) {
        progressLevel = ((currentTime - start) / (ends - start)) * 100;
    }
    return (_jsxs("div", { ref: ref, className: "flex max-md:flex-col gap-4 items-center relative text-white min-w-[280px] group", children: [_jsx("div", { className: "absolute bg-gray-200 rounded-2xl md:w-1.5 md:h-full w-full h-1.5 overflow-hidden", children: _jsx("div", { className: "absolute bg-gradient-to-r from-gradient-orange to-gradient-pink rounded-2xl transition-all duration-500", style: {
                        height: `${progressLevel}%`,
                        width: "100%",
                    } }) }), _jsx("div", { className: "absolute bg-gray-200 rounded-2xl w-full h-1.5 overflow-hidden md:hidden", children: _jsx("div", { className: "absolute bg-gradient-to-r from-gradient-orange to-gradient-pink transition-all duration-500", style: {
                        width: `${progressLevel}%`,
                        height: "100%",
                    } }) }), _jsxs("div", { className: "py-1 pr-4 md:ml-6 max-md:mt-4", children: [_jsx("div", { className: "font-semibold md:text-xl hover:opacity-80 flex-wrap cursor-pointer min-w-fit text-lg flex gap-1 font-poppins", children: _jsx("h2", { className: `${isActive ? "opacity-100" : "opacity-70"}`, children: title }) }), _jsx("div", { className: `transition-all duration-500 ease-in-out overflow-hidden ${isActive ? "max-h-[200px] opacity-100 mt-2" : "max-h-0 opacity-0"}`, children: _jsx("p", { className: "text-[16px] max-sm:text-[15px] leading-[20px] text-text_secondary", children: description }) })] })] }));
});
StepCard.displayName = "StepCard";
export default StepCard;
