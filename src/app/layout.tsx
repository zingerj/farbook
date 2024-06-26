import "~/styles/globals.css";
import "~/styles/flex-shortcuts.scss";

import { Inter } from "next/font/google";
import Provider from "~/provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: { session: never };
}) {
  return (
    <Provider session={pageProps?.session}>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>{children}</body>
      </html>
    </Provider>
  );
}
