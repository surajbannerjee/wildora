import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SmoothScrollProvider from "@/components/SmoothScroll/SmoothScrollProvider";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/Cart/CartDrawer";
import AuthModal from "@/components/Auth/AuthModal";
import { Manrope, Inter, Just_Another_Hand } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--heading-font",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--body-font",
});

const justAnotherHand = Just_Another_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--accent-font",
});

export const metadata = {
  title: "Wildora – Unleash the Adventure Within | Indian Safari & Adventure Travel Tours",
  description: "Wildora is your gateway to the untamed beauty of India. Explore thrilling safari tours, majestic wildlife, and unforgettable adventures through India’s most exotic destinations.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${justAnotherHand.variable}`}
    >
      <body className="antialiased selection:bg-secondary selection:text-primary">
        <AuthProvider>
          <CartProvider>
            <SmoothScrollProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <AuthModal />
            </SmoothScrollProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
