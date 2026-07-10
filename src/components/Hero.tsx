import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Typewriter = () => {
  const phrases = [
    "Brand Architects.",
    "Storytellers.",
    "Growth Partners.",
    "Creative Directors.",
    "PR Strategists.",
    "AI Visibility Experts.",
    "Media Connectors.",
    "Your Competitive Edge."
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: any;
    const activePhrase = phrases[currentPhraseIndex];
    const isLastPhrase = currentPhraseIndex === phrases.length - 1;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activePhrase.substring(0, currentText.length - 1));
        setTypingSpeed(45);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activePhrase.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activePhrase) {
      if (isLastPhrase) {
        return () => clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => prev + 1);
      setTypingSpeed(180);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <span className="relative inline-block min-h-[1.2em]">
      <span className="text-black font-extrabold uppercase">{currentText}</span>
      <span className="ml-1 inline-block text-black animate-pulse font-light">|</span>
    </span>
  );
};

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full bg-white flex flex-col justify-center items-center overflow-hidden">

      {/* Hero Content (Centered) */}
      <div className="max-w-4xl px-6 flex flex-col items-center text-center">
        <motion.p 
          className="text-[14px] sm:text-[16px] font-semibold tracking-[0.2em] text-gray-500 mb-8 uppercase"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          ELEVATING BRANDS SINCE 2005
        </motion.p>
        
        <h1 
          className="font-black leading-[1.05] tracking-tight text-black uppercase mb-8 flex flex-col items-center gap-1 select-none"
          style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
        >
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            Create
          </motion.span>
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.48 }}
          >
            Engage
          </motion.span>
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.61 }}
          >
            Amplify
          </motion.span>
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.74 }}
          >
            Grow
          </motion.span>
        </h1>
        
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        >
          <span className="text-gray-500 font-semibold text-[18px] tracking-[0.3em] mb-2 uppercase">WE ARE</span>
          <div className="text-[18px] md:text-[40px] font-bold tracking-wide">
            <Typewriter />
          </div>
        </motion.div>
 
        <motion.p 
          className="text-[14px] md:text-[24px] text-gray-500 max-w-2xl leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
        >
          A single partner for branding, creative production, digital marketing, media distribution, and AI-ready communications, helping your brand stand out in an increasingly connected world.
        </motion.p>
      </div>
 
      {/* Bottom Row */}
      <div className="absolute bottom-10 left-6 right-6 flex justify-between text-xs font-semibold tracking-widest uppercase text-black select-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
        >
          Build. Connect. Influence.
        </motion.div>
        
        <motion.button 
          onClick={() => scrollToSection('about-services')}
          className="flex items-center gap-2 cursor-none select-none hover:opacity-75 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};
