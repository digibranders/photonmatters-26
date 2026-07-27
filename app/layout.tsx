import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "PhotonMatters: AI-Native Lending & Collections Platform",
    template: "%s | PhotonMatters",
  },
  description:
    "PhotonMatters is the AI-native lending and collections technology powering banks, NBFCs and telecom operators across Africa, India and the Middle East.",
  openGraph: {
    siteName: "PhotonMatters",
    type: "website",
    url: `${SITE.url}/`,
  },
  twitter: { card: "summary_large_image" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PhotonMatters",
  url: SITE.url,
  logo: `${SITE.url}/photonmatters-logo.svg`,
  description:
    "PhotonMatters is the AI-native lending and collections technology powering banks, NBFCs and telecom operators across Africa, India and the Middle East.",
  email: "hello@photonmatters.com",
  telephone: "+971526977485",
  foundingLocation: { "@type": "Place", name: "Dubai, UAE" },
  areaServed: ["Africa", "India", "Middle East", "GCC"],
  founder: [
    { "@type": "Person", name: "Tahseen Jamal", jobTitle: "Co-Founder & CEO" },
    { "@type": "Person", name: "Rohit Ahuja", jobTitle: "Co-Founder & CCO" },
  ],
  sameAs: ["https://www.linkedin.com/company/photonmatters"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 1701, Tower BB1, Mazaya Business Avenue, JLT",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
