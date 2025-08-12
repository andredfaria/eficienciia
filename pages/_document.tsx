import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-BR" className="dark">
        <Head />
        <body className="antialiased selection:bg-primary/20 selection:text-foreground">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
