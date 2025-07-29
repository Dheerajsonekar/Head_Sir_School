import "./globals.css";
// Update the import path below to match the actual location and filename of your AuthProvider context
import { AuthProvider } from "../context/authContext";
import DynamicNavbar from "@/components/DynamicNavbar";
import Footer from "@/components/Footer"
import AppLoadingWrapperSchool from "@/components/AppLoadingWrapperSchool";
import App from "next/app";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          
            
          <DynamicNavbar />
          <AppLoadingWrapperSchool>

            {children}
          </AppLoadingWrapperSchool>
          <Footer />
         
        </AuthProvider>
      </body>
    </html>
  );
}
