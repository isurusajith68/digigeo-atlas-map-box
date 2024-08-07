import { Inter } from "next/font/google";
import "./globals.css";

import SideBar from "@/components/sidebar/side-bar";
import NavBar from "@/components/navbar/nav-bar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Digi Geo Atlas",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div
            className="flex"
            style={{
              minHeight: "calc(100vh - 64px)",
              minHeight: "calc(100dvh - 64px)",
            }}
          >
            <SideBar />
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: "calc(100vh - 64px)",
                    minHeight: "calc(100dvh - 64px)",
                    minHeight: "calc(100dvh - 64px)",
                    minWidth: "calc(100vw - 194px)",
                  }}
                  className="flex justify-center items-center  text-foreground"
                >
                  Loading...
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
          <Toaster position="top-right" expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
