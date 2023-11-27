import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FAF1E4;
`;

export const LogoContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
`;

export const LogoImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

export const LoginTitle = styled.h2`
`;

export const FormWrapper = styled.div`
  font-size: clamp(1rem, 0.9vw, 1.3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 30%;
  text-align: left;
  /* background: #5B6D5B; */
  padding: 1em;

  @media screen and (max-width: 1294px) {
    max-width: 50%;
  }

  @media screen and (max-width: 843px) {
    max-width: 80%;
  }

  @media screen and (max-width: 425px) {
    max-width: 95%;
  }

`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 1em;
  text-align: left;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: left;
`;

export const FormLabel = styled.label`
  text-align: left;
  min-width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

export const LoginInput = styled.input`
    width: 100%;
    /* height: 18%; */
    height: 2em;
    background: #BAC7A7;
    border: 0.11em solid;
    border-radius: 0.5em;
    border-color: grey;
    color: black;
    text-align: center;
    font-size: clamp(1rem, 0.9vw, 1.3rem);
    /* padding: 1em; */
`;

export const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 1em;
  width: 100%; 
  margin-right: 0.2em;
`;

export const PasswordInput = styled.input`
  /* min-width: 150%; */
  width: 100%;
  /* height: 28%; */
  position: relative;
  height: 2em;
  background: #BAC7A7;
  border: 0.11em solid;
  border-radius: 0.5em;
  border-color: grey;
  color: black;
  text-align: center;
  font-size: clamp(1rem, 0.9vw, 1.3rem);
  /* padding-right: ${(props) => (props.showPassword ? '2em' : '1em')}; */
  /* position: relative; */
  /* padding-right: ${(props) => (props.showPassword ? '1.5em' : '1em')};  */
  /* Adjust padding based on eye icon visibility */
`;

export const EyeIconContainer = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

// export const EyeIconContainer = styled.span`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   transform: translateY(-50%);
// `;

export const EyeIcon = styled(Icon)`
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginButton = styled.button`
    /* width: 40%; */
    text-align: center;
    padding: 0.4em 0.9em;
    border-radius: 0.5em;
    border: 0;
    background-color: #CEDEBD;
    /* text-decoration: none; */
    margin-right: 0.5em;
    color: black;
    cursor: pointer;
    margin-top: 1em; 
    font-family: "Roboto";
    font-size: clamp(1rem, 0.9vw, 1.3rem);

    &:hover, &:focus {
        background-color: #9EB384;
    }
    `;

export const RegisterButton = styled.button`
    /* width: 40%; */
    text-align: center;
    padding: 0.4em 0.9em;
    border-radius: 0.5em;
    border: 0;
    background-color: #CEDEBD;
    /* text-decoration: none; */
    color: black;
    cursor: pointer;
    margin-top: 1em; 
    font-family: "Roboto";
    font-size: clamp(1rem, 0.9vw, 1.3rem);

    &:hover, &:focus {
        background-color: #9EB384;
    }
`;

export const CreateAccountText = styled.span`
  color: blue;
  cursor: pointer; 
  margin-top: 1em;

`;


export const RememberMeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 100%;
  /* margin-top: 0.5em; */
  /* margin-right: 2em; */
  /* border: pink 1px solid; */
  justify-content: space-between;
`;

export const RememberMeCheckbox = styled.input`
  /* margin-right: 0.5em; */
  /* padding: 0.5em; */
`;

export const RememberMeLabel = styled.label`
min-width: 100%;
margin-right: 3.5em;
`;

export const RememberOrForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2em;
  justify-content: space-between;
`;

export const ForgotPasswordLink = styled.span`
  /* margin-top: 1em; */
  color: blue;
  cursor: pointer;
  /* padding: 0.5em; */
  /* margin-left: 0.9em; */
  margin-right: 3em;
  min-width: 100%;
  
`;

