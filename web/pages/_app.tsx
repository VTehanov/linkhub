import App, { Container } from 'next/app'
import Page from '../components/Page/Page'
import { ApolloProvider } from 'react-apollo'
import withData from '../utils/withData'

interface IProps {
  apollo: any
}

class MyApp extends App<IProps> {
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
