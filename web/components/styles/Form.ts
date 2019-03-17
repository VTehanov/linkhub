import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  .form-name {
    text-align: center;
    font-weight: 700;
  }

  * ~ * {
    margin-top: 25px;
  }

  button[type='submit'] {
    padding: 15px 0;
    border: 0;
    border-radius: 5px;
    background-color: darkgray;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Montserrat';
    color: white;
    cursor: pointer;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  .delimeter {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #dddddd;
    font-family: 'Nunito Sans';
  }

  .delimeter:before,
  .delimeter:after {
    content: '';
    box-sizing: border-box;
    border-top: 1px solid #dddddd;
    margin: 0 20px 0 0;
    flex: 1 0 20px;
  }

  .delimeter:after {
    margin: 0 0 0 20px;
  }
`
