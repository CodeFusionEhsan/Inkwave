import { Geist, Geist_Mono } from "next/font/google";
import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Script from 'next/script'

export const metadata = {
  title: "Inkwave",
  description: "Pour Your Thoughts",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
