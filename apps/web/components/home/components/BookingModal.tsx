'use client';

import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Executive Leader',
    path: 'For Leaders',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0c2940] border border-[#39918d]/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#39918d]/30 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#f8c51c]" />
            <h3 className="font-h2 text-lg text-white">Book Strategic Consultation</h3>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-[#3f6d67]/20 text-[#3f6d67] rounded-full flex items-center justify-center mx-auto border border-[#3f6d67]/30">
              <CheckCircle2 className="w-8 h-8 text-[#3f6d67]" />
            </div>
            <h4 className="font-h2 text-xl text-white">Consultation Confirmed</h4>
            <p className="text-xs font-body text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, {form.name}. Our C-suite consulting team has received your request for the 30-minute confidential session. A calendar invite has been dispatched to {form.email}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-[#39918d] hover:bg-[#3f6d67] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Eleanor Vance"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#39918d]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Work Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="eleanor@enterprise.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#39918d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Organization / Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Global Inc."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#39918d]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Primary Focus Path</label>
              <select
                value={form.path}
                onChange={e => setForm({ ...form, path: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
              >
                <option value="For You">For You (Individual Coaching & Agent Workflows)</option>
                <option value="For Leaders">For Leaders (VPs, Department Heads & Readiness Audit)</option>
                <option value="For Organizations">For Organizations (Enterprise AI Architecture & ROI)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Key Objectives / Notes</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="Briefly describe your team's current AI maturity or goals..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#39918d] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#39918d] hover:bg-[#3f6d67] text-white font-semibold uppercase tracking-wider text-xs transition-all shadow-lg cursor-pointer"
              >
                Confirm 30-Min Discovery Session
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
