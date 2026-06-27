import { useState, useEffect } from 'react';
import { Menu, X, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Book', href: '#book' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-[#0b0a09]/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <Logo className="text-[2.2rem]" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full border border-gray-700/50 hover:bg-gray-800/50">
            <Sun className="w-4 h-4" />
          </button>
          <a 
            href="#book"
            className="bg-gold-500 hover:bg-gold-400 text-dark-950 px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-gold-500/20 text-sm"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-white hover:text-gold-500 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-950/95 backdrop-blur-xl border-b border-dark-800 py-4 shadow-2xl">
          <div className="flex flex-col px-4 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-gray-300 hover:text-gold-500 transition-colors py-2 border-b border-dark-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gold-500 text-dark-950 text-center px-6 py-3 rounded-full font-bold mt-2"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
