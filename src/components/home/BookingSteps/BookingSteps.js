import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import StepCard from "./StepCard";
import ReactPlayer from "react-player/lazy";
export const bookingSteps = [
    {
        id: 0,
        title: "Decide Your Event",
        description: "Choose the event or competition you want to participate in.",
        start: 1,
        ends: 20,
    },
    {
        id: 1,
        title: "Give Your Name to Incharge",
        description: "Submit your name and details to the event incharge for registration.",
        start: 20,
        ends: 40,
    },
    {
        id: 2,
        title: "Incharges Register to Event",
        description: "Event incharges will officially register participants for the event.",
        start: 40,
        ends: 70,
    },
    {
        id: 3,
        title: "Results Out",
        description: "Final results will be announced for all participants.",
        start: 70,
        ends: 100,
    },
];
export default function BookingSteps() {
    const playerRef = useRef(null);
    const stepRefs = useRef([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        const newIndex = bookingSteps.findIndex((step) => currentTime >= step.start && currentTime <= step.ends);
        if (newIndex !== -1 && newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    }, [currentTime, activeIndex]);
    useEffect(() => {
        if (isPlaying && stepRefs.current[activeIndex]) {
            stepRefs.current[activeIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [activeIndex, isPlaying]);
    const handleProgress = (state) => {
        setCurrentTime(state.playedSeconds);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    return (_jsxs("section", { className: "relative z-10 pt-20 bg-gradient-to-r bg-stone-900 mt-15 lg:px-24 md:px-15", children: [_jsx("div", { className: "max-w-md md:hidden max-sm:px-4", children: _jsx(Header, {}) }), _jsxs("div", { className: "flex items-center gap-6 md:gap-8 lg:gap-16 max-lg:flex-wrap-reverse max-lg:mt-10", children: [_jsxs("div", { className: "flex gap-8 md:flex-1 scrollbar-hidden my-7 md:flex-col max-sm:px-4 md:max-w-md max-md:overflow-x-auto", children: [_jsx("div", { className: "max-md:hidden", children: _jsx(Header, {}) }), bookingSteps.map((step, index) => (_jsx(StepCard, { ref: (el) => (stepRefs.current[index] = el), ...step, currentTime: currentTime }, step.id)))] }), _jsx("div", { className: "relative flex-1 rounded-2xl max-sm:px-4 drop-shadow-[0px_0px_8px_rgba(255,255,255,0.8)]", children: _jsx("div", { className: "relative w-full aspect-video min-w-72 rounded-2xl overflow-clip", children: _jsx(ReactPlayer, { ref: playerRef, url: "https://www.youtube.com/watch?v=F4dZMue9VKo", controls: true, height: "100%", width: "100%", onProgress: handleProgress, onPlay: handlePlay, onPause: handlePause }) }) })] })] }));
}
