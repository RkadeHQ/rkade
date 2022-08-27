import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-sora">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
