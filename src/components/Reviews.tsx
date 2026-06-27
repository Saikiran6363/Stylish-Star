import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    text: "Excellent service and reasonable prices. The barbers are very skillful and polite. Did a great job with my hair cut and beard styling.",
    author: "Rahul S.",
    role: "Regular Client"
  },
  {
    text: "Been visiting here for years. Best salon in A.S. Rao Nagar area. Clean ambiance, very hygienic, and they use good quality products.",
    author: "Kiran Kumar",
    role: "Local Guide"
  },
  {
    text: "Good place for a quick trim or a complete makeover. The staff listens to what you want and delivers exactly that. Highly recommended!",
    author: "Venkatesh",
    role: "New Client"
  }
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#0b0a09] relative overflow-hidden z-10 border-t border-white/5">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 mix-blend-screen pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold-500 font-bold tracking-[0.2em] text-[11px] mb-3 uppercase">Testimonials</p>
          <h2 className="text-4xl sm:text-[3.5rem] font-serif font-bold text-white mb-6">
            Client <span className="text-gold-500">Stories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#110e0c]/80 p-8 rounded-3xl border border-white/5 relative group hover:border-gold-500/30 transition-colors"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-500/10 group-hover:text-gold-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-gold-500 fill-gold-500" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 text-[15px] leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="mt-auto border-t border-white/5 pt-6">
                <h4 className="font-bold text-white text-[15px]">{review.author}</h4>
                <p className="text-gray-500 text-[13px]">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
