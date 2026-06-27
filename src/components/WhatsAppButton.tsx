import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/stylishstarparlour/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(188,24,136,0.39)] hover:shadow-[0_6px_20px_rgba(188,24,136,0.6)] transition-all duration-300 flex items-center justify-center cursor-pointer group"
        aria-label="Visit us on Instagram"
      >
        <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-[#0b0a09] border border-white/10 text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
          Follow us!
        </span>
        <Instagram className="w-8 h-8" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919000375091"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center cursor-pointer group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-[#0b0a09] border border-white/10 text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
          Chat with us!
        </span>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.11.547 4.148 1.585 5.946L.044 23.385l5.541-1.455c1.724.966 3.682 1.479 5.69 1.479 6.648 0 12.031-5.383 12.031-12.031S18.679 0 12.031 0zm0 21.43c-1.802 0-3.568-.484-5.115-1.401l-.367-.217-3.801.996.996-3.801-.217-.367C2.61 14.895 2.126 13.13 2.126 11.328 2.126 5.86 6.564 1.42 12.031 1.42c5.468 0 9.906 4.439 9.906 9.906 0 5.468-4.438 9.906-9.906 9.906zM17.472 14.18c-.297-.149-1.758-.868-2.031-.968-.272-.099-.472-.149-.669.149-.198.297-.768.968-.941 1.166-.174.198-.348.223-.645.074-.297-.149-1.255-.462-2.39-1.475-.882-.788-1.478-1.761-1.651-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.241-.579-.487-.501-.669-.51l-.571-.01c-.198 0-.521.074-.793.372-.272.298-1.041 1.016-1.041 2.478 0 1.463 1.066 2.877 1.214 3.075.149.198 2.095 3.196 5.076 4.482 2.981 1.286 2.981.868 3.526.818.545-.05 1.758-.719 2.006-1.413.248-.694.248-1.289.174-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </motion.a>
    </div>
  );
}
