import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import sliderImg1 from "/images/sliderImg1.jpg";
import sliderImg2 from "/images/sliderImg2.jpg";
import sliderImg3 from "/images/sliderImg3.jpg";
import sliderImg4 from "/images/sliderImg4.jpg";
import sliderImg5 from "/images/sliderImg5.jpg";
const ImageSlider = () => {
    const eventImgRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const demoData = [
        {
            id: 1,
            image: sliderImg1,
        },
        {
            id: 2,
            image: sliderImg2,
        },
        {
            id: 3,
            image: sliderImg3,
        },
        {
            id: 4,
            image: sliderImg4,
        },
        {
            id: 5,
            image: sliderImg5,
        },
    ];
    // Auto scroll every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!eventImgRef.current)
                return;
            const viewportWidth = eventImgRef.current.clientWidth;
            const newIndex = (currentIndex + 1) % demoData.length;
            setCurrentIndex(newIndex);
            eventImgRef.current.scrollTo({
                left: newIndex * viewportWidth,
                behavior: "smooth",
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);
    // Manual scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (!eventImgRef.current)
                return;
            const scrollLeft = eventImgRef.current.scrollLeft;
            const viewportWidth = eventImgRef.current.clientWidth;
            const newIndex = Math.round(scrollLeft / viewportWidth);
            setCurrentIndex(newIndex);
        };
        const ref = eventImgRef.current;
        ref?.addEventListener("scroll", handleScroll);
        return () => ref?.removeEventListener("scroll", handleScroll);
    }, []);
    return (_jsxs("div", { className: "relative flex flex-col items-center w-full py-6 my-10 md:px-20", children: [_jsx("div", { className: "flex w-full gap-2 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory", style: { scrollbarWidth: "none" }, ref: eventImgRef, children: demoData.map((item) => (_jsx("div", { className: "relative w-full aspect-[3/2] md:aspect-[2/1] flex-none snap-center rounded-2xl overflow-hidden", children: _jsx("img", { src: item.image, alt: `Event ${item.id}`, className: "object-cover w-full h-full cursor-pointer" }) }, item.id))) }), _jsx("div", { className: "flex justify-center gap-2 mt-2", children: [...Array(3)].map((_, idx) => (_jsx("span", { className: `h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === idx
                        ? "bg-gradient-to-r from-indigo-500 to-pink-500 w-4"
                        : "bg-gray-300"}` }, idx))) })] }));
};
export default ImageSlider;
