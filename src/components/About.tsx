import { motion } from 'framer-motion';

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

export const About = () => {
  return (
    <section id="about" className="bg-[#FAFBFB] text-black pt-28 pb-28 px-6 sm:px-12 relative z-30 overflow-hidden">
      {/* Grid Background Matrix Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Subtle Background Glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neutral-200/40 blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-5xl">
          {/* Section Sub-tag */}
          <motion.h2 
            className="text-xs font-extrabold tracking-[0.25em] text-neutral-400 uppercase mb-8 font-mono"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Creative. Strategic. Global.
          </motion.h2>
          
          {/* Main Title - Massive & Animated */}
          <h3 className="mb-10 text-neutral-950 font-black tracking-tight leading-[1.08] uppercase flex flex-wrap">
            <ScrollRevealText 
              text="ACEDIGITAL is a full-service creative, marketing, and communications agency that helps brands build meaningful identities, create compelling content, and amplify their presence across digital and global media channels."
              className="w-full"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.6rem)' }}
            />
          </h3>

          {/* Sub-description - Large & Animated */}
          <p className="text-neutral-600 leading-relaxed font-light flex flex-wrap max-w-4xl">
            <ScrollRevealText 
              text="From startups to established businesses, we transform ideas into impactful brand experiences that drive engagement, visibility, and growth."
              className="w-full"
              style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}
              delayOffset={0.3}
            />
          </p>
        </div>
      </div>
    </section>
  );
};
