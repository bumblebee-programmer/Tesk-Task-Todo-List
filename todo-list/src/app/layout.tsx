"use client";

import { Provider } from "react-redux";
import { store } from "./providers/store";
import { roboto, openSans } from "@/shared/lib/fonts";
import "../shared/styles/globals.css";
import Header from "@/shared/Header";
import { Footer } from "@/shared/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`}>
      <body>
        <Provider store={store}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
