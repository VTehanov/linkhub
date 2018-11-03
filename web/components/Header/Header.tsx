import styled from 'styled-components';

import Navigation from '../Navigation/Navigation';
import routes from '../../constants/routes';


const Header = () => {
  return (
    <StyledHeader>
      <Navigation routes={routes} />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  margin-bottom: 1em;
`;

export default Header;