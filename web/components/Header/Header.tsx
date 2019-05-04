import styled from 'styled-components'
import Link from 'next/link'
import { JoinOrProfile } from './JoinOrProfile'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Header = () => (
  <StyledHeader>
    <div className="inner">
      <div className="logo">
        <Link
          href={{
            pathname: '/'
          }}
        >
          <a>Linkhub</a>
        </Link>
      </div>
      <div className="search">
        <input type="text" placeholder="Search for projects" />
      </div>
      <div className="navigation">
        <Link
          href={{
            pathname: '/project/create'
          }}
        >
          <a>Create project</a>
        </Link>
        <JoinOrProfile />
      </div>
    </div>
  </StyledHeader>
)

const StyledHeader = styled.header`
  margin-bottom: 1em;
  padding: 30px 100px;
  border-bottom: 1px solid #dddddd;

  .inner {
    display: flex;
    align-items: center;
  }

  .logo {
    margin-right: 80px;

    a {
      font-family: 'Montserrat';
      font-size: 42px;
      font-weight: 700;
      color: #4e4e4e;
      text-decoration: none;
    }
  }

  .search {
    input {
      width: 400px;
      padding: 10px 20px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      font-size: 18px;
      font-family: 'Nunito Sans';
      color: #a6a6a6;
    }
  }

  .navigation {
    display: flex;
    align-items: center;
    margin-left: auto;

    .cta {
      a {
        padding: 10px 20px;
        border-radius: 5px;
        background-color: darkgray;
        text-decoration: none;
        font-weight: 700;
        font-family: 'Montserrat';
        color: white;
      }
    }
  }
`

export default Header
