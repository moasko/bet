import React, { useCallback, useEffect, useRef, useState } from "react";

interface SliderProps {
  children: React.ReactNode;
  itemsPerPage?: number; // Number of items visible per page
  itemsToScroll?: number; // Number of items to scroll at a time
  className?: string; // Additional classes for customization
  buttonClassName?: string; // Classes for navigation buttons
  buttonPrevLabel?: string; // Label for the previous button
  buttonNextLabel?: string; // Label for the next button
  showButtonsOnMobile?: boolean; // Whether to show navigation buttons on mobile
  loop?: boolean; // Enable infinite scrolling
  autoplay?: boolean; // Enable autoplay
  autoplaySpeed?: number; // Autoplay interval in milliseconds
}

const Slid: React.FC<SliderProps> = ({
  children,
  itemsPerPage = 4,
  itemsToScroll = 1,
  className = "",
  buttonClassName = "bg-gray-700 text-white px-4 py-2",
  buttonPrevLabel = "Previous",
  buttonNextLabel = "Next",
  showButtonsOnMobile = false,
  loop = false,
  autoplay = false,
  autoplaySpeed = 3000,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const calculateTotalPages = useCallback(() => {
    if (wrapperRef.current) {
      const childrenCount = React.Children.count(children);
      setTotalPages(Math.ceil(childrenCount / itemsPerPage));
    }
  }, [children, itemsPerPage]);

  useEffect(() => {
    calculateTotalPages();
  }, [calculateTotalPages]);

  const move = useCallback(
    (direction: number) => {
      if (!wrapperRef.current) return;

      let newPage = currentPage + direction;

      if (loop) {
        if (newPage < 0) {
          newPage = totalPages - 1;
        } else if (newPage >= totalPages) {
          newPage = 0;
        }
      } else {
        newPage = Math.max(0, Math.min(newPage, totalPages - 1));
      }

      setCurrentPage(newPage);

      const targetElement = wrapperRef.current.children[
        newPage * itemsToScroll
      ] as HTMLElement;
      if (targetElement) {
        wrapperRef.current.scrollTo({
          left: targetElement.offsetLeft,
          behavior: "smooth",
        });
      }
    },
    [currentPage, itemsToScroll, loop, totalPages]
  );

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchStartX = event.touches[0].clientX;
    wrapperRef.current?.setAttribute(
      "data-touch-start-x",
      touchStartX.toString()
    );
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchStartX = parseFloat(
      wrapperRef.current?.getAttribute("data-touch-start-x") || "0"
    );
    const threshold = 50; // Minimum swipe distance

    if (touchStartX - touchEndX > threshold) {
      move(1);
    } else if (touchEndX - touchStartX > threshold) {
      move(-1);
    }
  };

  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        move(1);
      }, autoplaySpeed);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [autoplay, autoplaySpeed, move]);

  return (
    <div
      className={`relative ${className}`}
      data-slider
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="items flex overflow-x-auto gap-4 px-4 -mx-4 scroll-snap-type-x-proximity"
        data-slider-wrapper
        ref={wrapperRef}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="item min-w-[250px] scroll-snap-align-start"
            style={{
              minWidth: `calc((100% - ${
                (itemsPerPage - 1) * 16
              }px) / ${itemsPerPage})`,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {(showButtonsOnMobile || window.innerWidth >= 1000) && (
        <>
          <button
            data-slider-prev
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${buttonClassName}`}
            onClick={() => move(-1)}
          >
            {buttonPrevLabel}
          </button>

          <button
            data-slider-next
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${buttonClassName}`}
            onClick={() => move(1)}
          >
            {buttonNextLabel}
          </button>
        </>
      )}
    </div>
  );
};

export default Slid;

// Tailwind Example Usage
// <Slider
//   itemsPerPage={3}
//   itemsToScroll={3}
//   className="custom-slider"
//   buttonClassName="custom-button"
//   buttonPrevLabel="Back"
//   buttonNextLabel="Forward"
//   showButtonsOnMobile={true}
//   loop={true}
//   autoplay={true}
//   autoplaySpeed={2000}
// >
//   <div>Content 1</div>
//   <div>Content 2</div>
//   <div>Content 3</div>
//   <div>Content 4</div>
//   <div>Content 5</div>
//   <div>Content 6</div>
// </Slider>
