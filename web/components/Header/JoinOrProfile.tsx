import Link from 'next/link'

import { Me } from '../Auth/Me'
import styled from 'styled-components'
import { Fragment } from 'react'
import { LogoutButton } from '../Auth/LogoutButton'

export const JoinOrProfile = () => (
  <Me>
    {({ data }) => (
      <StyledProfileInHeader>
        {data.me ? (
          <Fragment>
            <LogoutButton />
            <Link href="/profile">
              <p className="email">{data.me.email}</p>
            </Link>
          </Fragment>
        ) : (
          <Link href={{ pathname: '/register' }}>
            <a>Join now</a>
          </Link>
        )}
      </StyledProfileInHeader>
    )}
  </Me>
)

const StyledProfileInHeader = styled.div`
  display: flex;
  align-items: center;

  .email {
    font-family: 'Nunito Sans';
    font-weight: 700;
    cursor: pointer;
  }
`
