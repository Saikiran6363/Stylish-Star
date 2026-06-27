import { motion } from 'framer-motion';
import g1 from '../assets/images/gallery1.jpg';
import g2 from '../assets/images/gallery2.jpg';
import g3 from '../assets/images/gallery3.jpg';
import g4 from '../assets/images/gallery4.jpg';
import g5 from '../assets/images/gallery5.jpg';
import g6 from '../assets/images/gallery6.jpg';

const images = [g1, g2, g3, g4, g5, g6];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#0b0a09] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold-500 font-bold tracking-[0.2em] text-[11px] mb-3 uppercase">Gallery</p>
          <h2 className="text-4xl sm:text-[3.5rem] font-serif font-bold text-white mb-6">
            Our <span className="text-gold-500">Craft</span>
          </h2>
        </div>

        {/* Bento/Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-2 md:h-[600px]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/3] sm:aspect-video md:aspect-auto h-full md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden group relative"
          >
            <img src={images[0]} alt="Salon Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0b0a09]/20 group-hover:bg-transparent transition-colors" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="aspect-[4/3] sm:aspect-video md:aspect-auto h-full md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden group relative"
          >
            <img src={images[1]} alt="Grooming" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0b0a09]/20 group-hover:bg-transparent transition-colors" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="aspect-[4/3] sm:aspect-video md:aspect-auto h-full md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden group relative"
          >
            <img src={images[2]} alt="Styling" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0b0a09]/20 group-hover:bg-transparent transition-colors" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="aspect-[4/3] sm:aspect-video md:aspect-auto h-full md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden group relative"
          >
            <img src={images[3]} alt="Haircut" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0b0a09]/20 group-hover:bg-transparent transition-colors" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="aspect-[4/3] sm:aspect-video md:aspect-auto h-full md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden group relative"
          >
            <img src={images[4]} alt="Hair Wash" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0b0a09]/20 group-hover:bg-transparent transition-colors" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="aspect-[4/3] sm:aspect-video md:aspect-auto h-full md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden group relative"
          >
            <img src={images[5]} alt="Trimming" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0b0a09]/20 group-hover:bg-transparent transition-colors" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
