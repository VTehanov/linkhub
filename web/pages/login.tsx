import styled from 'styled-components'
import LoginForm from '../components/Auth/LoginForm'

const LoginPage = () => (
  <StyledLoginPage>
    <div className="inner">
      <LoginForm />
    </div>
  </StyledLoginPage>
)

const StyledLoginPage = styled.section`
  display: flex;
  justify-content: space-around;

  .inner {
    width: 400px;
  }
`

export default LoginPage
