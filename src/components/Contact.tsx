import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0b0a09] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold-500 font-bold tracking-[0.2em] text-[11px] mb-3 uppercase">Contact</p>
          <h2 className="text-4xl sm:text-[3.5rem] font-serif font-bold text-white mb-6">
            Visit <span className="text-gold-500">Stylish Stars</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">
          
          {/* Contact Details Cards */}
          <div className="space-y-4 flex flex-col h-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0b0a09] border border-white/10 rounded-3xl p-6 px-8 flex gap-6 items-center flex-1 group hover:border-gold-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a1612] flex items-center justify-center border border-white/5 group-hover:border-gold-500/30 transition-colors">
                <MapPin className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-1.5">Address</p>
                <p className="text-white text-[15px] font-medium leading-tight">East Maruthi Nagar, Anupuram Colony</p>
                <p className="text-gray-400 text-sm">A. S. Rao Nagar, Secunderabad 500062</p>
              </div>
            </motion.div>

            <motion.a 
              href="tel:+919000375091"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0b0a09] border border-white/10 rounded-3xl p-6 px-8 flex gap-6 items-center flex-1 group hover:border-gold-500/30 hover:bg-[#110e0c] cursor-pointer transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a1612] flex items-center justify-center border border-white/5 group-hover:border-gold-500/30 group-hover:scale-110 transition-all">
                <Phone className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-1.5">Phone</p>
                <p className="text-white text-[15px] font-medium group-hover:text-gold-500 transition-colors">+91 90003 75091</p>
              </div>
            </motion.a>

            <motion.a 
              href="mailto:starparlour28@gmail.com"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0b0a09] border border-white/10 rounded-3xl p-6 px-8 flex gap-6 items-center flex-1 group hover:border-gold-500/30 hover:bg-[#110e0c] cursor-pointer transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a1612] flex items-center justify-center border border-white/5 group-hover:border-gold-500/30 group-hover:scale-110 transition-all">
                <Mail className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-1.5">Email</p>
                <p className="text-white text-[15px] font-medium group-hover:text-gold-500 transition-colors">starparlour28@gmail.com</p>
              </div>
            </motion.a>
          </div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full min-h-[450px] w-full bg-[#110e0c] rounded-3xl overflow-hidden border border-white/10"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Stylish%20Star%20Parlour,%20East%20Maruthi%20Nagar,%20Secunderabad&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="filter contrast-125 saturate-50 opacity-90 hover:saturate-100 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
