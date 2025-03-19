import { Bell, Component, Settings, UserRound } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const profileOptions = [
  {
    icon: <Component strokeWidth={1.25} />,
    link: "/past-poojas",
    label: "Past Pujas",
  },
  {
    icon: <UserRound strokeWidth={1.25} />,
    link: "/profile",
    label: "Profile",
  },
  {
    icon: <Bell strokeWidth={1.25} />,
    link: "/notifications",
    label: "Notifications",
  },
  {
    icon: <Settings strokeWidth={1.25} />,
    link: "/profile/settings",
    label: "Settings",
  },
];
export default function ProfileOptions() {
  return (
    <>
      {profileOptions.map((item, idx) => (
        <Link key={idx} to={item.link} className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </Link>
      ))}
    </>
  );
}
