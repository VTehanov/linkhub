import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=PT+Serif');
  @import url('https://fonts.googleapis.com/css?family=PT+Sans');

  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;