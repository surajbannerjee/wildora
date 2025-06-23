import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Lato, Yeseva_One, Barlow_Semi_Condensed } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const yesevaOne = Yeseva_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-yeseva',
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-barlow',
});
export const metadata = {
  title: "Wildora – Unleash the Adventure Within | Indian Safari & Adventure Travel Tours",
  description: "Wildora is your gateway to the untamed beauty of India. Explore thrilling safari tours, majestic wildlife, and unforgettable adventures through India’s most exotic destinations.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${yesevaOne.variable} ${barlowSemiCondensed.variable}`}>
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
        {/* <Footer /> */}

      </body>
    </html>
  );
}
