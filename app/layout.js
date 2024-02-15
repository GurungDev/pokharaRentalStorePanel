import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import 'leaflet/dist/leaflet.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokhara rentals",
  description: "Store Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       
      </head>
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
