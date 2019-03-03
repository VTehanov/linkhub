import React from 'react'
import styled from 'styled-components'

export const GithubLogin = () => (
  <StyledGithubLogin type="button">Continue with GitHub</StyledGithubLogin>
)

const StyledGithubLogin = styled.button`
  padding: 10px 25px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-family: 'Nunito Sans';
  font-size: 18px;
  color: #a6a6a6;
  cursor: pointer;
`
