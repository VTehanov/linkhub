import Link from 'next/link'
import StyledNavigation from './StyledNavigation'

interface IProps {
  routes: {
    url: string
    text: string
  }[]
}

const Navigation: React.SFC<IProps> = ({ routes }) => {
  return (
    <StyledNavigation>
      {routes.map(route => (
        <Link href={route.url} key={route.text}>
          <a className="Navigation__link">{route.text}</a>
        </Link>
      ))}
    </StyledNavigation>
  )
}

export default Navigation
