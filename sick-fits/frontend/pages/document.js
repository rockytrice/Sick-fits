// _document is only rendered on the server side and not on the client side
import Document, { Head, Main, NextScript } from 'next/document'
// renders out your app and crawls every single component of your tree and see if there are any styles needed to be collected
import { ServerStyleSheet } from 'styled-components'


export default class MyDocument extends Document {
    static getInitialProps ({ renderPage }) {
        const sheet = new ServerStyleSheet()
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
        // compile all the styles into one and then dump it to the page
        const styleTags = sheet.getStyleElement()
        return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
