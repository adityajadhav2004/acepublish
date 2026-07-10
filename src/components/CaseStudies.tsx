import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScrollRevealText = ({ text, className, style, delayOffset = 0 }: { text: string; className: string; style?: React.CSSProperties; delayOffset?: number }) => {
  const words = text.split(" ");

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.22em] select-none"
          initial={{ opacity: 0, filter: "blur(12px)", y: 15 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
          transition={{
            duration: 0.6,
            delay: delayOffset + i * 0.015,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const CaseStudies = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 41 standard images from public folder numbered 1 to 41
  const covers = Array.from({ length: 41 }, (_, i) => {
    const id = i + 1;
    return {
      id: `cover-${id}`,
      img: `/${id}.jpg`,
      title: `Issue ${id.toString().padStart(2, '0')}`,
      category: [
        'BRANDING', 'DESIGN', 'MEDIA', 'AI STRATEGY',
        'COMMUNICATIONS', 'GLOBAL CAMPAIGN', 'AI SEARCH',
        'CREATIVE PRODUCTION', 'DIGITAL REACH'
      ][i % 9]
    };
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const target = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: target,
      behavior: 'smooth'
    });
  };

  // Auto-scroll carousel every 2 seconds
  useEffect(() => {
    if (isDown) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      // If we are near the end, wrap around to the beginning
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: container.scrollLeft + 400,
          behavior: 'smooth'
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isDown]);

  return (
    <section id="case-studies" className="bg-white text-black pt-24 pb-24 overflow-hidden relative z-30 select-none">
      {/* Section Header with Navigation Controls */}
      <div className="px-6 sm:px-12 mb-12 max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2
            className="font-bold tracking-tight text-black leading-none uppercase flex flex-wrap"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            <ScrollRevealText text="Elevating Brands Since 2005" className="w-full" />
          </h2>


        </div>

        {/* Scroll Buttons */}
        <div className="flex gap-3 self-end md:self-auto shrink-0">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 shadow-sm cursor-none animate-pulse"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 shadow-sm cursor-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 sm:px-12 pb-8 hide-scrollbar ${isDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        style={{ scrollbarWidth: 'none' }}
      >
        {covers.map((cover, idx) => (
          <motion.div
            key={cover.id}
            className="flex-shrink-0 snap-center flex flex-col group"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.96, y: 25 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: (idx % 3) * 0.05
            }}
          >
            {/* Image Container with native lazy loading */}
            <div className="relative h-[320px] sm:h-[480px] overflow-hidden rounded-lg bg-transparent">
              <img
                src={cover.img}
                alt={cover.title}
                loading="lazy"
                data-hover="view"
                className="h-full w-auto object-contain grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.01] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-auto"
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
