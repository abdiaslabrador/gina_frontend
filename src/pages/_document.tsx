import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head >
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
  )
}