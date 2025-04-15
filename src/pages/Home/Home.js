import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import StaticNavbar from "../../components/home/StaticNavbar";
import Hero from "../../components/home/Hero/Hero";
import ImageSlider from "../../components/home/ImageSlider/ImageSlider";
import Featured from "../../components/home/Featured/Featured";
import Upcomings from "../../components/home/Upcoming/Upcomings";
import Footer from "../../components/Footer";
import BookingSteps from "../../components/home/BookingSteps/BookingSteps";
import { useEffect } from "react";
export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (_jsxs("div", { className: "", children: [_jsx(StaticNavbar, {}), _jsx(Hero, {}), _jsx(ImageSlider, {}), _jsx(Upcomings, {}), _jsx(BookingSteps, {}), _jsx(Featured, {}), _jsx(Footer, {})] }));
}
