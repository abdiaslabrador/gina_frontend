import React from 'react'
import Document, {DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx : DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
        {CssBaseline.flush()}
        <meta name="description" content="Sistema odontológico Gina" />
        <link rel="icon" href="/favicon.ico" />
        <link href="/fontawesome/css/fontawesome.css" rel="stylesheet"/>
        <link href="/fontawesome/css/brands.css" rel="stylesheet"/>
        <link href="/fontawesome/css/solid.css" rel="stylesheet"/>
        <link href="/fontawesome/css/regular.css" rel="stylesheet"/>
          </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;