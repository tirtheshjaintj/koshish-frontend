import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const EyeToggleSVG = ({ handleShowPasswordToggle }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleToggle = () => {
        setShowPassword(!showPassword);
    };
    return (_jsx("svg", { onClick: () => {
            handleToggle();
            handleShowPasswordToggle();
        }, className: "flex-shrink-0 size-5 text-black dark:text-white cursor-pointer", width: 48, height: 48, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", children: showPassword ? (_jsxs(_Fragment, { children: [_jsx("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }), _jsx("circle", { cx: 12, cy: 12, r: 3 })] })) : (_jsxs(_Fragment, { children: [_jsx("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }), _jsx("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }), _jsx("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }), _jsx("line", { x1: 2, x2: 22, y1: 2, y2: 22 })] })) }));
};
export default EyeToggleSVG;
