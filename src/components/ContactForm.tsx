import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}

const CustomSelect = ({ value, onChange, placeholder, options }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white py-3.5 px-6 text-[15px] outline-none transition-all rounded-full flex items-center justify-between cursor-none select-none ${
          value === '' ? 'text-gray-400' : 'text-neutral-900 font-semibold'
        }`}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-xl z-50 overflow-hidden py-2"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-6 py-3 text-[14px] cursor-none select-none hover:bg-neutral-50 transition-colors ${
                  value === opt.value ? 'bg-neutral-50 text-neutral-900 font-bold' : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ContactForm = () => {
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const roleOptions = [
    { label: "Brand Owner / Founder", value: "brand_owner" },
    { label: "Marketing Director", value: "marketing_director" },
    { label: "Creative Director / Agency Partner", value: "creative_director" },
    { label: "Startup Founder", value: "startup_founder" },
    { label: "Independent / Other", value: "other" }
  ];

  const countryOptions = [
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "UK" },
    { label: "Canada", value: "CA" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Japan", value: "JP" },
    { label: "Singapore", value: "SG" },
    { label: "Australia", value: "AU" },
    { label: "India", value: "IN" },
    { label: "Other", value: "Other" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      JSON.stringify(
        {
          role,
          firstName,
          lastName,
          email,
          phone,
          country,
          website,
          company,
          message,
          consent,
        },
        null,
        2
      )
    );
  };

  return (
    <section id="contact" className="bg-white text-black py-24 flex flex-col items-center relative z-30 select-text">
      <div className="max-w-4xl w-full px-6 mx-auto">
        {/* Heading with Scroll Reveal */}
        <h2 className="text-[3.5rem] leading-none mb-12 text-left uppercase flex items-center">
          <ScrollRevealText text="Let's Talk" className="font-sans font-bold text-neutral-900" />
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Row 1: Custom Select dropdown "I Would Describe Myself As" */}
          <motion.div 
            className="w-full relative z-[45]"
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <CustomSelect
              value={role}
              onChange={setRole}
              placeholder="I Would Describe Myself As"
              options={roleOptions}
            />
          </motion.div>

          {/* Row 2: First Name / Last Name (50/50 split on md+) */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 relative z-30"
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white focus:border-black py-3.5 px-6 text-[15px] outline-none transition-all placeholder:text-gray-400 rounded-full cursor-none font-semibold text-neutral-900"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white focus:border-black py-3.5 px-6 text-[15px] outline-none transition-all placeholder:text-gray-400 rounded-full cursor-none font-semibold text-neutral-900"
              required
            />
          </motion.div>

          {/* Row 3: Email Address / Phone Number (50/50 split on md+) */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 relative z-20"
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white focus:border-black py-3.5 px-6 text-[15px] outline-none transition-all placeholder:text-gray-400 rounded-full cursor-none font-semibold text-neutral-900"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white focus:border-black py-3.5 px-6 text-[15px] outline-none transition-all placeholder:text-gray-400 rounded-full cursor-none font-semibold text-neutral-900"
              required
            />
          </motion.div>

          {/* Row 4: Select Country / Website URL / Company Name (33/33/33 split on lg+) */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10"
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <CustomSelect
              value={country}
              onChange={setCountry}
              placeholder="Select Your Country"
              options={countryOptions}
            />
            <input
              type="url"
              placeholder="Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white focus:border-black py-3.5 px-6 text-[15px] outline-none transition-all placeholder:text-gray-400 rounded-full w-full cursor-none font-semibold text-neutral-900"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white focus:border-black py-3.5 px-6 text-[15px] outline-none transition-all placeholder:text-gray-400 rounded-full w-full cursor-none font-semibold text-neutral-900"
              required
            />
          </motion.div>

          {/* Row 5: Textarea "How can we help you?" */}
          <motion.textarea
            placeholder="How can we help you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 border border-gray-300 bg-neutral-50/30 hover:bg-neutral-50/70 focus:bg-white focus:border-black py-4 px-6 text-[15px] outline-none transition-all placeholder:text-gray-400 rounded-3xl resize-none cursor-none font-semibold text-neutral-900"
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            required
          />

          {/* Consent Row */}
          <motion.div 
            className="flex items-start gap-3 mt-2"
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <input
              type="checkbox"
              id="consent-checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 mt-1 accent-black cursor-none border-gray-400"
              required
            />
            <label
              htmlFor="consent-checkbox"
              className="text-[13px] text-neutral-600 leading-snug cursor-none select-none"
            >
              I consent to receive communication from ACEDIGITAL regarding its products, services, and promotional offers. I understand that I can withdraw my consent by unsubscribing at any time.
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="bg-black text-white px-10 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98] w-fit block cursor-none"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            SUBMIT
          </motion.button>
        </form>
      </div>
    </section>
  );
};
