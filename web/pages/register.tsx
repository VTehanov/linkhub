import styled from 'styled-components'
import { RegisterForm } from '../components/Auth/RegisterForm'

const RegisterPage = () => (
  <StyledRegisterPage>
    <div className="inner">
      <RegisterForm />
    </div>
  </StyledRegisterPage>
)

const StyledRegisterPage = styled.section`
  display: flex;
  justify-content: space-around;

  .inner {
    width: 400px;
  }
`

export default RegisterPage
