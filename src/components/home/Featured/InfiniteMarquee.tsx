import { ReactNode } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: string;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ children, speed = '40s' }) => {
  return (
    <div className="overflow-x-hidden py-4 whitespace-nowrap relative w-full">
      <div
        className="flex items-center md:gap-6 gap-4 w-max animate-marquee"
        style={{ animationDuration: speed }}
      >
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
