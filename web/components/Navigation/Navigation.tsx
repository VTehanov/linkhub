import Link from 'next/link';
import StyledNavigation from './StyledNavigation';


interface NavigationProps {
  routes: {
    url: string,
    text: string
  }[]
}

const Navigation: React.SFC<NavigationProps> = ({ routes }) => {
  return (
    <StyledNavigation>
      {routes.map(route => (
        <Link href={route.url}>
          <a className="Navigation__link">{route.text}</a>
        </Link>
      ))}
    </StyledNavigation>
  )
}

export default Navigation;