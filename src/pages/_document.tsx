import { GeistPixelSquare } from "geist/font/pixel";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="google" content="notranslate" />
        <link rel="icon" type="image/png" href="/images/me.png" />
        <link rel="shortcut icon" href="/images/me.png" />
        <link rel="apple-touch-icon" href="/images/me.png" />
      </Head>
      <body
        translate="no"
        className={`${GeistPixelSquare.variable} ${GeistPixelSquare.className} theme`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
