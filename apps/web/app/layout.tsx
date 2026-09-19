import type { Metadata } from "next";
import { Inter, Montserrat, Roboto, Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ContactProvider } from "@/components/layout/ContactProvider";
import { ColumbusProvider } from "@/components/layout/ColumbusProvider";
import { ApproachProvider } from "@/components/layout/ApproachProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ColumbusWidget } from "@/components/columbus/ColumbusWidget";
import { SITE_SETTINGS } from "@/lib/siteSettings";
import { buildOrganizationJsonLd } from "@/lib/jsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: {
    default: "The Bradbury Group — AI Learning Architecture & Transformation",
    template: "%s | The Bradbury Group",
  },
  description:
    "Engineering the AI-First Organization: leadership development, learning architecture, and organizational transformation.",
  icons: {
    icon: [
      {
        url: "https://thebradburygroup.com/wp-content/uploads/2026/06/cropped-Favicon-2-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://thebradburygroup.com/wp-content/uploads/2026/06/cropped-Favicon-2-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: "https://thebradburygroup.com/wp-content/uploads/2026/06/cropped-Favicon-2-180x180.png",
  },
  other: {
    "msapplication-TileImage":
      "https://thebradburygroup.com/wp-content/uploads/2026/06/cropped-Favicon-2-270x270.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = buildOrganizationJsonLd(SITE_SETTINGS);

  const markup = (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${roboto.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-[#39918d] selection:text-white overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ContactProvider>
          <ApproachProvider>
            <ColumbusProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#f8c51c] focus:text-[#0c2940] focus:font-bold focus:text-sm focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
              >
                Skip to main content
              </a>
              <Header />
              {/* Header is fixed (~96-108px tall) — this compensates for every
                  page except the ones whose own hero already bakes in that
                  spacing and cancels this out with a matching -mt (home,
                  about, resources, organisation, roi, leaders). */}
              <div id="main-content" className="flex-1 pt-24 sm:pt-[102px] lg:pt-[108px]">
                {children}
              </div>
              <Footer />
              <ColumbusWidget />
            </ColumbusProvider>
          </ApproachProvider>
        </ContactProvider>
      </body>
    </html>
  );

  // Clerk keys aren't provisioned yet — skip the provider so pages that don't
  // touch auth aren't taken down by a missing-key throw. See middleware.ts.
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return markup;
  }

  return <ClerkProvider>{markup}</ClerkProvider>;
}
