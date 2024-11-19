"use client";

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

// Import all fonts used in the app
import { 
  Inter,
  Roboto,
  Open_Sans as OpenSans,
  Lato,
  Poppins,
  Montserrat,
  Raleway,
  Nunito 
} from 'next/font/google';

// Configure fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
});
const openSans = OpenSans({ 
  subsets: ['latin'],
  variable: '--font-open-sans'
});
const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato'
});
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins'
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway'
});
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito'
});

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(
      inter.variable,
      roboto.variable,
      openSans.variable,
      lato.variable,
      poppins.variable,
      montserrat.variable,
      raleway.variable,
      nunito.variable,
      "min-h-screen bg-background antialiased"
    )}>
      {children}
      <Toaster />
    </div>
  );
}