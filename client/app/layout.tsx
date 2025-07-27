import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import DynamicNavbar from "@/components/DynamicNavbar";
import Footer from "@/components/Footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DynamicNavbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
