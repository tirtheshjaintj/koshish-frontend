import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Bell, Component, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
export const profileOptions = [
    {
        icon: _jsx(Component, { strokeWidth: 1.25 }),
        link: "/past-poojas",
        label: "Past Pujas",
    },
    {
        icon: _jsx(UserRound, { strokeWidth: 1.25 }),
        link: "/profile",
        label: "Profile",
    },
    {
        icon: _jsx(Bell, { strokeWidth: 1.25 }),
        link: "/notifications",
        label: "Notifications",
    },
    {
        icon: _jsx(Settings, { strokeWidth: 1.25 }),
        link: "/profile/settings",
        label: "Settings",
    },
];
export default function ProfileOptions() {
    return (_jsx(_Fragment, { children: profileOptions.map((item, idx) => (_jsxs(Link, { to: item.link, className: "flex items-center gap-2", children: [item.icon, item.label] }, idx))) }));
}
