import styled from 'styled-components';

const StyledProject = styled.article`
  font-size: 1em;
  padding: 2em;
  border-radius: 0.5em;
  box-shadow: 0px 4px 10px 2px rgba(0,0,0,0.1);

  .Project__title {
    margin: 0;
    font-size: 1.5em;
    font-family: 'PT Sans';
    color: ${props => props.theme.textColor};
    text-transform: capitalize;
  }

  .Project__content {
    font-family: 'PT Serif';
    color: ${props => props.theme.textColor};
    text-transform: capitalize;
  }
`;

export default StyledProject;
