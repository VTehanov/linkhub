import App, { Container } from 'next/app'
import Page from '../components/Page/Page'
import { ApolloProvider } from 'react-apollo'
import withData from '../utils/withData'
import { ApolloClient } from 'apollo-boost'

interface IProps {
  apollo: ApolloClient<any>
}

class MyApp extends App<IProps> {
  static getInitialProps = async ({ Component, ctx }: any) => {
    let pageProps: { query?: any } = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    pageProps.query = ctx.query

    return {
      pageProps
    }
  }

  render() {
    const { Component, apollo, pageProps } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
