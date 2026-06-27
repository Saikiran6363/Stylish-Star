import { Award, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import thiruImage from '../assets/images/thiru.jpeg';

export function About() {
  return (
    <section id="about" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={thiruImage} 
                alt="Master Stylist Thiru" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent" />
            </div>
            
            {/* Master Stylist Overlay Card */}
            <div className="absolute bottom-4 -right-2 sm:-right-8 bg-[#0b0a09] border border-gold-500/30 rounded-2xl p-6 pr-10 shadow-2xl z-20 hidden sm:block">
              <p className="text-gray-400 font-bold tracking-[0.2em] text-[10px] mb-1 uppercase">Master Stylist</p>
              <p className="text-white font-serif text-2xl font-bold tracking-tight">Thiru</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#0b0a09] border border-gold-500/30 rounded-2xl p-5 shadow-2xl z-20 sm:hidden">
              <p className="text-gray-400 font-bold tracking-[0.2em] text-[10px] mb-1 uppercase">Master Stylist</p>
              <p className="text-white font-serif text-xl font-bold tracking-tight">Thiru</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-gold-500 font-bold tracking-[0.2em] text-xs mb-4 uppercase">About Us</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-white mb-6 leading-[1.1]">
                Where Style Meets <span className="text-gold-500">Excellence</span>
              </h2>
              <div className="text-gray-300 text-[16px] leading-relaxed mb-10 space-y-4">
                <p>
                  At Stylish Stars, we believe great grooming is for everyone. Our skilled professionals specialize in a wide range of beauty and grooming services for both men and women, combining modern trends with expert techniques to create looks that inspire confidence.
                </p>
                <p>
                  From precision haircuts and styling to beauty treatments, hair coloring, skincare, and grooming services, we are dedicated to delivering a personalized experience tailored to your unique style. In a welcoming and relaxing environment, we focus on quality, comfort, and customer satisfaction — ensuring every visit leaves you looking and feeling your best.
                </p>
                <p>
                  Whether you're preparing for a special occasion or simply refreshing your everyday look, Stylish Stars is your destination for professional beauty and grooming services.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-gold-500/30 transition-colors bg-[#110e0c]/50">
                <Award className="w-7 h-7 text-gold-500 mb-3" />
                <h4 className="text-2xl font-serif font-bold text-white mb-1">23<span className="text-gold-500">+</span></h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Years Experience</p>
              </div>
              
              <div className="p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-gold-500/30 transition-colors bg-[#110e0c]/50">
                <Users className="w-7 h-7 text-gold-500 mb-3" />
                <h4 className="text-2xl font-serif font-bold text-white mb-1">10000<span className="text-gold-500">+</span></h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Happy Customers</p>
              </div>
              
              <div className="p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-gold-500/30 transition-colors bg-[#110e0c]/50">
                <CheckCircle className="w-7 h-7 text-gold-500 mb-3" />
                <h4 className="text-2xl font-serif font-bold text-white mb-1">100<span className="text-gold-500">%</span></h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Certified Stylists</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
