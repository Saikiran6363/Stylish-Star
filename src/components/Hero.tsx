import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dark-950">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Salon Interior" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-950/30 to-dark-950 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-serif font-bold leading-[1.1] mb-6 text-white tracking-tight">
            Transform Your Style <br/>
            With <span className="text-gold-500">Expert Care</span>
          </h1>
          
          <p className="text-lg md:text-[1.1rem] text-gray-300 mb-10 max-w-2xl leading-relaxed">
            Professional Haircuts, Grooming, Styling & Beauty Services crafted by award-winning stylists in an atmosphere of pure elegance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href="#book"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-gold-400 to-gold-600 text-dark-950 px-8 py-3.5 rounded-full font-bold text-[15px] sm:text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold-500/20"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </a>
            <a 
              href="#services"
              className="group flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 px-8 py-3.5 rounded-full font-bold text-[15px] sm:text-base transition-all hover:bg-white/5 hover:border-white/40"
            >
              View Services
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-pulse text-gray-500 uppercase tracking-widest text-[11px] font-bold">
        Scroll to Explore
      </div>
    </section>
  );
}
