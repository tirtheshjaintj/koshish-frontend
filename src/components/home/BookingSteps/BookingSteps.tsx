import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import StepCard from "./StepCard";
import ReactPlayer from "react-player/lazy";

// Define the type for booking steps
type BookingStep = {
  id: number;
  title: string;
  description: string;
  start: number;
  ends: number;
};

export const bookingSteps: BookingStep[] = [
  {
    id: 0,
    title: "Decide Your Event",
    description: "Choose the event or competition you want to participate in.",
    start: 1,
    ends: 400,
  },
  {
    id: 1,
    title: "Give Your Name to Incharge",
    description:
      "Submit your name and details to the event incharge for registration.",
    start:400,
    ends: 700,
  },
  {
    id: 2,
    title: "Incharges Register to Event",
    description:
      "Event incharges will officially register participants for the event.",
    start: 700,
    ends: 900,
  },
  {
    id: 3,
    title: "Results Out",
    description: "Final results will be announced for all participants.",
    start:900,
    ends: 1100,
  },
];


export default function BookingSteps() {
  const playerRef = useRef<ReactPlayer>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const newIndex = bookingSteps.findIndex(
      (step) => currentTime >= step.start && currentTime <= step.ends
    );

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

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <section className="relative z-10 pt-20 bg-gradient-to-r bg-stone-900 mt-15 lg:px-24 md:px-15">
      <div className="max-w-md md:hidden max-sm:px-4">
        <Header />
      </div>

      <div className="flex items-center gap-6 md:gap-8 lg:gap-16 max-lg:flex-wrap-reverse max-lg:mt-10">
        {/* Steps Section */}
        <div className="flex gap-8 md:flex-1 scrollbar-hidden my-7 md:flex-col max-sm:px-4 md:max-w-md max-md:overflow-x-auto">
          <div className="max-md:hidden">
            <Header />
          </div>

          {/* Render Steps */}
          {bookingSteps.map((step, index) => (
            <StepCard
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)}
              {...step}
              currentTime={currentTime}
            />
          ))}
        </div>

        {/* Video Player */}
        <div className="relative flex-1 rounded-2xl max-sm:px-4 drop-shadow-[0px_0px_8px_rgba(255,255,255,0.8)]">
          <div className="relative w-full aspect-video min-w-72 rounded-2xl overflow-clip">
            <ReactPlayer
              ref={playerRef}
              url="https://www.youtube.com/watch?v=F4dZMue9VKo"
              controls
              height="100%"
              width="100%"
              onProgress={handleProgress}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
