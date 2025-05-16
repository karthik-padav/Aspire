import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface CarouselProps {
  items: React.ReactNode[];
  setActiveIndex?: (i: number) => void;
}

export default function Carousel({ items, setActiveIndex }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (setActiveIndex) setActiveIndex(current);
  }, [current]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true,
  });

  return (
    <div className="relative w-full overflow-hidden" {...handlers}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="w-full flex-shrink-0 relative">
            <div className="absolute top-0 bottom-0 left-0 right-0" />
            {item}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {items.map((_, idx) => (
          <div
            onClick={() => setCurrent(idx)}
            key={idx}
            className={`h-2 hover:cursor-pointer w-2 bg-green rounded-full ${
              items.length - 1 === idx ? "" : "mr-2"
            } ${current === idx ? "w-4" : "opacity-20"}`}
          />
        ))}
      </div>
    </div>
  );
}
