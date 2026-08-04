import type { Metadata } from "next";
import { Inter, Montserrat, Roboto, Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ColumbusWidget } from "@/components/columbus/ColumbusWidget";
import { getSiteSettings } from "@/lib/cms";
import { buildOrganizationJsonLd } from "@/lib/jsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Bradbury Group",
    template: "%s | The Bradbury Group",
  },
  description:
    "AI fluency training, executive programs, and organizational transformation. The Bradbury Group helps leaders and organizations thrive in the age of AI.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings().catch(() => null);
  const organizationJsonLd = buildOrganizationJsonLd(settings);

  const markup = (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${roboto.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-roboto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <ColumbusWidget />
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
