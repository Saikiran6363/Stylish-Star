import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-800 py-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-dark-800 pb-8 mb-8">
          <div className="flex items-center flex-shrink-0">
            <Logo className="text-[2.5rem]" />
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400 font-medium">
            <a href="#home" className="hover:text-gold-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-gold-500 transition-colors">About</a>
            <a href="#services" className="hover:text-gold-500 transition-colors">Services</a>
            <a href="#book" className="hover:text-gold-500 transition-colors">Book</a>
          </div>
        </div>
        
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Stylish Stars Salon. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/admin" className="hover:text-gray-300">Admin Panel</a>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
