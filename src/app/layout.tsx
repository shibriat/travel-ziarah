import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";
import { MenuProvider } from "@/contexts/MenuProvider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MenuProvider>{children}</MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
