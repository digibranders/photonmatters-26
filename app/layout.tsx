import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

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
  metadataBase: new URL("https://www.photonmatters.io"),
  title: {
    default: "PhotonMatters — AI-Native Lending & Collections Platform",
    template: "%s — PhotonMatters",
  },
  description:
    "PhotonMatters is the AI-native lending and collections technology powering banks, NBFCs and telecom operators across Africa, India and the Middle East.",
  openGraph: {
    siteName: "PhotonMatters",
    type: "website",
    url: "https://www.photonmatters.io/",
  },
  twitter: { card: "summary_large_image" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PhotonMatters",
  url: "https://www.photonmatters.io",
  logo: "https://www.photonmatters.io/photonmatters-logo.svg",
  description:
    "PhotonMatters is the AI-native lending and collections technology powering banks, NBFCs and telecom operators across Africa, India and the Middle East.",
  email: "hello@photonmatters.io",
  telephone: "+971526977485",
  foundingLocation: { "@type": "Place", name: "Dubai, UAE" },
  areaServed: ["Africa", "India", "Middle East", "GCC"],
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
