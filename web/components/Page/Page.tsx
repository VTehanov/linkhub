import styled, { ThemeProvider } from 'styled-components'

import Header from '../Header/Header'
import GlobalStyles from '../../styles/GlobalStyles'
import theme from '../../styles/theme'
import { Meta } from '../Meta/Meta'

const Page = (props: any) => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Meta />
      <GlobalStyles />
      <Header />
      <main>{props.children}</main>
    </StyledPage>
  </ThemeProvider>
)

const StyledPage = styled.div`
  background-color: #f0f1f2;

  main {
    padding-top: 60px;
  }
`

export default Page
