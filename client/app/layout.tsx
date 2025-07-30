import "./globals.css";
// Update the import path below to match the actual location and filename of your AuthProvider context
import { AuthProvider } from "../context/authContext";
import DynamicNavbar from "@/components/DynamicNavbar";
import Footer from "@/components/Footer"

import PublicNavbar from "@/components/PublicNavbar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          
            
          
          <PublicNavbar>

            {children}
          </PublicNavbar>
          
         
        </AuthProvider>
      </body>
    </html>
  );
}
