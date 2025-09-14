import "./globals.css";
import Web3Provider from "./providers/AppKitProvider";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import NetworkStatus from "./components/NetworkStatus";

export const metadata = {
  title: "Web3 DEX",
  description: "A premium, high‑performance decentralized exchange for the Web3 ecosystem.",
  icons: {
    icon: "/next.svg",
    shortcut: "/next.svg",
    apple: "/next.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <ErrorBoundary>
          <Web3Provider>
            <NetworkStatus />
            <Navbar />
            <div className="pt-20">{children}</div>
          </Web3Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
