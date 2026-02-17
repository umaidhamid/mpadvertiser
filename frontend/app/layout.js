import "./globals.css";
import { Toaster } from "sonner";

import { ThemeProvider } from "./components/theme-provider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}