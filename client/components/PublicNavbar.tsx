"use client";

import { usePathname } from "next/navigation";
import DynamicNavbar from "./DynamicNavbar";
import Footer from "./Footer";
import AppLoadingWrapperSchool from "./AppLoadingWrapperSchool";

const PublicPageWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isPortalRoute = [
        "/student",
        "/teacher",
        "/principal",

    ].some(route => pathname.startsWith(route));

    const isLoginPage = [
        "/student/login",
        "/teacher/login",
        "/principal/login",

    ].some(route => pathname === route);

    if (isPortalRoute || isLoginPage) {
        return <>
        <DynamicNavbar />
            {children}
        </>; // No navbar, no wrapper, no footer
    }

    return (
        <>
            <DynamicNavbar />
            <AppLoadingWrapperSchool>
                {children}
            <Footer />
            </AppLoadingWrapperSchool>
        </>
    );
};

export default PublicPageWrapper;
