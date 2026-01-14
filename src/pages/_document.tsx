import { Html, Head, Main, NextScript } from "next/document";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/assets/ico.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <SpeedInsights />
        <Analytics />
      </body>
    </Html>
  );
}
