'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM EST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [booked, setBooked] = useState(false);

  const availableSlots = [
    'Tomorrow, 10:00 AM EST',
    'Tomorrow, 2:00 PM EST',
    'Thursday, 11:30 AM EST',
    'Thursday, 3:00 PM EST',
    'Friday, 1:00 PM EST',
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const handleClose = () => {
    setBooked(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-[#0c2940]/70 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#ffffff] border border-[#0c2940]/15 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl z-10 text-[#0c2940]"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#0c2940]/60 hover:text-[#0c2940] hover:bg-[#39918d]/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!booked ? (
          <div>
            <div className="flex items-center space-x-2 text-[#3f6d67] text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4 text-[#39918d]" />
              <span>Executive Advisory</span>
            </div>

            <h3  className="t-h3 text-[#0c2940] mb-2">
              Book a Discovery Call
            </h3>
            <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-[#0c2940]/75 text-sm mb-6">
              Connect directly with our senior team to discuss cohort alignment, Enterprise tier customization, and final tier pricing.
            </p>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label style={{ fontFamily: "'Roboto', sans-serif" }} className="text-xs font-semibold text-[#0c2940] block mb-1.5">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedDate(slot)}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                        selectedDate === slot
                          ? 'bg-[#0c2940] text-white border-[#39918d] font-semibold shadow-xs'
                          : 'bg-[#ffffff] border-[#0c2940]/15 text-[#0c2940]/80 hover:border-[#39918d]/40'
                      }`}
                    >
                      <span>{slot}</span>
                      {selectedDate === slot && <Clock className="w-3.5 h-3.5 text-[#f8c51c]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: "'Roboto', sans-serif" }} className="text-xs font-semibold text-[#0c2940] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Executive Name"
                    className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl px-3 py-2.5 text-sm text-[#0c2940] focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Roboto', sans-serif" }} className="text-xs font-semibold text-[#0c2940] block mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="work.email@firm.com"
                    className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl px-3 py-2.5 text-sm text-[#0c2940] focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'Roboto', sans-serif" }} className="text-xs font-semibold text-[#0c2940] block mb-1">
                  Company & Role *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Corp, VP of Learning"
                  className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl px-3 py-2.5 text-sm text-[#0c2940] focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="w-full bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Confirm Discovery Call</span>
                  <ArrowRight className="w-4 h-4 text-[#0c2940]" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-[#3f6d67] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39918d]" />
                <span style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}>
                  Confidential consultation with senior faculty.
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-[#39918d]/15 border border-[#39918d] text-[#39918d] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-2xl font-bold text-[#0c2940]">
              Discovery Call Confirmed!
            </h3>
            <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm text-[#0c2940]/80 max-w-md mx-auto">
              We have reserved <span className="text-[#39918d] font-bold">{selectedDate}</span> for your session. Calendar invitation sent to <span className="text-[#0c2940] font-semibold">{email}</span>.
            </p>

            <button
              onClick={handleClose}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="bg-[#0c2940] hover:bg-[#184060] text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors mt-2 cursor-pointer"
            >
              Return to Program
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
