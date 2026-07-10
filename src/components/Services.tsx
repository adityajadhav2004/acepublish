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

export const Services = () => {
  const services = [
    {
      number: "01",
      category: "BRANDING & CREATIVE",
      title: "Branding, Design & Creative Production",
      description: "Your brand is more than a logo—it's the first impression, the lasting memory, and the reason people choose you. We design identities that feel timeless, distinctive, and impossible to ignore.",
      tags: [
        "Brand Identity", "Packaging Design", "Editorial Design", 
        "Web Design & Development", "Creative Direction", "Photography & Videography"
      ],
      bgBase: "bg-gradient-to-br from-pink-50/60 via-orange-50/30 to-white border-pink-100/70",
      bgHover: "hover:from-pink-100/80 hover:via-orange-100/50 hover:to-white hover:border-pink-300",
      tagStyle: "bg-pink-100/40 text-pink-800 border-pink-200/50 group-hover:bg-pink-200/60"
    },
    {
      number: "02",
      category: "DIGITAL MARKETING",
      title: "Social Media & Digital Marketing",
      description: "Every campaign is built with purpose. We blend creative storytelling with performance marketing to attract the right audience, drive engagement, and deliver measurable business growth.",
      tags: [
        "Social Media Strategy", "Content Creation", "Campaign Planning", 
        "Meta, Google & LinkedIn Ads", "Influencer Marketing", "Performance Analytics"
      ],
      bgBase: "bg-gradient-to-br from-indigo-50/60 via-blue-50/30 to-white border-indigo-100/70",
      bgHover: "hover:from-indigo-100/80 hover:via-blue-100/50 hover:to-white hover:border-indigo-300",
      tagStyle: "bg-indigo-100/40 text-indigo-800 border-indigo-200/50 group-hover:bg-indigo-200/60"
    },
    {
      number: "03",
      category: "GLOBAL MEDIA",
      title: "Global Media Distribution & Visibility",
      description: "Great stories deserve global attention. We distribute your news through trusted media networks, connecting your brand with journalists, investors, decision-makers, and audiences worldwide.",
      tags: [
        "Press Distribution", "Global Editorial Networks", "Reuters & Bloomberg Syndication", 
        "Yahoo Finance & MarketWatch", "International Media Outreach", "Brand Authority Building"
      ],
      bgBase: "bg-gradient-to-br from-purple-50/60 via-violet-50/30 to-white border-purple-100/70",
      bgHover: "hover:from-purple-100/80 hover:via-violet-100/50 hover:to-white hover:border-purple-300",
      tagStyle: "bg-purple-100/40 text-purple-800 border-purple-200/50 group-hover:bg-purple-200/60"
    },
    {
      number: "04",
      category: "AI VISIBILITY",
      title: "AI Search Optimization & Brand Growth",
      description: "Search is evolving. We prepare your brand for AI-powered discovery, helping your content appear across modern search engines, answer platforms, and intelligent assistants.",
      tags: [
        "Metadata Optimization", "AI-Ready Content", "Answer Engine Optimization", 
        "Generative Engine Optimization", "Search Discoverability", "Future-Ready Strategy"
      ],
      bgBase: "bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-white border-emerald-100/70",
      bgHover: "hover:from-emerald-100/80 hover:via-teal-100/50 hover:to-white hover:border-emerald-300",
      tagStyle: "bg-emerald-100/40 text-emerald-850 border-emerald-200/50 group-hover:bg-emerald-200/60"
    }
  ];

  return (
    <section id="services" className="bg-[#FAFBFB] text-black pt-20 pb-32 px-6 sm:px-12 relative z-30 overflow-hidden">
      {/* Grid Background Matrix Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Floating Subtle Ambient Glows */}
      <div className="absolute top-[15%] left-[5%] w-[450px] h-[450px] rounded-full bg-pink-100/30 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- BENTO SERVICES HEADER --- */}
        <div className="max-w-4xl mb-16">
          <motion.span 
            className="text-xs font-extrabold tracking-[0.25em] text-neutral-400 uppercase mb-4 block font-mono"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHAT WE DO
          </motion.span>
          
          <h2 
            className="font-black tracking-tight text-neutral-900 leading-[1.1] mb-6 uppercase flex flex-wrap"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            <ScrollRevealText text="Everything Your Brand Needs. One Strategic Partner." className="w-full" />
          </h2>

          <p className="text-[16px] sm:text-[18px] text-neutral-600 max-w-3xl leading-relaxed font-light flex flex-wrap">
            <ScrollRevealText 
              text="From building your identity to growing your audience, earning media coverage, and preparing your brand for AI-powered discovery—we bring every part of modern communications together under one roof." 
              className="w-full"
              delayOffset={0.25}
            />
          </p>
        </div>

        {/* --- 2X2 BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.045)] hover:-translate-y-1.5 transition-all duration-[350ms] ease-out group cursor-none border ${service.bgBase} ${service.bgHover}`}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1], 
                delay: index * 0.05 
              }}
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                {/* Top Half */}
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-mono font-bold text-neutral-400">{service.number}</span>
                    <span className="text-[10px] font-extrabold tracking-widest text-neutral-400 font-mono uppercase">
                      {service.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mb-4 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-[15px] sm:text-[16px] text-neutral-500 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Half: Capabilities list */}
                <div>
                  <span className="text-[9px] font-extrabold tracking-[0.2em] text-neutral-400 uppercase block mb-4 font-mono">
                    Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className={`text-[11px] px-3.5 py-1.5 rounded-full border transition-all duration-[350ms] ${service.tagStyle} font-semibold`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
