import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery call with The Bradbury Group or send an inquiry about training, consulting, or speaking.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-brand-navy)] mb-4">
          Let&apos;s talk
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Whether you&apos;re looking for training, consulting, or a keynote speaker — the first
          step is a conversation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact form — wired to FastAPI /contact in Phase 5 */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-brand-navy)] mb-6">
            Send a message
          </h2>
          <form className="space-y-4" aria-label="Contact form">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]"
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                Organization
              </label>
              <input
                id="organization"
                type="text"
                name="organization"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]"
              />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                I&apos;m interested in
              </label>
              <select
                id="interest"
                name="interest"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]"
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
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]"
              />
            </div>
            {/* TODO: wire to POST /api/contact in Phase 5 */}
            <button
              type="submit"
              className="w-full py-3 rounded font-semibold bg-[var(--color-brand-gold)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-gold-light)] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Booking + info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-brand-navy)] mb-4">
              Book directly
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Prefer to skip the form? Book a discovery call directly on the calendar.
            </p>
            {/* TODO: replace href with real Google Calendar link from SiteSettings */}
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 rounded font-semibold border-2 border-[var(--color-brand-navy)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)] hover:text-white transition-colors text-sm"
            >
              Open Booking Calendar
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-brand-navy)] mb-4">
              Speaking inquiries
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Paige is available for keynotes, panels, and workshops on AI fluency, responsible AI
              implementation, and the future of learning.
            </p>
            {/* TODO: replace with real speaker packet URL from SiteSettings */}
            <a
              href="#"
              className="text-[var(--color-brand-gold)] font-medium text-sm hover:underline"
            >
              Download Speaker Packet →
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-brand-navy)] mb-4">
              Connect
            </h2>
            <a
              href="https://linkedin.com/in/paigebradbury"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brand-gold)] font-medium text-sm hover:underline"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
