import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render = () => (
    <Html lang="en">
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default CustomDocument;
