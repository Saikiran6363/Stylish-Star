import React, { useState } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allRatesCategories } from '../data/servicesData';

const specialEventBookings = [
  {
    title: 'Events Booking',
    duration: 'Custom',
    price: 'Call For Charges',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Home Service Call',
    duration: 'Custom',
    price: 'Call For Charges',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop'
  }
];

const RateCategory: React.FC<{ category: any, index: number }> = ({ category, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-[#110e0c]/50 p-6 sm:p-8 rounded-3xl border border-white/5 h-fit"
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className="w-12 h-[1px] bg-gold-500/50"></span>
          <h3 className="text-2xl tracking-wide font-medium text-gold-500 uppercase font-sans m-0">{category.title}</h3>
        </div>
        <ChevronDown className={`w-6 h-6 text-gold-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-8">
              {(category?.items || []).map((item: any, i: number) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4 group hover:border-gold-500/30 transition-colors gap-2">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1 group-hover:text-gold-500 transition-colors">{item?.name || 'Service'}</h4>
                    {item?.duration && <p className="text-sm text-gray-500">{item.duration}</p>}
                  </div>
                  <span className="text-lg sm:text-xl font-serif text-white sm:mb-1 text-left sm:text-right">{item?.price || ''}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#0b0a09] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl sm:text-[3.5rem] font-serif font-bold text-white mb-4 tracking-tight">
            Menu & <span className="text-gold-500">Treatments</span>
          </h2>
          <p className="text-gray-400 text-[17px] mb-8">
            A curated menu of premium services tailored to elevate your look.
          </p>
        </div>

        {/* Rate Lists Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto pt-8">
            {(allRatesCategories || []).map((cat, idx) => (
              <RateCategory key={cat?.title || idx} category={cat} index={idx} />
            ))}
          </div>
          
          <div className="mt-12 bg-[#121110] border border-white/5 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-left">
            <h4 className="text-gold-500 font-medium mb-4 text-lg">Note:</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-gold-500 mr-3 mt-0.5">•</span>
                <span>Home service is available within 5 km. For service beyond 5 km, please call for charges.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-500 mr-3 mt-0.5">•</span>
                <span>Extra work & Extra products will be Charged Separately.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-500 mr-3 mt-0.5">•</span>
                <span>Prices may vary depending on hair lengths, style and service requirements.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Special Services */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-tight">
            Special <span className="text-gold-500">Bookings</span>
          </h2>
          <p className="text-gray-400 text-[17px]">
            Exclusive services beyond the salon seat.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {specialEventBookings.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[4/4.5] sm:aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-white/5"
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/60 to-transparent opacity-95 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">
                  {service.title}
                </h3>
                
                <div className="flex items-center text-gray-400 mb-6 gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{service.duration}</span>
                </div>
                
                <div className="flex items-end justify-between mt-2 border-t border-white/10 pt-4">
                  <span className="text-[2rem] leading-none font-serif font-medium text-gold-500 tracking-tight">{service.price}</span>
                  <a href="#book" className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors pb-1">
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
