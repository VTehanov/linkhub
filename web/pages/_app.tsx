import App, { Container } from 'next/app';
import Page from '../components/Page/Page';
// import GlobalStyles from 'styles/GlobalStyles';


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Page>
          <Component { ...pageProps } />
        </Page>
      </Container>
    )
  }
}

export default MyApp;