import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { name: 'About', link: '#about' },
    { name: 'Services', link: '#services' },
    { name: 'Contact', link: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // No dark sections remain, keep isDark false
      setIsDark(false);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(link);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Logo - Completely outside and separate from the navbar capsule */}
      <div 
        className={`fixed z-50 transition-all duration-500 pointer-events-none ${
          isScrolled ? 'top-2 left-6 sm:left-12' : 'top-4 left-6 sm:left-12'
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center pointer-events-auto shrink-0"
        >
          <img
            src={isDark ? '/logo-white.png' : '/logo-black.png'}
            alt="ACEDIGITAL Logo"
            className={`w-auto object-contain select-none transition-all duration-500 origin-left scale-[2.0] ${
              isScrolled ? 'h-10' : 'h-14'
            } ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
            draggable={false}
          />
        </a>
      </div>

      <header
        className={`fixed z-50 transition-all duration-300 flex justify-end md:justify-center px-6 ${
          isScrolled ? 'top-2 left-0 w-full' : 'top-4 left-0 w-full'
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 border ${
            isDark
              ? 'bg-black/75 border-white/10 text-white backdrop-blur-md shadow-lg'
              : 'bg-white/75 border-neutral-200 text-black backdrop-blur-md shadow-md'
          } ${
            isMobileMenuOpen
              ? 'w-full max-w-5xl px-8 py-3 rounded-3xl'
              : 'w-auto md:w-full md:max-w-3xl px-3 md:px-10 py-1.5 md:py-2.5 rounded-full'
          }`}
        >
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10 text-[14px] font-bold tracking-wide">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className={`transition-colors duration-200 ${
                  isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="mailto:nfo@ace-digital.co.in"
              className={`px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wider transition-colors duration-300 ${
                isDark
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              CONTACT US
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex items-center justify-center p-2 rounded-full focus:outline-none cursor-none ${
              isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            className={`absolute top-full left-6 right-6 mt-2 p-5 rounded-3xl flex flex-col gap-3 shadow-xl border z-50 ${
              isDark
                ? 'bg-black/95 border-white/10 text-white backdrop-blur-md'
                : 'bg-white/95 border-neutral-100 text-black backdrop-blur-md'
            }`}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className={`text-sm font-bold py-1 transition-colors duration-200 ${
                  isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                {item.name}
              </a>
            ))}
            <hr className={isDark ? 'border-white/10' : 'border-neutral-100'} />
            <a
              href="mailto:nfo@ace-digital.co.in"
              className={`w-full py-2.5 rounded-full text-center text-xs font-bold tracking-wider cursor-none ${
                isDark ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              CONTACT US
            </a>
          </div>
        )}
      </header>
    </>
  );
};
