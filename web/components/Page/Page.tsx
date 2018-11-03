import { ThemeProvider } from "styled-components";

import StyledPage from './StyledPage';
import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/Theme';

const Page = (props: any) => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <GlobalStyles />
      {props.children}
    </StyledPage>
  </ThemeProvider>
);

export default Page;