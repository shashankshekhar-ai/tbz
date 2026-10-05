import React, { useState } from 'react';
import { Workshop } from '../types';
import { X, CheckCircle2, Building, User, Mail, Briefcase, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface ReserveSeatModalProps {
  workshop: Workshop | null;
  onClose: () => void;
}

export const ReserveSeatModal: React.FC<ReserveSeatModalProps> = ({ workshop, onClose }) => {
  const [seatsCount, setSeatsCount] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  if (!workshop) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `BG-${workshop.category.slice(0, 3).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setReferenceCode(code);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0c2940]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#0c2940]"
      >
        {/* Top Header */}
        <div className="bg-[#0c2940] px-6 py-4 flex items-center justify-between border-b border-[#3f6d67]/30 text-white">
          <div>
            <span className="font-h3 text-[10px] font-bold tracking-[0.14em] uppercase text-[#39918d]">
              {workshop.formatTag}
            </span>
            <h3 className="font-h3 text-lg font-bold text-white mt-0.5">
              {isSubmitted ? 'Seat Confirmed' : 'Reserve Your Seat'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#3f6d67]/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto font-body">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-[#39918d]/15 text-[#39918d] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#39918d]/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h4 className="font-h2 text-2xl font-bold text-[#0c2940]">
                  Reservation Confirmed!
                </h4>
                <p className="font-body text-sm text-slate-600 max-w-md mx-auto">
                  Confirmation and onboarding materials have been dispatched to{' '}
                  <span className="font-semibold text-[#0c2940]">{email}</span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left space-y-3">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="font-h3 text-xs uppercase tracking-wider text-slate-500">
                      Workshop
                    </span>
                    <p className="font-h3 font-semibold text-[#0c2940] text-sm">
                      {workshop.title}
                    </p>
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#f8c51c]/15 text-[#0c2940] border border-[#f8c51c]/30">
                    {referenceCode}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Format &amp; Series</span>
                    <span className="font-medium text-[#0c2940]">
                      {workshop.formatTag}
                    </span>
                    <span className="text-slate-500 block">
                      Facilitated by {workshop.facilitator.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Attendees</span>
                    <span className="font-medium text-[#0c2940]">
                      {fullName} ({seatsCount} {seatsCount === 1 ? 'Seat' : 'Seats'})
                    </span>
                    <span className="text-slate-500 block">{company}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-lg bg-[#0c2940] hover:bg-[#0c2940]/90 text-white text-sm font-h3 font-semibold transition-colors shadow cursor-pointer"
                >
                  Return to Catalog
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h4 className="font-h3 text-xl font-bold text-[#0c2940]">
                  {workshop.title}
                </h4>
                <p className="font-body text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#39918d]" />
                  <span>{workshop.formatTag} • Led by {workshop.facilitator.name}</span>
                </p>
              </div>

              {/* Seats Count */}
              <div className="space-y-1.5">
                <label className="font-h3 text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#39918d]" />
                  <span>Number of Seats</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSeatsCount(num)}
                      className={`px-3.5 py-1.5 text-xs font-h3 font-semibold rounded-md border transition-all cursor-pointer ${
                        seatsCount === num
                          ? 'bg-[#0c2940] text-[#f8c51c] border-[#0c2940]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {num} {num === 1 ? 'Seat' : 'Seats'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendee Details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="font-body text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lead Attendee Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Corporate Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Company / Organization *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Organization name"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Role / Title *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Job function"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-h3 font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#f8c51c] text-[#0c2940] font-h3 font-bold text-xs uppercase tracking-wider transition-all shadow hover:brightness-105 cursor-pointer"
                >
                  Confirm Reservation ({seatsCount} {seatsCount === 1 ? 'Seat' : 'Seats'})
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
