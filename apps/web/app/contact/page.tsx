import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery call with The Bradbury Group or send an inquiry about training, consulting, or speaking.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">Let&apos;s talk</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-xl">
            Whether you&apos;re looking for training, consulting, or a keynote speaker — the first
            step is a conversation.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact form — wired to FastAPI /contact in Phase 5 */}
          <div>
            <h2 className="text-xl font-montserrat font-bold text-[#0c2940] mb-6">Send a message</h2>
            <form className="space-y-4" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block text-sm font-roboto font-medium text-[#60707A] mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-roboto font-medium text-[#60707A] mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-roboto font-medium text-[#60707A] mb-1">
                  Organization
                </label>
                <input
                  id="organization"
                  type="text"
                  name="organization"
                  className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-roboto font-medium text-[#60707A] mb-1">
                  I&apos;m interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                >
                  <option value="">Select one</option>
                  <option value="training">AI Fluency Training</option>
                  <option value="consulting">AI Readiness Consulting</option>
                  <option value="solomon-engine">The Solomon Engine</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-roboto font-medium text-[#60707A] mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                />
              </div>
              {/* TODO: wire to POST /api/contact in Phase 5 */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg font-inter font-semibold bg-[#f8c51c] text-[#0c2940] hover:bg-[#e0b016] hover:scale-[1.01] shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Booking + info */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#F7F8F9] border border-[#D9E3E6]">
              <h2 className="text-xl font-montserrat font-bold text-[#0c2940] mb-4">Book directly</h2>
              <p className="text-[#60707A] font-roboto text-sm mb-4">
                Prefer to skip the form? Book a discovery call directly on the calendar.
              </p>
              {/* TODO: replace href with real Google Calendar link from SiteSettings */}
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 rounded-lg font-inter font-semibold border-2 border-[#0c2940] text-[#0c2940] hover:bg-[#0c2940] hover:text-white transition-colors text-sm"
              >
                Open Booking Calendar
              </a>
            </div>

            <div>
              <h2 className="text-xl font-montserrat font-bold text-[#0c2940] mb-4">Speaking inquiries</h2>
              <p className="text-[#60707A] font-roboto text-sm mb-4">
                Paige is available for keynotes, panels, and workshops on AI fluency, responsible AI
                implementation, and the future of learning.
              </p>
              {/* TODO: replace with real speaker packet URL from SiteSettings */}
              <a href="#" className="text-[#39918d] font-inter font-semibold text-sm hover:underline">
                Download Speaker Packet →
              </a>
            </div>

            <div>
              <h2 className="text-xl font-montserrat font-bold text-[#0c2940] mb-4">Connect</h2>
              <a
                href="https://linkedin.com/in/paigebradbury"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39918d] font-inter font-semibold text-sm hover:underline"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
