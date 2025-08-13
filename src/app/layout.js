import "./globals.css";
import AppKitProvider from "./providers/AppKitProvider";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "MONSWAP",
  description: "A premium, high‑performance decentralized exchange for the Monad ecosystem.",
  icons: {
    icon: "/mon-2.svg",
    shortcut: "/mon-2.svg",
    apple: "/mon-2.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <AppKitProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
        </AppKitProvider>
      </body>
    </html>
  );
}
