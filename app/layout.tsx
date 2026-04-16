import type { Metadata } from "next";
import { SessionProvider } from "@/components/SessionProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "BETHEL WILLENHALL CHURCH",
  description: "Relationship • Fellowship • Belonging • Discipleship For Mission",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased bg-gray-50 text-gray-900" suppressHydrationWarning>
        <SessionProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
