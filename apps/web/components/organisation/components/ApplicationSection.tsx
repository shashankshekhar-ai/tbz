'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, MessageSquare, Bot, User, Building2, Users2, ArrowRight } from 'lucide-react';
import { CohortTierId, ApplicationFormData, SolomonMessage } from '../types';

interface ApplicationSectionProps {
  selectedTier: CohortTierId;
  onSelectTier: (tier: CohortTierId) => void;
  onBookCallClick: () => void;
}

export const ApplicationSection: React.FC<ApplicationSectionProps> = ({
  selectedTier,
  onSelectTier,
  onBookCallClick,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    cohortTier: selectedTier,
    goals: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync tier when prop changes
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, cohortTier: selectedTier }));
  }, [selectedTier]);

  // Solomon AI Interactive Q&A State
  const [chatMessages, setChatMessages] = useState<SolomonMessage[]>([
    {
      id: '1',
      sender: 'solomon',
      text: "Greetings! I'm Solomon, your AI L&D strategist. Your application has been logged for our senior faculty. While the admissions team reviews your submission, how can I help you regarding our curriculum, the Walter L&D track, or executive alignment?",
      timestamp: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'How does the Walter track address change management?',
    'What is the weekly time commitment?',
    'Can our entire executive team join as an Enterprise cohort?',
    'How do I request employer tuition reimbursement?',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg: SolomonMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Thank you for asking. In The Solomon Engine, we focus heavily on practical organizational impact — bridging frontier technical models with human-centered change management and governance protocols.";
      
      const lower = query.toLowerCase();
      if (lower.includes('walter') || lower.includes('change management') || lower.includes('l&d')) {
        reply = "The Walter Track is specifically architected for L&D strategists: it covers instructional design for prompt fluency, establishing psychological safety to reduce employee AI anxiety, and setting up quantitative measurement rubrics for executive reporting.";
      } else if (lower.includes('time') || lower.includes('commitment') || lower.includes('hours')) {
        reply = "The 12-week program is designed for busy senior leaders: expect approximately 2 hours of live executive masterclass and 1 hour of applied peer lab per week, supported by asynchronous playbooks.";
      } else if (lower.includes('enterprise') || lower.includes('team')) {
        reply = "Yes! The Enterprise Tier offers a fully dedicated cohort tailored to your specific organizational stack, including a comprehensive departmental readiness audit and org-wide rollout roadmap.";
      } else if (lower.includes('reimbursement') || lower.includes('tax') || lower.includes('tuition')) {
        reply = "Tuition is eligible for employer L&D budgets as executive professional development. The Bradbury Group provides an itemized tax invoice, W-9, and program syllabus upon enrollment.";
      }

      const botMsg: SolomonMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'solomon',
        text: reply,
        timestamp: 'Just now',
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section id="application" className="py-20 md:py-28 bg-[#ffffff] text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Eyebrow */}
          <span
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-xs font-bold uppercase tracking-widest text-[#3f6d67] bg-[#39918d]/10 border border-[#39918d]/30 px-4 py-1.5 rounded-full inline-block mb-4"
          >
            Apply / Interview
          </span>

          {/* H2 Title */}
          <h2
             className="t-h2 text-[#0c2940] mb-4"
          >
            Start Your Application
          </h2>

          {/* Body */}
          <p
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="text-[#0c2940]/80 text-base sm:text-lg leading-relaxed"
          >
            Submit your interest below — once received, Solomon, our AI L&D strategist, becomes available to answer questions while our team reviews your application.
          </p>
        </div>

        {/* Form Container (Dark & Light Mixed Theme styling) */}
        <div className="bg-[#f8fafb] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#0c2940]/15 shadow-xl relative">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="application-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Cohort Tier Selector */}
                <div>
                  <label
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-xs font-bold uppercase tracking-wider text-[#0c2940] block mb-2"
                  >
                    Select Cohort Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTier('enterprise');
                        setFormData((prev) => ({ ...prev, cohortTier: 'enterprise' }));
                      }}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        formData.cohortTier === 'enterprise'
                          ? 'bg-[#0c2940] text-white border-[#39918d] ring-2 ring-[#39918d]/30 shadow-md'
                          : 'bg-[#ffffff] text-[#0c2940] border-[#0c2940]/15 hover:border-[#39918d]/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className={`w-5 h-5 ${formData.cohortTier === 'enterprise' ? 'text-[#39918d]' : 'text-[#39918d]'}`} />
                        <div>
                          <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm font-bold">Enterprise Tier</p>
                          <p className={`text-xs ${formData.cohortTier === 'enterprise' ? 'text-white/70' : 'text-[#0c2940]/60'}`}>
                            Custom pricing & dedicated cohort
                          </p>
                        </div>
                      </div>
                      {formData.cohortTier === 'enterprise' && (
                        <CheckCircle2 className="w-5 h-5 text-[#39918d] shrink-0" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectTier('small-business');
                        setFormData((prev) => ({ ...prev, cohortTier: 'small-business' }));
                      }}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        formData.cohortTier === 'small-business'
                          ? 'bg-[#0c2940] text-white border-[#f8c51c] ring-2 ring-[#f8c51c]/30 shadow-md'
                          : 'bg-[#ffffff] text-[#0c2940] border-[#0c2940]/15 hover:border-[#f8c51c]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Users2 className={`w-5 h-5 ${formData.cohortTier === 'small-business' ? 'text-[#f8c51c]' : 'text-[#c57b4b]'}`} />
                        <div>
                          <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm font-bold">Small Business Tier</p>
                          <p className={`text-xs ${formData.cohortTier === 'small-business' ? 'text-white/70' : 'text-[#0c2940]/60'}`}>
                            Starting at $2,400 / seat
                          </p>
                        </div>
                      </div>
                      {formData.cohortTier === 'small-business' && (
                        <CheckCircle2 className="w-5 h-5 text-[#f8c51c] shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="field-name"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                    className="text-sm font-semibold text-[#0c2940] block mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="field-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl px-4 py-3.5 text-base text-[#0c2940] placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="field-email"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                    className="text-sm font-semibold text-[#0c2940] block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="field-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@organization.com"
                    className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl px-4 py-3.5 text-base text-[#0c2940] placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="field-company"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                    className="text-sm font-semibold text-[#0c2940] block mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="field-company"
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Organization Name"
                    className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl px-4 py-3.5 text-base text-[#0c2940] placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-colors"
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="field-role"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                    className="text-sm font-semibold text-[#0c2940] block mb-2"
                  >
                    Role
                  </label>
                  <input
                    id="field-role"
                    type="text"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Chief Learning Officer, VP of Product, Director"
                    className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl px-4 py-3.5 text-base text-[#0c2940] placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-colors"
                  />
                </div>

                {/* What are you hoping to get out of the cohort? */}
                <div>
                  <label
                    htmlFor="field-goals"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                    className="text-sm font-semibold text-[#0c2940] block mb-2"
                  >
                    What are you hoping to get out of the cohort?
                  </label>
                  <textarea
                    id="field-goals"
                    name="goals"
                    required
                    rows={4}
                    value={formData.goals}
                    onChange={handleChange}
                    placeholder="Describe your organization's AI transformation goals, team enablement challenges, or key priorities..."
                    className="w-full bg-[#ffffff] border border-[#0c2940]/20 rounded-xl p-4 text-base text-[#0c2940] placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-colors resize-y"
                  />
                </div>

                {/* Submit Application Button */}
                <button
                  id="submit-application-btn"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="w-full bg-[#0c2940] hover:bg-[#153c5c] text-white font-bold text-base py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer"
                >
                  <span>Submit Application</span>
                  <Send className="w-4 h-4 text-[#f8c51c]" />
                </button>
              </motion.form>
            ) : (
              /* Post-submission: Solomon AI L&D Strategist Interactive Interface */
              <motion.div
                key="application-chat"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Success Header */}
                <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#39918d]/30 text-center space-y-3">
                  <div className="w-12 h-12 bg-[#39918d]/15 text-[#39918d] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#39918d]" />
                  </div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-2xl font-bold text-[#0c2940]">
                    Application Received, {formData.name.split(' ')[0]}!
                  </h3>
                  <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-[#0c2940]/80 text-sm max-w-lg mx-auto">
                    Our senior faculty is reviewing your application for the <span className="font-bold text-[#39918d]">{formData.cohortTier === 'enterprise' ? 'Enterprise Tier' : 'Small Business Tier'}</span>.
                  </p>
                </div>

                {/* Solomon AI Assistant Live Chat Card */}
                <div className="bg-[#0c2940] text-white rounded-2xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-[#39918d]/20 border border-[#39918d]/40 text-[#f8c51c]">
                        <Bot className="w-6 h-6 text-[#f8c51c]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-base font-bold text-white">
                            Solomon — AI L&D Strategist
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <p style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }} className="text-xs text-white/70">
                          Interactive Assistant & Cohort Advisor
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={onBookCallClick}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className="hidden sm:inline-flex bg-[#f8c51c] text-[#0c2940] font-bold text-xs px-3.5 py-1.5 rounded-lg items-center space-x-1 cursor-pointer"
                    >
                      <span>Book Discovery Call</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Messages Feed */}
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'solomon' && (
                          <div className="w-7 h-7 rounded-full bg-[#39918d] flex items-center justify-center shrink-0 mt-1">
                            <Bot className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        <div
                          className={`p-3.5 rounded-2xl text-sm max-w-md ${
                            msg.sender === 'user'
                              ? 'bg-[#39918d] text-white rounded-tr-none'
                              : 'bg-white/10 text-white/95 rounded-tl-none border border-white/10'
                          }`}
                        >
                          <p style={{ fontFamily: "'Roboto', sans-serif" }}>{msg.text}</p>
                        </div>
                        {msg.sender === 'user' && (
                          <div className="w-7 h-7 rounded-full bg-[#f8c51c] text-[#0c2940] flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex items-center space-x-2 text-white/60 text-xs p-2">
                        <span className="animate-pulse">Solomon is thinking...</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Question Chips */}
                  <div className="pt-2">
                    <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs text-white/60 mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(q)}
                          className="bg-white/5 hover:bg-white/15 text-white/90 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Row */}
                  <div className="pt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Ask Solomon about the cohort, frameworks, or L&D roadmaps..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#f8c51c]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      className="bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold p-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#0c2940]" />
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#0c2940]/60 hover:text-[#0c2940] underline underline-offset-4 cursor-pointer"
                  >
                    Edit submitted application details
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
