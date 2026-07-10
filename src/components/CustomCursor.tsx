import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [cursorType, setCursorType] = useState<'default' | 'clickable' | 'view'>('default');
  const [hoverText, setHoverText] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const checkClickable = (el: HTMLElement | null): boolean => {
        if (!el) return false;
        const tag = el.tagName.toLowerCase();
        
        if (
          tag === 'a' ||
          tag === 'button' ||
          tag === 'input' ||
          tag === 'select' ||
          tag === 'textarea' ||
          el.onclick ||
          el.getAttribute('role') === 'button' ||
          el.classList.contains('clickable')
        ) {
          return true;
        }
        return checkClickable(el.parentElement);
      };

      const checkView = (el: HTMLElement | null): boolean => {
        if (!el) return false;
        if (el.getAttribute('data-hover') === 'view' || el.classList.contains('view-hover')) {
          return true;
        }
        return checkView(el.parentElement);
      };

      if (checkView(target)) {
        setCursorType('view');
        setHoverText('VIEW');
      } else if (checkClickable(target)) {
        setCursorType('clickable');
        setHoverText('');
      } else {
        setCursorType('default');
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  const isExpanded = cursorType === 'clickable' || cursorType === 'view';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference flex items-center justify-center bg-white"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        width: isExpanded ? 64 : 12,
        height: isExpanded ? 64 : 12,
      }}
      animate={{
        width: isExpanded ? 64 : 12,
        height: isExpanded ? 64 : 12,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
    >
      {cursorType === 'view' && (
        <span className="text-[10px] font-bold tracking-widest text-black uppercase">
          {hoverText}
        </span>
      )}
      {cursorType === 'clickable' && !hoverText && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="3"
          className="w-4 h-4"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </motion.div>
  );
};
