import { ThemeProvider } from "styled-components";

import StyledPage from './StyledPage';
import Header from '../Header/Header';
import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/Theme';


const Page = (props: any) => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <GlobalStyles />
      <Header />
      {props.children}
    </StyledPage>
  </ThemeProvider>
);

export default Page;