import styled, { ThemeProvider } from 'styled-components'

import Header from '../Header/Header'
import GlobalStyles from '../../styles/GlobalStyles'
import theme from '../../styles/theme'

const Page = (props: any) => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <GlobalStyles />
      <Header />
      <main>{props.children}</main>
    </StyledPage>
  </ThemeProvider>
)

const StyledPage = styled.div`
  main {
    padding-top: 60px;
  }
`

export default Page
