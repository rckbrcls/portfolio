import { GeistPixelSquare } from "geist/font/pixel";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/images/assets/ico.png" />
      </Head>
      <body className={`${GeistPixelSquare.variable} theme`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
