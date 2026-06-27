import { useState, useEffect, FormEvent } from 'react';
import { format, addDays } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, User, Clock as ClockIcon, CheckCircle, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { allRatesCategories } from '../data/servicesData';

const allServices = [
  ...(allRatesCategories || []).flatMap(c => c?.items || []), 
  { name: 'Home Service Call', duration: 'Custom', price: 'Call For Charges' }, 
  { name: 'Events Booking', duration: 'Custom', price: 'Call For Charges' }
];

const dummyStylists = [
  { id: '1', name: 'Thiru', role: 'Master Stylist', available: true, leaves: [] },
];

const timeSlots = [
  '06:30 AM', '07:30 AM', '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', 
  '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM',
  '06:30 PM', '07:30 PM'
];

export function Booking() {
  const initialDate = (() => {
    let d = new Date();
    if (d.getDay() === 2) { // 2 = Tuesday
      d = addDays(d, 1);
    }
    return d;
  })();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  
  const [stylists, setStylists] = useState<any[]>([]);
  const [selectedStylist, setSelectedStylist] = useState('');
  
  const fetchStylists = () => {
    fetch('/api/stylists')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStylists(data);
          if (data.length > 0 && !selectedStylist) {
            setSelectedStylist(data[0].id);
          }
        } else {
          setStylists([]);
        }
      })
      .catch(console.error);
  };
  
  useEffect(() => {
    fetchStylists();
  }, []);
  
  const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
  
  const availableStylists = stylists.filter(stylist => {
    if (!stylist.available) return false;
    // Check if selectedDate falls in any leave period
    for (const leave of (stylist.leaves || [])) {
      if (formattedSelectedDate >= leave.start && formattedSelectedDate <= leave.end) {
        return false;
      }
    }
    return true;
  });

  // If the currently selected stylist becomes unavailable, select the first available one
  useEffect(() => {
    if (availableStylists.length > 0) {
      const isSelectedAvailable = availableStylists.find(s => s.id === selectedStylist);
      if (!isSelectedAvailable) {
        setSelectedStylist(availableStylists[0].id);
      }
    }
  }, [formattedSelectedDate, stylists]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState(allServices[0]?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const currentService = allServices.find(s => s.name === selectedServiceName) || allServices[0] || { name: '', duration: '', price: '' };

  const computeDisplayAmt = () => {
    const priceStr = currentService.price || '';
    if (!priceStr || priceStr === 'Custom' || priceStr.includes('EXTRA') || priceStr.startsWith('₹') || priceStr.toLowerCase().includes('call') || priceStr.toLowerCase().includes('starting')) {
      return priceStr || 'Custom';
    }
    const parts = priceStr.split(',').map((p: string) => p.trim());
    return `₹${parts.join(', ')}`;
  };
  const displayAmt = computeDisplayAmt();
  
  const dates = Array.from({ length: 20 })
    .map((_, i) => addDays(new Date(), i))
    .filter(date => date.getDay() !== 2)
    .slice(0, 14);

  const fetchBookings = async () => {
    try {
      const stylist = stylists.find(s => s.id === selectedStylist);
      if (!stylist) return;
      const res = await fetch(`/api/bookings?date=${encodeURIComponent(format(selectedDate, 'PPP'))}&formattedDate=${encodeURIComponent(format(selectedDate, 'yyyy-MM-dd'))}&stylistName=${encodeURIComponent(stylist.name)}`);
      if (res.ok) {
        const data = await res.json();
        setBookedSlots(data);
      }
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  useEffect(() => {
    fetchBookings();
    setSelectedTime(null);
  }, [selectedDate, selectedStylist]);

  const handleBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }
    
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Please fill in all customer details.");
      return;
    }
    
    setIsSubmitting(true);
    setWarningMessage('');
    
    try {
      const stylist = stylists.find(s => s.id === selectedStylist);
      
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: format(selectedDate, 'PPP'),
          time: selectedTime,
          service: selectedServiceName,
          stylistName: stylist?.name,
          customerName,
          customerPhone
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Automatically open WhatsApp
        const template = `Hello! New Booking at Stylish Stars Salon:\n\n*Name:* ${customerName}\n*Phone:* ${customerPhone}\n*Service:* ${selectedServiceName}\n*Date:* ${format(selectedDate, 'PPP')}\n*Time:* ${selectedTime}`;
        const whatsappMessage = encodeURIComponent(template);
        const businessPhone = "916363760616";
        window.open(`https://wa.me/${businessPhone}?text=${whatsappMessage}`, '_blank');
        
        setIsSuccess(true);
        if (data.warning) {
          setWarningMessage(data.warning);
        }
        fetchBookings();
      } else {
        alert(`Error booking: ${data.error}`);
      }
    } catch (err) {
      alert('Network error while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="py-24 bg-dark-950 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-gold-500 font-bold tracking-[0.2em] text-[11px] mb-3 uppercase">Book Online</p>
          <h2 className="text-4xl sm:text-[3.5rem] font-serif font-bold text-white mb-6 tracking-tight">
            Reserve Your <span className="text-gold-500">Experience</span>
          </h2>
        </motion.div>        <div className="bg-dark-950 border border-gold-500/20 rounded-[2rem] p-6 lg:p-10 relative">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 flex flex-col items-center justify-center space-y-6"
            >
              <CheckCircle className="w-20 h-20 text-gold-500 mb-4" />
              <h3 className="text-3xl font-serif font-bold text-white tracking-tight">Booking Confirmed!</h3>
              <p className="text-gray-400 max-w-md mx-auto text-[15px]">
                Your appointment has been successfully scheduled. We look forward to seeing you at Stylish Stars.
              </p>
              {warningMessage && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6 max-w-md mx-auto">
                  <p className="text-[#d8a856] text-[13px]">{warningMessage}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setWarningMessage('');
                    setCustomerName('');
                    setCustomerPhone('');
                    setSelectedTime(null);
                  }}
                  className="bg-white/5 border border-white/10 text-white font-medium py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
                >
                  Book Another
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleBooking}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 overflow-hidden">
                
                {/* Left Column */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-10"
                >
                  
                  {/* Date */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-gold-500 uppercase tracking-[0.15em] text-[11px] font-bold">
                        <CalendarIcon className="w-4 h-4" />
                        Select Date
                      </div>
                      <span className="text-[10px] text-gray-500 italic block">Closed on Tuesdays</span>
                    </div>
                    <div className="flex overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {dates.map((date, i) => {
                        const isSelected = format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                        
                        const formattedDate = format(date, 'yyyy-MM-dd');
                        const isDateAvailable = stylists.some(stylist => {
                          if (!stylist.available) return false;
                          for (const leave of (stylist.leaves || [])) {
                            if (formattedDate >= leave.start && formattedDate <= leave.end) {
                              return false;
                            }
                          }
                          return true;
                        });

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={cn(
                              "flex-shrink-0 flex flex-col items-center justify-center w-[4.5rem] h-[5.5rem] rounded-2xl border transition-all snap-start",
                              isSelected 
                                ? "bg-gradient-to-b from-[#e5b75a] to-[#d8a856] border-[#d8a856] text-[#1a1612] shadow-[0_0_15px_rgba(216,168,86,0.3)]" 
                                : !isDateAvailable 
                                  ? "bg-[#0b0a09] border-red-500/10 text-red-900/50 cursor-not-allowed opacity-50"
                                  : "bg-[#0b0a09] border-white/10 text-gray-400 hover:border-gold-500/30"
                            )}
                          >
                            <span className="text-[10px] uppercase font-bold tracking-widest">{format(date, 'EEE')}</span>
                            <span className={cn("text-2xl font-bold my-1 tracking-tight", isSelected ? "text-[#1a1612]" : "text-white")}>
                              {format(date, 'dd')}
                            </span>
                            <span className="text-[10px] font-medium">{format(date, 'MMM')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
    
                  {/* Stylist & Time (or Error message) */}
                  {availableStylists.length > 0 ? (
                    <>
                      {/* Stylist */}
                      <div>
                        <div className="flex items-center gap-2 mb-4 text-gold-500 uppercase tracking-[0.15em] text-[11px] font-bold">
                          <User className="w-4 h-4" />
                          Choose Your Stylist
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {availableStylists.map((stylist) => (
                            <button
                              key={stylist.id}
                              type="button"
                              onClick={() => setSelectedStylist(stylist.id)}
                              className={cn(
                                "p-4 rounded-xl border text-left transition-all",
                                selectedStylist === stylist.id
                                  ? "bg-[#0b0a09] border-gold-500 shadow-[0_0_10px_rgba(216,168,86,0.1)]"
                                  : "bg-[#0b0a09] border-white/10 hover:border-gold-500/30"
                              )}
                            >
                              <h4 className={cn("font-medium text-[15px] mb-0.5", selectedStylist === stylist.id ? "text-white" : "text-gray-300")}>
                                {stylist.name}
                              </h4>
                              <p className={cn("text-[13px]", selectedStylist === stylist.id ? "text-gray-400" : "text-gray-500")}>
                                {stylist.role}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
        
                      {/* Time */}
                      <div>
                        <div className="flex items-center gap-2 mb-4 text-gold-500 uppercase tracking-[0.15em] text-[11px] font-bold">
                          <ClockIcon className="w-4 h-4" />
                          Select Time Slot
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {timeSlots.map((time) => {
                            const isBooked = bookedSlots.includes(time);
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                disabled={isBooked}
                                onClick={() => setSelectedTime(time)}
                                className={cn(
                                  "py-3 rounded-lg border text-[13px] font-medium transition-all",
                                  isBooked 
                                    ? "bg-[#0b0a09] border-white/5 text-gray-700 cursor-not-allowed" 
                                    : isSelected
                                      ? "bg-gold-500 border-gold-500 text-dark-950 shadow-[0_0_10px_rgba(216,168,86,0.3)]"
                                      : "bg-[#0b0a09] border-white/10 text-gray-400 hover:border-gold-500/50 hover:text-white"
                                )}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                      <p className="text-red-400 text-sm font-medium">Sorry, the stylist is unavailable on this date. Please choose another date.</p>
                    </div>
                  )}
    
                </motion.div>
    
                {/* Right Column */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-8 flex flex-col"
                >
                  
                  <div>
                    <div className="mb-4 text-gold-500 uppercase tracking-[0.15em] text-[11px] font-bold">
                      Your Details
                    </div>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#0b0a09] border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-medium"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#0b0a09] border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-medium"
                      />
                      <div className="relative w-full">
                        <select 
                          required
                          value={selectedServiceName}
                          className="w-full bg-[#0b0a09] border border-white/10 rounded-xl px-5 py-4 text-[15px] text-gray-300 appearance-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-medium pr-12"
                          onChange={(e) => {
                            const v = e.target.value;
                            setSelectedServiceName(v);
                          }}
                        >
                          {(allRatesCategories || []).map((category, catIdx) => (
                            <optgroup label={category?.title || 'Other'} key={catIdx}>
                              {(category?.items || []).map((service, idx) => (
                                <option key={`${catIdx}-${idx}`} value={service?.name || ''}>
                                  {service?.name || 'Service'}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                          <optgroup label="Special Services">
                            <option value="Events Booking">Events Booking</option>
                            <option value="Home Service Call">Home Service Call</option>
                          </optgroup>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
    
                  {/* Summary Card */}
                  <div className="bg-[#0b0a09] border border-[#d8a856]/20 rounded-2xl p-6 mt-auto">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h5 className="text-white text-[15px] font-medium mb-1">{selectedServiceName}</h5>
                        <p className="text-[13px] text-gray-500">with {stylists.find(s => s.id === selectedStylist)?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] text-white font-medium mb-1">Time pending</p>
                        <p className="text-[13px] text-gray-500">{stylists.find(s => s.id === selectedStylist)?.role}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                      <span className="text-gray-400 uppercase tracking-[0.2em] text-[11px] font-bold pb-2">Total</span>
                      <span className="text-[2.5rem] leading-none font-serif text-gold-500 font-medium tracking-tight">{displayAmt}</span>
                    </div>
                  </div>
    
                  <button 
                    type="submit"
                    disabled={!selectedTime || isSubmitting}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-[#1a1612] font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(216,168,86,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </motion.div>
    
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
