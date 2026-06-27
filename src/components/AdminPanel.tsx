import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Settings, Shield, UserX, Calendar, Clock, Lock, Trash2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const timeSlots = [
  '06:30 AM', '07:30 AM', '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', 
  '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM',
  '06:30 PM', '07:30 PM'
];

interface Leave {
  start: string;
  end: string;
}

interface BlockedSlot {
  date: string;
  time: string;
}

interface Stylist {
  id: string;
  name: string;
  role: string;
  available: boolean;
  leaves: Leave[];
  blockedSlots: BlockedSlot[];
}

export function AdminPanel() {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Add leave state
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');

  // Block slot state
  const [blockDate, setBlockDate] = useState('');
  const [blockTime, setBlockTime] = useState(timeSlots[0]);

  useEffect(() => {
    fetch('/api/stylists')
      .then(res => res.json())
      .then(data => {
         if (Array.isArray(data)) setStylists(data);
         else setStylists([]);
      })
      .catch(console.error);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    fetch('/api/admin/stylists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stylists)
    })
      .then(res => res.json())
      .then(() => {
        setMessage('Changes saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(console.error)
      .finally(() => setIsSaving(false));
  };

  const toggleAvailability = (id: string) => {
    setStylists(stylists.map(s => 
      s.id === id ? { ...s, available: !s.available } : s
    ));
  };

  const addLeave = (id: string) => {
    if (!leaveStart || !leaveEnd) {
      alert("Select start and end date for leave.");
      return;
    }
    setStylists(stylists.map(s => {
      if (s.id === id) {
        return {
          ...s,
          leaves: [...s.leaves, { start: leaveStart, end: leaveEnd }]
        };
      }
      return s;
    }));
    setLeaveStart('');
    setLeaveEnd('');
  };

  const removeLeave = (stylistId: string, leaveIndex: number) => {
    setStylists(stylists.map(s => {
      if (s.id === stylistId) {
        return {
          ...s,
          leaves: s.leaves.filter((_, i) => i !== leaveIndex)
        };
      }
      return s;
    }));
  };

  const addBlockedSlot = (id: string) => {
    if (!blockDate || !blockTime) {
      alert("Select date and time slot to block.");
      return;
    }
    setStylists(stylists.map(s => {
      if (s.id === id) {
        // Prevent duplicate blocks
        if (!s.blockedSlots.find(b => b.date === blockDate && b.time === blockTime)) {
          return {
            ...s,
            blockedSlots: [...s.blockedSlots, { date: blockDate, time: blockTime }]
          };
        }
      }
      return s;
    }));
  };

  const removeBlockedSlot = (stylistId: string, slotIndex: number) => {
    setStylists(stylists.map(s => {
      if (s.id === stylistId) {
        return {
          ...s,
          blockedSlots: s.blockedSlots.filter((_, i) => i !== slotIndex)
        };
      }
      return s;
    }));
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-10"
      >
        <div>
          <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
            ← Back to Home
          </a>
          <h1 className="text-4xl font-serif text-white font-bold flex items-center gap-3">
            <Shield className="text-gold-500 w-10 h-10" />
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-2">Manage stylist availability, holidays, and blocked timeslots.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gold-500 text-dark-950 font-bold py-3 px-8 rounded-full hover:shadow-[0_0_20px_rgba(216,168,86,0.3)] transition-all flex items-center gap-2"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </motion.div>

      {message && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl">
          {message}
        </div>
      )}

      <div className="space-y-8">
        {stylists.map(stylist => (
          <div key={stylist.id} className="bg-[#0b0a09] border border-white/10 p-6 sm:p-8 rounded-3xl relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                  <User className="text-gold-500 w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white">{stylist.name}</h2>
                  <p className="text-gray-400">{stylist.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium tracking-widest uppercase text-gray-500">Status</span>
                <button
                  onClick={() => toggleAvailability(stylist.id)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    stylist.available 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {stylist.available ? 'Available' : 'Unavailable'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Leaves Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  Leave Dates (Holidays)
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="date"
                    value={leaveStart}
                    onChange={e => setLeaveStart(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                  />
                  <span className="self-center text-gray-500">to</span>
                  <input 
                    type="date"
                    value={leaveEnd}
                    onChange={e => setLeaveEnd(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                  />
                  <button 
                    onClick={() => addLeave(stylist.id)}
                    className="bg-white/10 text-white px-6 rounded-xl hover:bg-gold-500 hover:text-black font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                {stylist.leaves.length > 0 ? (
                  <ul className="space-y-3">
                    {stylist.leaves.map((l, i) => (
                      <li key={i} className="flex justify-between items-center bg-black/30 border border-white/5 py-3 px-4 rounded-xl">
                        <span className="text-gray-300 font-mono text-sm">{format(new Date(l.start), 'dd MMM yyyy')} - {format(new Date(l.end), 'dd MMM yyyy')}</span>
                        <button onClick={() => removeLeave(stylist.id, i)} className="text-red-400 hover:text-red-300 transition-colors p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm italic">No leaves scheduled.</p>
                )}
              </div>

              {/* Blocked Time Slots */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gold-500" />
                  Block Specific Time Slots
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="date"
                    value={blockDate}
                    onChange={e => setBlockDate(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                  />
                  <select 
                    value={blockTime}
                    onChange={e => setBlockTime(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => addBlockedSlot(stylist.id)}
                    className="bg-white/10 text-white px-6 rounded-xl hover:bg-gold-500 hover:text-black font-medium transition-colors"
                  >
                    Block
                  </button>
                </div>
                
                {stylist.blockedSlots.length > 0 ? (
                  <ul className="space-y-3">
                    {stylist.blockedSlots.map((b, i) => (
                      <li key={i} className="flex justify-between items-center bg-black/30 border border-white/5 py-3 px-4 rounded-xl">
                        <span className="text-gray-300 font-mono text-sm">{format(new Date(b.date), 'dd MMM yyyy')} at {b.time}</span>
                        <button onClick={() => removeBlockedSlot(stylist.id, i)} className="text-red-400 hover:text-red-300 transition-colors p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm italic">No time slots blocked.</p>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
