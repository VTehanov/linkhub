import Link from 'next/link'

import { Me } from '../Auth/Me'
import styled from 'styled-components'

export const JoinOrProfile = () => (
  <Me>
    {({ data }) =>
      data.me ? (
        <StyledProfileInHeader>
          <Link href="/profile">
            <p className="email">{data.me.email}</p>
          </Link>
        </StyledProfileInHeader>
      ) : (
        <Link href={{ pathname: '/register' }}>
          <a>Join now</a>
        </Link>
      )
    }
  </Me>
)

const StyledProfileInHeader = styled.div`
  .email {
    font-family: 'Nunito Sans';
    font-weight: 700;
    cursor: pointer;
  }
`
