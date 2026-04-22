import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import "katex/dist/katex.min.css";
import "./globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>rckbrcls | Portfolio</title>
        <meta
          name="description"
          content="Selected product, native, and tooling work by Erick Barcelos."
        />
      </Head>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
