import { Roboto, Open_Sans } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-primary",
});

export const openSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-secondary",
});
